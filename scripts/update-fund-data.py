# -*- coding: utf-8 -*-
"""
update-fund-data.py
====================

Visita as paginas publicas de tracking de fundos (maisretorno.com e
agentetome.com) para os 4 fundos da familia Solar e grava um retrato
(snapshot) datado em `dados-fundos/fontes-publicas.json`.

O QUE ESTE SCRIPT NAO FAZ (de proposito)
-----------------------------------------
Ele NAO sobrescreve `js/funds-data.js`. Isso e deliberado, nao um
descuido. `funds-data.js` e gerado por `parse_relatorios.py` a partir
dos Demonstrativos Mensais oficiais emitidos pelo administrador de cada
fundo (Singulare / Fram Capital) — a fonte mais autoritativa que existe
para esses numeros, e a que o proprio regulamento do fundo referencia.

maisretorno.com e agentetome.com sao fontes PUBLICAS e UTEIS como
checagem cruzada (ambas dizem se basear nos informes mensais que os
fundos entregam a CVM via Fundos.NET), mas durante o desenvolvimento
deste script eu (Claude) encontrei um caso concreto em que a leitura
de rentabilidade POR CLASSE DE COTA do maisretorno para o Solar
Belmonte FIDC parecia destacar uma perda severa (-32%, -7%, -8% ao
mes) numa sub-classe que a pagina nao rotula com nome — inconsistente
com o Demonstrativo Mensal oficial do mesmo mes (que mostra todas as
classes positivas, inadimplencia e PDD zeradas). O mapeamento de
sub-classe/codigo CVM que essas plataformas fazem para FIDCs fechados
e pouco liquidos parece nao ser confiavel o bastante para publicar
direto no site de um administrador regulado. Por isso este script
so grava numeros de fundo inteiro (PL total, CNPJ, administrador,
gestor, custodiante, status, series historicas de PL/inadimplencia
por competencia) — dados que sao faceis de conferir e nao dependem de
um mapeamento de sub-classe que pode estar errado. Ele NAO tenta
extrair rentabilidade por classe de cota dessas plataformas.

COMO USAR
---------
1. Instale as dependencias (uma vez so):
     pip install playwright
     python -m playwright install chromium

2. Rode o script a partir da pasta `4. Site`:
     python scripts/update-fund-data.py

3. Abra `dados-fundos/fontes-publicas.json` e compare os numeros com
   o que esta publicado em `js/funds-data.js` / com o Demonstrativo
   Mensal oficial do mes. Se algo divergir de forma que pareca
   relevante (PL muito diferente, status do fundo, inadimplencia
   subindo), isso e um sinal para investigar com o administrador —
   NAO para copiar o numero divergente direto pro site.

4. Se, depois de investigar, voce decidir que algum campo hoje `null`
   em `dados-fundos/manifest.json` (ex: CNPJ, custodiante) deveria ser
   preenchido com o que uma dessas plataformas mostra, edite o
   manifest.json a mao (ele so tem dados estaveis, tipo CNPJ) e rode
   `parse_relatorios.py <mes>` de novo, ou edite os DOIS lugares
   (manifest.json + js/funds-data.js) manualmente se nao quiser
   reprocessar os PDFs do mes.

COM QUE FREQUENCIA RODAR
-------------------------
Uma vez por mes, depois que os 4 Demonstrativos Mensais oficiais
tiverem sido processados por `parse_relatorios.py` — assim da pra
comparar o mes novo dos dois lados. As plataformas publicas costumam
ter o informe de um mes disponivel ainda mais cedo que o Demonstrativo
do administrador chegar por e-mail, entao rodar este script pode
avisar com antecedencia que numero esperar no relatorio oficial.

Isto NAO torna o site "tempo real". E so uma leitura pontual de duas
paginas publicas no momento em que voce roda o script.
"""
import json
import os
import re
import sys
from datetime import datetime, timezone

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SITE_DIR = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(SITE_DIR, "dados-fundos", "fontes-publicas.json")

FUNDS = [
    {
        "slug": "solar-br-fidc",
        "nome": "Solar I FIDC",
        "maisretorno": "https://maisretorno.com/fundo/solar-br-fidc",
        "agentetome": "https://www.agentetome.com/f/solar-br-fundo-de-investimento-em-direitos-creditorios-51045717000190",
    },
    {
        # ATENCAO: o CNPJ na URL do agentetome abaixo e 52.498.421/0001-98,
        # que e o CNPJ do Solar Puglia (confirmado contra o cnpj oficial em
        # js/funds-data.js e contra o conteudo renderizado da propria
        # pagina). A tarefa original que gerou este script listava as URLs
        # do agentetome de Puglia e Vialoc TROCADAS entre si — troquei aqui
        # para bater com o CNPJ real de cada fundo. Se for atualizar isto,
        # confirme sempre pelo CNPJ que aparece NA PAGINA, nao pela URL.
        "slug": "solar-puglia-fidc-rl",
        "nome": "Solar Puglia FIDC",
        "maisretorno": "https://maisretorno.com/fundo/solar-puglia-fidc-rl",
        "agentetome": "https://www.agentetome.com/fundo.html?cnpj=52498421000198",
    },
    {
        "slug": "solar-vialoc-fidc",
        "nome": "Solar Vialoc FIDC",
        "maisretorno": "https://maisretorno.com/fundo/solar-vialoc-fidc",
        "agentetome": "https://www.agentetome.com/fundo.html?cnpj=39680495000182",
    },
    {
        "slug": "solar-belmonte-fidc",
        "nome": "Solar Belmonte FIDC",
        "maisretorno": "https://maisretorno.com/fundo/solar-belmonte-fidc",
        "agentetome": "https://www.agentetome.com/f/solar-belmonte-fundo-de-investimento-em-direitos-creditorios-58347004000120",
    },
]


