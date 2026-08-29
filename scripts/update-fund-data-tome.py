# -*- coding: utf-8 -*-
"""
update-fund-data-tome.py
=========================

Consulta a API oficial do Tome (agentetome.com) para tentar confirmar,
usando uma fonte estruturada (nao a pagina publica raspada), se os 4
fundos da familia Solar aparecem na base de informes CVM/FNET que o
Tome ja ingeriu — e, se aparecerem, usa isso so como CONFERENCIA
CRUZADA contra js/funds-data.js (que continua sendo gerado a partir
dos Demonstrativos Mensais oficiais via parse_relatorios.py — ver o
cabecalho de update-fund-data.py para o porque isso e proposital).

A CHAVE DE API E UM SEGREDO — NUNCA HARDCODE AQUI
---------------------------------------------------
Este script LE a chave da variavel de ambiente TOME_API_KEY. Ela nunca
deve aparecer neste arquivo nem em nenhum outro arquivo rastreado pelo
git. Formas seguras de fornecer a chave:

  1. Var de ambiente na sua propria sessao de shell:
       export TOME_API_KEY="tome_..."          (bash)
       $env:TOME_API_KEY = "tome_..."           (PowerShell)

  2. Um arquivo local `.env.local` na pasta `4. Site/` (mesmo nivel
     deste `scripts/`), formato `TOME_API_KEY=tome_...`, e SEMPRE
     coberto pelo `.gitignore` da pasta (`.env*` esta la — confira
     antes de usar, e nunca remova essa linha do .gitignore).

Este script tenta o metodo 2 automaticamente se a variavel de ambiente
nao estiver setada (procura `../.env.local` a partir de scripts/).

LICAO APRENDIDA SOBRE RATE LIMIT (leia antes de rodar)
--------------------------------------------------------
A documentacao da API lista `/export/admin/manifest` como uma chamada
"barata" separada de `/export/admin` (o export de verdade). NA
PRATICA, os dois dividem o MESMO limite de 10 requisicoes/hora —
confirmado empiricamente: bati o limite so testando variantes do nome
do administrador via manifest. Trate CADA chamada a qualquer rota que
comece com `/export/admin` (manifest OU export, REST ou MCP) como
consumindo a mesma cota horaria compartilhada. Por isso este script:
  - tem um orcamento fixo de chamadas por execucao (MAX_CHAMADAS),
  - para e avisa em vez de insistir quando toma HTTP 429,
  - respeita o header Retry-After literalmente (nunca menos).

O QUE JA SABEMOS (de uma investigacao manual em 2026-08-28 — ver
dados-fundos/fontes-tome-api.json para o detalhe completo)
-------------------------------------------------------------
  - admin='singulare' resolve para o CNPJ 62285390000140 (2 grafias
    de nome). Para esse CNPJ: fidc_consolidado.csv = 0 linhas,
    fii_consolidado.csv = 7 linhas. NENHUM FIDC sob esse CNPJ.
  - admin='QI' / 'QI Corretora' resolvem para uma lista de ATE 5
    administradoras, incluindo DOIS CNPJs quase-homonimos:
      * 62285390000173 — "QI CORRETORA DE TITULOS E VALORES
        MOBILIARIOS S.A" (sem acento)
      * 62285390000140 — "QI CORRETORA DE TÍTULOS E VALORES
        MOBILIÁRIOS S.A"/"S.A." (COM acento — o MESMO CNPJ da
        Singulare acima)
    O agregado dos dois da fidc_consolidado.csv ~952-957 linhas. Como
    o CNPJ ...140 sozinho ja da zero, a maior parte dessas linhas
    devem pertencer ao CNPJ ...173 — MAS ISSO AINDA NAO FOI CONFIRMADO
    DIRETAMENTE porque a investigacao bateu no rate limit antes de
    conseguir isolar admin=62285390000173 sozinho.
  - admin com a grafia EXATA usada nos dossies publicos do Tome
    ("QI Corretora de Títulos e Valores Mobiliários S.A.") e
    admin='Q.I. Tech' deram 404 ADMIN_NAO_ENCONTRADA — o casamento de
    nome do endpoint de export nao e o mesmo texto solto que aparece
    nas paginas de dossie por fundo.

O QUE ESTE SCRIPT FAZ, EM ORDEM (gastando no maximo alguns req/execucao)
--------------------------------------------------------------------------
  1. manifest com admin=62285390000173 (o candidato mais provavel,
     pra nao repetir o desperdicio de testar varias grafias de novo).
  2. Se esse CNPJ tiver fidc_consolidado.csv > 0: baixa o export de
     verdade (formato=csv) SO desse CNPJ, abre o fidc_consolidado.csv
     dentro do zip, e confere se algum dos 4 CNPJs dos fundos Solar
     aparece nele.
  3. Grava tudo (manifest + resultado do cruzamento, nunca o CSV
     inteiro se for grande) em dados-fundos/fontes-tome-api.json,
     mesclando com o que ja esta la (nao sobrescreve o historico de
     achados anteriores).
  4. NÃO toca em js/funds-data.js. Se algo reconciliar limpo com um
     campo hoje nulo, isso e uma sugestao no relatorio final pra um
     humano revisar — igual ao criterio usado com maisretorno/
     agentetome no ciclo anterior (nunca sobrescrever numero de
     performance vindo do PDF oficial, so preencher lacuna factual
     sem ambiguidade, tipo CNPJ/custodiante).

COMO USAR
---------
    python scripts/update-fund-data-tome.py

Rode de novo se dado HTTP 429: o script imprime quanto tempo esperar
(Retry-After) e para sozinho — não fica tentando de novo.
"""
import csv
import io
import json
import os
import sys
import time
import zipfile
from datetime import datetime, timezone

