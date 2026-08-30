# -*- coding: utf-8 -*-
"""
Le os XML "Informe Mensal" da CVM (arquivos IFP*.xml na pasta bruta
"5. Relatorios Fundos/") -- essa e a fonte oficial estruturada da
composicao de carteira, muito mais confiavel que tentar ler numero de
grafico do PDF do demonstrativo (que nao tem o dado por tras, so o
desenho).

Escreve dados-fundos/composicao.json com, por fundo: composicao por
tipo de ativo (carteira de credito / titulos publicos / disponibilidade)
e aging de vencimento da carteira.

Uso:
    python parse_composicao.py
"""
import os
import re
import json
import glob
import xml.etree.ElementTree as ET

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_ROOT = os.path.abspath(os.path.join(BASE_DIR, "..", "..", "5. Relatórios Fundos"))
OUT_JSON = os.path.join(BASE_DIR, "composicao.json")

FUNDS = {
    "39680495000182": "solar-vialoc-fidc",
    "52498421000198": "solar-puglia-fidc-rl",
    "58347004000120": "solar-belmonte-fidc",
}


def num(el, tag):
    node = el.find(tag)
    if node is None or node.text is None:
        return None
    return float(node.text.replace(".", "").replace(",", "."))


def parse_ifp(path):
    tree = ET.parse(path)
    root = tree.getroot()
    cab = root.find("CAB_INFORM")
    cnpj = cab.findtext("NR_CNPJ_FUNDO")
    dt_compt = cab.findtext("DT_COMPT")

    lista = root.find("LISTA_INFORM")
    aplic = lista.find("APLIC_ATIVO")
    aquis = lista.find("COMPMT_DICRED_AQUIS")
    sem_aquis = lista.find("COMPMT_DICRED_SEM_AQUIS")
    cedentes = aplic.find("LISTA_CEDENT")

    total_aplic = num(aplic, "VL_SOM_APLIC_ATIVO")

    ativos = {
        "Carteira de direitos creditórios": num(aplic, "VL_CARTEIRA"),
        "Disponibilidades": num(aplic, "VL_DISPONIB"),
        "Títulos públicos federais": num(aplic, "VL_TITPUB_FED"),
        "CDB": num(aplic, "VL_CDB"),
        "Cotas de outros FIDCs": num(aplic, "VL_COTA_FIDC"),
    }
    ativos = {k: v for k, v in ativos.items() if v and v > 0}
    ativos_pct = [
        {"categoria": k, "percent": round(v / total_aplic * 100, 1)}
        for k, v in sorted(ativos.items(), key=lambda kv: -kv[1])
    ] if total_aplic else []

    # aging combinado (aquis + sem_aquis) -- dinheiro a vencer por faixa,
    # como % do total da carteira de direitos creditorios
    buckets = ["30", "31_60", "61_90", "91_120", "121_150", "151_180", "181_360", "361_720", "721_1080", "1080"]
    labels = ["até 30 dias", "31 a 60 dias", "61 a 90 dias", "91 a 120 dias", "121 a 150 dias",
              "151 a 180 dias", "181 a 360 dias", "361 a 720 dias", "721 a 1080 dias", "mais de 1080 dias"]
    aging_total = 0
    aging_vals = []
    for b in buckets:
        v = (num(aquis, f"VL_PRAZO_VENC_{b}") or 0) + (num(sem_aquis, f"VL_PRAZO_VENC_{b}") or 0)
        aging_vals.append(v)
        aging_total += v
    aging_pct = [
        {"faixa": lbl, "percent": round(v / aging_total * 100, 1)}
        for lbl, v in zip(labels, aging_vals) if aging_total and v > 0
    ]

    inad_total = (num(aquis, "VL_SOM_INAD_VENC") or 0) + (num(sem_aquis, "VL_SOM_INAD_VENC") or 0)
    carteira_total = (num(aquis, "VL_SOM_PRAZO_VENC") or 0) + (num(sem_aquis, "VL_SOM_PRAZO_VENC") or 0) + inad_total

    top_cedentes = []
    if cedentes is not None:
        for c in cedentes.findall("CEDENT"):
            pr = c.findtext("PR_CEDENT")
            if pr:
                top_cedentes.append(round(float(pr.replace(",", ".")), 1))
    top_cedentes.sort(reverse=True)

    return {
        "cnpj": cnpj,
        "dataBase": dt_compt,
        "composicaoAtivos": ativos_pct,
        "agingCarteira": aging_pct,
        "inadimplenciaPercentCarteira": round(inad_total / carteira_total * 100, 2) if carteira_total else None,
        "concentracaoTop3Cedentes": round(sum(top_cedentes[:3]), 1) if top_cedentes else None,
        "concentracaoTop5Cedentes": round(sum(top_cedentes[:5]), 1) if top_cedentes else None,
    }


def main():
    result = {}
    for xml_path in glob.glob(os.path.join(RAW_ROOT, "*IFP*.xml")):
        base = os.path.basename(xml_path)
        m = re.match(r"(\d{14})-IFP", base)
        if not m:
            continue
        cnpj = m.group(1)
        slug = FUNDS.get(cnpj)
        if not slug:
            print(f"[!] CNPJ {cnpj} não mapeado para nenhum fundo conhecido ({base})")
            continue
        data = parse_ifp(xml_path)
        # se houver mais de um IFP pro mesmo fundo, fica o de data-base mais recente
        if slug not in result or data["dataBase"] > result[slug]["dataBase"]:
            result[slug] = data
        print(f"[OK] {slug}: {data['dataBase']} -- {len(data['composicaoAtivos'])} categorias de ativo, "
              f"{len(data['agingCarteira'])} faixas de aging")

    with open(OUT_JSON, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    print(f"\n[OK] Salvo em {OUT_JSON}")
    missing = set(FUNDS.values()) | {"solar-fidc-multissetorial"}
    missing -= set(result.keys())
    if missing:
        print(f"[!] Sem XML da CVM para: {', '.join(sorted(missing))}")


if __name__ == "__main__":
    main()