def grab(pattern, text, group=1, flags=0):
    m = re.search(pattern, text, flags)
    return m.group(group).strip() if m else None


def parse_maisretorno(text):
    out = {}
    out["cnpj"] = grab(r"CNPJ:\s*([\d.\-/]+)", text)
    out["status"] = grab(r"\n(Em Funcionamento Normal)\n", text) or grab(r"\n(FASE PRÉ-OPERACIONAL)\n", text)
    out["administrador"] = grab(r"Administrador:\n([^\n]+)", text)
    out["gestor"] = grab(r"Gestor:\n([^\n]+)", text)
    out["patrimonioTotalCasca"] = grab(r"Patrim[oô]nio Total da casca\s*\n\s*(R\$[^\n]+)", text)
    out["cotistasTotaisCasca"] = grab(r"Cotistas Totais da casca\s*\n\s*(\d+)", text)
    return out


def parse_agentetome(text):
    # agentetome.com usa pelo menos 2 templates de pagina diferentes
    # (um estilo "dossie" com paragrafos, outro estilo "workspace" com
    # tabela PAPEL/PRESTADOR/OBSERVACAO) — os padroes abaixo tentam os
    # dois formatos.
    out = {}
    out["cnpj"] = grab(r"(\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2})", text)
    out["administrador"] = (
        grab(r"Administrador:\s*([^\n]+)", text)
        or grab(r"Administrador\t([^\t\n]+)\t", text)
    )
    out["gestor"] = (
        grab(r"Gestor:\s*([^\n]+)", text)
        or grab(r"Gestor\t([^\t\n]+)\t", text)
    )
    out["custodiante"] = (
        grab(r"Custodiante:\s*([^\n]+)", text)
        or grab(r"Custodiante\t([^\t\n]+)\t", text)
    )
    m = re.search(r"PL\s*·\s*([a-z]{3}/\d{4})\s*\n\s*(R\$[^\n]+)", text)
    if m:
        out["plCompetencia"] = m.group(1)
        out["plValor"] = m.group(2).strip()
    else:
        # template "workspace": "Patrimônio líquido\nR$ 63,7 mi\n..."
        m2 = re.search(r"Patrim[oô]nio l[ií]quido\s*\n\s*(R\$[^\n]+)", text)
        if m2:
            out["plValor"] = m2.group(1).strip()
        m3 = re.search(r"[uú]ltima compet[eê]ncia:\s*([a-zç]+/\d{4})", text, re.I)
        if m3:
            out["plCompetencia"] = m3.group(1)
    # tabela "O que foi declarado - ultimos meses": COMPETENCIA PL CARTEIRA PARC.INAD/PL PDD COTISTAS
    rows = re.findall(
        r"([a-z]{3}/\d{4})\t(R\$[^\t]+)\t(R\$[^\t]+)\t([\d,]+%)\t(R\$[^\t]+)\t(\d+)",
        text,
    )
    if rows:
        out["serieCompetencias"] = [
            {
                "competencia": r[0], "pl": r[1].strip(), "carteira": r[2].strip(),
                "percentInadimplenciaPl": r[3].strip(), "pdd": r[4].strip(), "cotistas": int(r[5]),
            }
            for r in rows
        ]
    out["reapresentacoes"] = grab(r"reapresenta[cç][oõ]es\s*\n\s*(\d+)", text, flags=re.I)
    return out


def fetch_all():
    from playwright.sync_api import sync_playwright

    snapshot = {
        "_leiaMe": (
            "Retrato pontual de maisretorno.com e agentetome.com, gerado por "
            "scripts/update-fund-data.py. NAO e a fonte de js/funds-data.js "
            "(essa continua sendo os Demonstrativos Mensais oficiais via "
            "parse_relatorios.py). Use isto so para conferencia cruzada — "
            "ver o cabecalho do script para o porque."
        ),
        "geradoEm": datetime.now(timezone.utc).isoformat(),
        "fundos": {},
    }

    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                       "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
        )
        page = ctx.new_page()

        for fund in FUNDS:
            slug = fund["slug"]
            print(f"== {fund['nome']} ({slug}) ==")
            entry = {"nome": fund["nome"]}

            for plat, parser in (("maisretorno", parse_maisretorno), ("agentetome", parse_agentetome)):
                url = fund[plat]
                try:
                    print(f"  fetching {plat}: {url}")
                    page.goto(url, timeout=45000, wait_until="networkidle")
                    page.wait_for_timeout(3000)
                    text = page.inner_text("body")
                    parsed = parser(text)
                    parsed["_url"] = url
                    entry[plat] = parsed
                except Exception as e:
                    print(f"  !! erro em {plat}: {e}")
                    entry[plat] = {"_url": url, "_erro": str(e)}

            snapshot["fundos"][slug] = entry

        browser.close()

    return snapshot


def main():
    snapshot = fetch_all()
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(snapshot, f, ensure_ascii=False, indent=2)
    print(f"\nGravado: {OUTPUT_PATH}")
    print("Este arquivo e so para conferencia manual — nao alimenta o site sozinho.")


if __name__ == "__main__":
    main()