import urllib.request
import urllib.parse
import urllib.error

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SITE_DIR = os.path.dirname(SCRIPT_DIR)
DADOS_DIR = os.path.join(SITE_DIR, "dados-fundos")
OUTPUT_PATH = os.path.join(DADOS_DIR, "fontes-tome-api.json")
ENV_LOCAL_PATH = os.path.join(SITE_DIR, ".env.local")

BASE_URL = "https://www.agentetome.com/api/v1"
MAX_CHAMADAS = 3  # orcamento conservador por execucao — a cota real e 10/hora

SOLAR_CNPJS = {
    "solar-br-fidc": "51045717000190",
    "solar-puglia-fidc-rl": "52498421000198",
    "solar-vialoc-fidc": "39680495000182",
    "solar-belmonte-fidc": "58347004000120",
}

# Candidato prioritario (ver secao "O QUE JA SABEMOS" acima). So cai pros
# outros nomes se este vier vazio/nao encontrado, pra nao gastar cota
# repetindo variantes ja testadas manualmente.
CANDIDATOS_ADMIN = [
    "62285390000173",
    "QI Corretora de Titulos e Valores Mobiliarios S.A",  # sem acento, grafia que casou antes
]


def load_api_key():
    key = os.environ.get("TOME_API_KEY")
    if key:
        return key
    if os.path.isfile(ENV_LOCAL_PATH):
        with open(ENV_LOCAL_PATH, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("TOME_API_KEY="):
                    return line.split("=", 1)[1].strip()
    return None


def mask(key):
    if not key or len(key) < 12:
        return "****"
    return key[:9] + "..." + key[-4:]


def api_get(path, params, key, chamadas_feitas):
    if chamadas_feitas[0] >= MAX_CHAMADAS:
        print(f"[orcamento] Ja usei {MAX_CHAMADAS} chamadas nesta execucao — parando por seguranca. "
              f"Rode de novo mais tarde se precisar de mais.")
        return None, None

    url = f"{BASE_URL}{path}?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {key}"})
    chamadas_feitas[0] += 1
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        body = e.read()
        if e.code == 429:
            retry_after = e.headers.get("Retry-After", "desconhecido")
            print(f"[429] Limite de requisicoes atingido. Retry-After: {retry_after}s. "
                  f"Parando — nao vou insistir nem esperar isso aqui.")
        return e.code, body


def manifest(admin, key, chamadas_feitas, corte="recente", competencia=None):
    params = {"admin": admin, "corte": corte}
    if competencia:
        params["competencia"] = competencia
    status, body = api_get("/export/admin/manifest", params, key, chamadas_feitas)
    if status is None:
        return None
    try:
        data = json.loads(body)
    except Exception:
        data = {"_raw": body.decode("utf-8", "replace")}
    print(f"  manifest admin={admin!r} corte={corte} -> HTTP {status}")
    return {"http": status, "resposta": data}


def export_csv(admin, key, chamadas_feitas, corte="recente", competencia=None):
    params = {"admin": admin, "corte": corte, "formato": "csv"}
    if competencia:
        params["competencia"] = competencia
    status, body = api_get("/export/admin", params, key, chamadas_feitas)
    if status != 200:
        print(f"  export admin={admin!r} -> HTTP {status} (nao e um export valido)")
        return None
    print(f"  export admin={admin!r} -> HTTP {status}, {len(body)} bytes")
    return body


def find_solar_cnpjs_in_zip(zip_bytes):
    achados = {}
    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
        names = [n for n in zf.namelist() if n.endswith("fidc_consolidado.csv")]
        if not names:
            return achados, list(zf.namelist())
        with zf.open(names[0]) as f:
            reader = csv.DictReader(io.TextIOWrapper(f, encoding="utf-8"))
            fieldnames = reader.fieldnames or []
            cnpj_col = next((c for c in fieldnames if "cnpj" in c.lower()), None)
            if not cnpj_col:
                return achados, fieldnames
            for row in reader:
                raw_cnpj = "".join(ch for ch in (row.get(cnpj_col) or "") if ch.isdigit())
                for slug, cnpj in SOLAR_CNPJS.items():
                    if raw_cnpj == cnpj:
                        achados.setdefault(slug, []).append(row)
    return achados, None


def main():
    key = load_api_key()
    if not key:
        print("TOME_API_KEY nao encontrada (nem em variavel de ambiente, nem em .env.local). Abortando.")
        sys.exit(1)
    print(f"Usando chave {mask(key)} (mascarada — nunca imprima a chave inteira).")

    chamadas_feitas = [0]
    resultado = {
        "geradoEm": datetime.now(timezone.utc).isoformat(),
        "chaveUsada": mask(key),
        "chamadas": [],
        "cruzamentoComSolar": {},
    }

    manifest_ok = None
    admin_usado = None
    for candidato in CANDIDATOS_ADMIN:
        m = manifest(candidato, key, chamadas_feitas)
        if m is None:
            break
        resultado["chamadas"].append({"tipo": "manifest", "admin": candidato, **m})
        if m["http"] == 200:
            linhas_fidc = m["resposta"].get("arquivos", {}).get("fidc_consolidado.csv", {}).get("linhas", 0)
            print(f"  -> fidc_consolidado.csv: {linhas_fidc} linhas")
            if linhas_fidc > 0:
                manifest_ok = m
                admin_usado = candidato
                break
        time.sleep(1)

    if manifest_ok and admin_usado:
        print(f"\nCandidato com FIDCs encontrado: admin={admin_usado!r}. Baixando export CSV...")
        csv_bytes = export_csv(admin_usado, key, chamadas_feitas)
        if csv_bytes:
            achados, arquivos_no_zip = find_solar_cnpjs_in_zip(csv_bytes)
            if achados:
                print(f"  Fundos Solar encontrados na base do Tome: {list(achados.keys())}")
            else:
                print(f"  Nenhum dos 4 CNPJs Solar apareceu no fidc_consolidado.csv desse export. "
                      f"Arquivos no zip: {arquivos_no_zip}")
            resultado["cruzamentoComSolar"] = {
                "adminUsado": admin_usado,
                "fundosEncontrados": {k: v for k, v in achados.items()},
                "fundosAusentes": [s for s in SOLAR_CNPJS if s not in achados],
            }
    else:
        print("\nNenhum candidato desta execucao tinha fidc_consolidado.csv > 0 "
              "(ou a cota acabou antes de confirmar). Ver dados-fundos/fontes-tome-api.json "
              "para o historico completo de tentativas, incluindo as manuais anteriores.")

    # Mescla com o arquivo existente em vez de sobrescrever o historico de achados
    existing = {}
    if os.path.isfile(OUTPUT_PATH):
        with open(OUTPUT_PATH, "r", encoding="utf-8") as f:
            existing = json.load(f)
    existing.setdefault("execucoesDoScript", []).append(resultado)
    existing["status"] = (
        "FUNDOS_SOLAR_CONFIRMADOS_NA_BASE_TOME" if resultado["cruzamentoComSolar"].get("fundosEncontrados")
        else existing.get("status", "INVESTIGACAO_INCOMPLETA")
    )

    os.makedirs(DADOS_DIR, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(existing, f, ensure_ascii=False, indent=2)
    print(f"\nGravado (mesclado): {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
