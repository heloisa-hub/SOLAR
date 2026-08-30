# -*- coding: utf-8 -*-
"""
Le os relatorios mensais em PDF (pasta dados-fundos/relatorios/<AAAA-MM>/)
e regenera js/funds-data.js.

Uso:
    python parse_relatorios.py 2026-06

Dados estaveis (nome, CNPJ, descricao, rating, benchmark) vem do
manifest.json - o parser só extrai numeros que mudam mes a mes
(patrimonio, rentabilidade por classe, carteira de credito).

Se um PDF novo nao bater com o layout esperado, o script avisa em vez
de gravar numero errado.
"""
import sys
import os
import re
import json
import glob

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MANIFEST_PATH = os.path.join(BASE_DIR, "manifest.json")
REPORTS_ROOT = os.path.join(BASE_DIR, "relatorios")
OUTPUT_JS = os.path.join(BASE_DIR, "..", "js", "funds-data.js")
COMPOSICAO_PATH = os.path.join(BASE_DIR, "composicao.json")


HISTORICO_PATH = os.path.join(BASE_DIR, "historico.json")


def load_historico():
    """Serie mensal por classe, gerada por build_historico.py a partir de
    TODOS os Demonstrativos Mensais da pasta bruta (nao so o mes atual).
    So usada pra classes que o template do mes nao ja trouxe com
    historicoMensal proprio (hoje: templates 'singulare')."""
    if not os.path.exists(HISTORICO_PATH):
        return {}
    with open(HISTORICO_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def load_composicao():
    """Composicao de carteira vem do Informe Mensal (XML oficial da CVM),
    nao do demonstrativo mensal -- ver dados-fundos/parse_composicao.py.
    Retorna {} se o arquivo ainda nao foi gerado para nenhum fundo."""
    if not os.path.exists(COMPOSICAO_PATH):
        return {}
    with open(COMPOSICAO_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def clean_currency(raw):
    """'2 40.038.343' ou '304.498.232' -> 240038343.0"""
    if raw is None:
        return None
    s = re.sub(r"\s+", "", raw)
    s = s.replace(".", "").replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def fmt_reais(value):
    if value is None:
        return None
    if value == 0:
        return "R$ 0"
    if abs(value) < 1_000_000:
        mil = value / 1_000
        return "R$ " + f"{mil:.0f}".replace(".", ",") + " mil"
    milhoes = value / 1_000_000
    return "R$ " + f"{milhoes:.2f}".replace(".", ",") + " milhões"


def to_float_pct(token):
    if token is None:
        return None
    token = token.strip().rstrip("%").replace(",", ".")
    try:
        return float(token)
    except ValueError:
        return None


def find_all_percents(s):
    return re.findall(r"-?\d+(?:,\d+)?%", s)


# ============================================================
# Template "singulare" — Demonstrativo Mensal (Puglia, Vialoc, Multissetorial)
# ============================================================
def parse_singulare(text, class_names):
    joined = " ".join(l.strip() for l in text.split("\n"))

    def grab(pattern):
        m = re.search(pattern, joined)
        return m.group(1).strip() if m else None

    result = {"warnings": []}

    # captura o trecho numérico inteiro (dígito/ponto/vírgula/espaço) logo
    # após "R$", parando sozinho no primeiro caractere que não é nada disso
    # (letra, %, -, fim de linha...). Não depende do texto que vem depois,
    # porque no PDF ele costuma ser o rótulo da OUTRA coluna, não o próximo
    # campo desta. O pdfplumber às vezes insere um espaço espúrio no meio
    # do número (ex: "1 .094.342"), por isso aceita espaço em qualquer
    # posição e limpa tudo depois em clean_currency().
    NUM = r"([\d.,\s]+)"

    pl_raw = grab(r"Patrim[oô]nio L[ií]quido em \d{2}/\d{2}/\d{4}\s+R\$\s*" + NUM)
    result["plAtual"] = clean_currency(pl_raw)
    if result["plAtual"] is None:
        result["warnings"].append("Não encontrei Patrimônio Líquido")

    result["carteiraCredito"] = clean_currency(grab(r"Carteira de Cr[eé]dito\s+R\$\s*" + NUM))
    result["creditosAtraso"] = clean_currency(grab(r"Cr[eé]ditos em Atraso\s+R\$\s*" + NUM))
    result["pdd"] = clean_currency(grab(r"\(PDD\)\s+R\$\s*" + NUM))
    result["disponibilidade"] = clean_currency(grab(r"Disponibilidade\s+R\$\s*" + NUM))
    result["percentDcSobrePl"] = grab(r"% Direitos Credit[oó]rios x Patrim[oô]nio\s+([\d,]+%)")

    # classes de cota: para cada nome de classe conhecido (do manifest), acha a
    # linha que comeca com esse nome e a linha seguinte "Inicio da Cota..."
    #
    # Alguns relatorios (dependendo de quantos meses de historico a classe ja
    # tem) trazem uma SEGUNDA ocorrencia do nome da classe mais adiante no PDF,
    # num miniquadro de apoio a um grafico (ex: "Senior2 0,96% 1,33% 1,23%...").
    # Essa linha nao tem "Inicio da Cota em ..." na linha seguinte (tem "% CDI"
    # sem a data) -- por isso so aceitamos uma ocorrencia como a linha oficial
    # da tabela "Evolucao das Cotas" quando essa validacao bate. Sem isso, essa
    # segunda ocorrencia podia sobrescrever os numeros certos com lixo.
    classes = {}
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    for i, line in enumerate(lines):
        for cname in class_names:
            if line.startswith(cname + " "):
                cdi_line = lines[i + 1] if i + 1 < len(lines) else ""
                if not re.search(r"Início da Cota em \d{2}/\d{2}/\d{4}", cdi_line):
                    continue  # não é a linha oficial — ignora e segue procurando

                rest = line[len(cname):].strip()
                # Remove o texto do benchmark ("CDI + 4,5% a.a.") antes de
                # tudo -- ele tem um "%" no meio e bagunça a contagem.
                rest_clean = re.sub(r"CDI\s*\+\s*[\d,]+%\s*a\.a\.?", " ", rest)
                all_pcts = find_all_percents(rest_clean)
                if not all_pcts:
                    continue  # linha sem nenhum percentual -- não é a linha certa

                # O %PL é SEMPRE o primeiro percentual da linha, independente
                # de vir ou não precedido do valor em reais da classe -- o
                # formato do relatório mudou ao longo dos anos (relatórios
                # mais antigos do Multissetorial não trazem o valor em reais
                # nessa linha, só o %PL direto). Ancorar no primeiro % em vez
                # de exigir "reais + %PL" evita que o %PL escorregue pra
                # dentro das 6 colunas de período (bug real encontrado nos
                # relatórios de 2025 do Multissetorial: "Sênior6 36,17%
                # 1,26% 3,97%..." sem reais, o %PL 36,17% estava sendo lido
                # como se fosse o retorno do mês).
                percent_pl = to_float_pct(all_pcts[0])
                m_val = re.match(r"([\d.,\s]+?)\s*" + re.escape(all_pcts[0]), rest_clean)
                class_pl = clean_currency(m_val.group(1)) if m_val and m_val.group(1).strip() else None

                # As 6 colunas (Mês/Ano/3M/6M/12M/Início) às vezes trazem um
                # "-" avulso pra um período SEM dado -- e não só nas últimas
                # colunas (classe nova), pode aparecer no MEIO da sequência
                # também (ex.: "Mezanino ... brBBB-(sf) - 9,89% 3,33% 8,15%
                # 19,25% 68,90%", onde só o Mês ficou sem valor naquele mês).
                # find_all_percents() ignora o "-" e faz tudo deslizar uma
                # casa pra esquerda -- por isso aqui percorremos token a
                # token (separados por espaço) depois do %PL, aceitando "-"
                # como um período vazio na posição certa, não descartando.
                after_pl = rest_clean[rest_clean.find(all_pcts[0]) + len(all_pcts[0]):]
                periodo = []
                for tok in after_pl.split():
                    if tok == "-" or re.fullmatch(r"-?\d+,\d+%", tok):
                        periodo.append(tok)
                        if len(periodo) == 6:
                            break
                    elif periodo:
                        break  # sequência de período já tinha começado e acabou

                cdi_periodo = []
                for tok in cdi_line.split():
                    if tok == "-" or re.fullmatch(r"-?\d+,\d+%", tok):
                        cdi_periodo.append(tok)
                        if len(cdi_periodo) == 6:
                            break
                    elif cdi_periodo:
                        break

                if len(periodo) < 6 or len(cdi_periodo) < 6:
                    result["warnings"].append(
                        f"Classe {cname}: só achei {len(periodo)}/6 períodos de retorno e {len(cdi_periodo)}/6 de %CDI "
                        "(normal para classe muito nova — confira se as colunas faltando são mesmo as mais recentes/12M/Início)"
                    )

                def get(lst, idx):
                    return to_float_pct(lst[idx]) if idx < len(lst) else None

                classes[cname] = {
                    "percentPL": percent_pl,
                    "plReais": fmt_reais(class_pl),
                    "mes": get(periodo, 0), "ano": get(periodo, 1),
                    "tresMeses": get(periodo, 2), "seisMeses": get(periodo, 3),
                    "dozeMeses": get(periodo, 4), "desdeInicio": get(periodo, 5),
                    "cdiMes": get(cdi_periodo, 0), "cdiAno": get(cdi_periodo, 1),
                    "cdi3m": get(cdi_periodo, 2), "cdi6m": get(cdi_periodo, 3),
                    "cdi12m": get(cdi_periodo, 4), "cdiInicio": get(cdi_periodo, 5),
                }
                m_date = re.search(r"Início da Cota em (\d{2}/\d{2}/\d{4})", cdi_line)
                if m_date:
                    d, mo, y = m_date.group(1).split("/")
                    classes[cname]["dataInicioCota"] = f"{y}-{mo}-{d}"
                break

    for cname in class_names:
        if cname not in classes:
            result["warnings"].append(f"Classe '{cname}' esperada (no manifest) não encontrada no PDF")

    result["classes"] = classes
    return result


# ============================================================
# Template "solar-br" — Relatorio Solar BR (Fram Capital)
# ============================================================
def parse_solar_br(text, class_names):
    joined = " ".join(l.strip() for l in text.split("\n"))
    result = {"warnings": []}

    m = re.search(r"PL \w+/\d{4}:\s*([\d.,\s]+?)\s+Gestor", joined)
    result["plAtual"] = clean_currency(m.group(1)) if m else None
    if result["plAtual"] is None:
        result["warnings"].append("Não encontrei PL")

    classes = {}
    label_map = {"Subordinada": "Subordinada", "Mezanino": "Mezanino", "Sênior": "Sênior"}
    for cname, label in label_map.items():
        if cname not in class_names:
            continue
        # bloco "Retornos Mensais - <Classe>" ... ate a proxima secao "Retornos Mensais" ou "Rentabilidade acumulada"
        m_block = re.search(
            r"Retornos Mensais.{0,3}" + re.escape(label) + r"(.*?)(?=Retornos Mensais|Rentabilidade acumulada)",
            text, re.S
        )
        if not m_block:
            result["warnings"].append(f"Classe {cname}: bloco 'Retornos Mensais' não encontrado")
            continue
        block = m_block.group(1)
        block_lines = [l.strip() for l in block.split("\n") if l.strip()]
        # linha "2026 <mes1> <mes2> ... Ano Início" e linha seguinte "% do CDI ..."
        year_line = next((l for l in block_lines if re.match(r"^\d{4}\b", l)), None)
        cdi_line = next((l for l in block_lines if l.startswith("% do CDI")), None)

        monthly = []
        ano_val = inicio_val = None
        if year_line:
            nums = re.findall(r"-?\d+,\d+%", year_line)
            if nums:
                ano_val = to_float_pct(nums[-2]) if len(nums) >= 2 else None
                inicio_val = to_float_pct(nums[-1])
                monthly_vals = nums[:-2] if len(nums) >= 2 else []
                meses_pt = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
                # meses vazios ("-") no início do ano não aparecem no texto —
                # os valores presentes são sempre os ÚLTIMOS N meses antes do
                # mês-base do relatório (ex: fundo novo só tem Mar..Jun)
                m_base = re.search(r"\b(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)/(\d{4})", text)
                base_month_num = 12
                if m_base:
                    base_month_num = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"].index(m_base.group(1)) + 1
                start_idx = base_month_num - len(monthly_vals)
                mes_idx = meses_pt[max(start_idx, 0):base_month_num]
                ano_atual = re.match(r"^(\d{4})", year_line).group(1)
                for mi, val in zip(mes_idx, monthly_vals):
                    monthly.append({"mes": f"{ano_atual}-{mi}", "rentabilidade": to_float_pct(val)})

        cdi_mes = cdi_ano = cdi_inicio = None
        if cdi_line:
            cnums = re.findall(r"\d+%", cdi_line)
            if cnums:
                cdi_ano = to_float_pct(cnums[-2]) if len(cnums) >= 2 else None
                cdi_inicio = to_float_pct(cnums[-1])

        classes[cname] = {
            "percentPL": None, "plReais": None,
            "mes": monthly[-1]["rentabilidade"] if monthly else None,
            "ano": ano_val, "tresMeses": None, "seisMeses": None, "dozeMeses": None,
            "desdeInicio": inicio_val,
            "cdiMes": None, "cdiAno": cdi_ano, "cdi3m": None, "cdi6m": None, "cdi12m": None,
            "cdiInicio": cdi_inicio,
            "historicoMensal": monthly,
        }

    for cname in class_names:
        if cname not in classes:
            result["warnings"].append(f"Classe '{cname}' esperada (no manifest) não encontrada no PDF")

    result["classes"] = classes
    result["carteiraCredito"] = None
    result["creditosAtraso"] = None
    result["pdd"] = None
    result["disponibilidade"] = None
    result["percentDcSobrePl"] = None
    return result


def js_string(value):
    if value is None:
        return "null"
    escaped = str(value).replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def js_value(value):
    if value is None:
        return "null"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, (int, float)):
        return repr(round(value, 4))
    if isinstance(value, list):
        return "[" + ", ".join(js_value(v) for v in value) + "]"
    if isinstance(value, dict):
        items = ", ".join(f"{k}: {js_value(v)}" for k, v in value.items())
        return "{ " + items + " }"
    return js_string(value)


def build_funds_js(funds):
    parts = [
        "/*\n"
        " * Fonte única de dados dos fundos.\n"
        " * GERADO AUTOMATICAMENTE por dados-fundos/parse_relatorios.py — não edite à mão.\n"
        " * Para atualizar: coloque os PDFs do mês em dados-fundos/relatorios/<AAAA-MM>/\n"
        " * e rode `python dados-fundos/parse_relatorios.py <AAAA-MM>`.\n"
        " * Dados estáveis (nome, descrição, rating, benchmark) vêm de dados-fundos/manifest.json.\n"
        " */\n"
        "var SOLAR_CAPITAL_FUNDS = [\n"
    ]
    fund_blocks = []
    for f in funds:
        classes_js = "[\n" + ",\n".join(
            "      " + js_value(c) for c in f["classesList"]
        ) + "\n    ]"
        block = "  {\n"
        field_order = [
            "slug", "nome", "cnpj", "classificacaoAnbima", "estrategiaResumo", "classeCvm", "publicoAlvo",
            "gestor", "administrador", "custodiante", "agenciaRating", "consultora",
            "condominio", "dataInicio", "status", "statusLabel", "dataBase",
            "plAtual", "carteiraCredito", "creditosAtraso", "pdd", "disponibilidade",
            "percentDcSobrePl", "aplicacaoCotizacao", "aplicacaoLiquidacao",
            "resgateCotizacao", "resgateLiquidacao", "classePrincipal", "janelaResgate",
            "inadimplenciaCvmPercentPL",
        ]
        for key in field_order:
            if key in f:
                block += f"    {key}: {js_value(f[key])},\n"
        block += f"    classes: {classes_js},\n"
        block += f"    descricao: {js_value(f['descricao'])},\n"
        block += f"    estrategia: {js_value(f['estrategia'])},\n"
        composicao_js = "[\n" + ",\n".join("      " + js_value(c) for c in f.get("composicaoPortfolio", [])) + "\n    ]" if f.get("composicaoPortfolio") else "[]"
        block += f"    composicaoPortfolio: {composicao_js},\n"
        docs_js = "[\n" + ",\n".join("      " + js_value(d) for d in f["documentos"]) + "\n    ]"
        block += f"    documentos: {docs_js},\n"
        block += f"    fonteDados: {js_value(f['fonteDados'])},\n"
        block += "    illustrative: false\n"
        block += "  }"
        fund_blocks.append(block)
    parts.append(",\n".join(fund_blocks))
    parts.append("\n];\n")
    return "".join(parts)


def main():
    if len(sys.argv) < 2:
        print("Uso: python parse_relatorios.py <AAAA-MM>")
        sys.exit(1)
    month = sys.argv[1]
    reports_dir = os.path.join(REPORTS_ROOT, month)
    if not os.path.isdir(reports_dir):
        print(f"Pasta não encontrada: {reports_dir}")
        sys.exit(1)

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)
    composicao = load_composicao()
    historico = load_historico()

    try:
        import pdfplumber
    except ImportError:
        print("Instale a dependência primeiro: pip install pdfplumber")
        sys.exit(1)

    pdf_files = glob.glob(os.path.join(reports_dir, "*.pdf"))
    data_base_label = None
    y, m = month.split("-")
    meses_nome = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    data_base_label = f"{meses_nome[int(m)-1]}/{y}"

    all_funds = []
    any_warning = False

    for fund_manifest in manifest["funds"]:
        needle = fund_manifest["arquivoContem"].lower()
        match_pdf = next((p for p in pdf_files if needle in os.path.basename(p).lower()), None)
        if not match_pdf:
            print(f"[!] Nenhum PDF encontrado para '{fund_manifest['nome']}' (procurei por \"{fund_manifest['arquivoContem']}\") em {reports_dir}")
            any_warning = True
            continue

        with pdfplumber.open(match_pdf) as pdf:
            text = "\n".join(page.extract_text() or "" for page in pdf.pages[:1])

        class_names = list(fund_manifest["classes"].keys())
        if fund_manifest["template"] == "singulare":
            parsed = parse_singulare(text, class_names)
        elif fund_manifest["template"] == "solar-br":
            parsed = parse_solar_br(text, class_names)
        else:
            print(f"[!] Template desconhecido para {fund_manifest['nome']}: {fund_manifest['template']}")
            any_warning = True
            continue

        for w in parsed["warnings"]:
            print(f"[!] {fund_manifest['nome']}: {w}")
            any_warning = True

        classes_list = []
        for cname, cmeta in fund_manifest["classes"].items():
            parsed_c = parsed["classes"].get(cname, {})
            entry = {
                "nome": cname,
                "percentPL": parsed_c.get("percentPL"),
                "rating": cmeta.get("rating"),
                "benchmark": cmeta.get("benchmark"),
                "dataInicioCota": parsed_c.get("dataInicioCota"),
                "plReais": parsed_c.get("plReais"),
                "mes": parsed_c.get("mes"), "ano": parsed_c.get("ano"),
                "tresMeses": parsed_c.get("tresMeses"), "seisMeses": parsed_c.get("seisMeses"),
                "dozeMeses": parsed_c.get("dozeMeses"), "desdeInicio": parsed_c.get("desdeInicio"),
                "cdiMes": parsed_c.get("cdiMes"), "cdiAno": parsed_c.get("cdiAno"),
                "cdi3m": parsed_c.get("cdi3m"), "cdi6m": parsed_c.get("cdi6m"),
                "cdi12m": parsed_c.get("cdi12m"), "cdiInicio": parsed_c.get("cdiInicio"),
            }
            if "historicoMensal" in parsed_c:
                entry["historicoMensal"] = parsed_c["historicoMensal"]
            else:
                hist = historico.get(fund_manifest["slug"], {}).get(cname)
                if hist:
                    entry["historicoMensal"] = hist
            classes_list.append(entry)

        pl_raw = parsed.get("plAtual")
        creditos_atraso_raw = parsed.get("creditosAtraso")
        inadimplencia_pl = (
            round(creditos_atraso_raw / pl_raw * 100, 2)
            if pl_raw and creditos_atraso_raw is not None
            else None
        )

        composicao_fundo = composicao.get(fund_manifest["slug"], {})
        composicao_portfolio = composicao_fundo.get("composicaoAtivos", [])

        fund_out = {
            "slug": fund_manifest["slug"],
            "nome": fund_manifest["nome"],
            "cnpj": fund_manifest["cnpj"],
            "classificacaoAnbima": fund_manifest["classificacaoAnbima"],
            "classeCvm": fund_manifest["classeCvm"],
            "publicoAlvo": fund_manifest["publicoAlvo"],
            "gestor": fund_manifest.get("gestor"),
            "administrador": fund_manifest.get("administrador"),
            "custodiante": fund_manifest.get("custodiante"),
            "dataInicio": fund_manifest["dataInicio"],
            "status": "operacional",
            "statusLabel": "Em funcionamento normal",
            "dataBase": data_base_label,
            "plAtual": fmt_reais(parsed.get("plAtual")),
            "carteiraCredito": fmt_reais(parsed.get("carteiraCredito")),
            "creditosAtraso": fmt_reais(parsed.get("creditosAtraso")),
            "pdd": fmt_reais(parsed.get("pdd")),
            "disponibilidade": fmt_reais(parsed.get("disponibilidade")),
            "percentDcSobrePl": parsed.get("percentDcSobrePl"),
            "classePrincipal": fund_manifest["classePrincipal"],
            "janelaResgate": fund_manifest.get("janelaResgate"),
            "inadimplenciaCvmPercentPL": inadimplencia_pl,
            "composicaoPortfolio": composicao_portfolio,
            "classesList": classes_list,
            "descricao": fund_manifest["descricao"],
            "estrategia": fund_manifest["estrategia"],
            "documentos": fund_manifest["documentos"],
            "fonteDados": f"Relatório mensal oficial — {data_base_label}",
        }
        if "consultora" in fund_manifest:
            fund_out["consultora"] = fund_manifest["consultora"]
        if "condominio" in fund_manifest:
            fund_out["condominio"] = fund_manifest["condominio"]
        if fund_manifest["template"] == "singulare":
            fund_out["agenciaRating"] = "Austin Rating"
            fund_out["statusLabel"] = "Em funcionamento normal"

        all_funds.append(fund_out)
        print(f"[OK] {fund_manifest['nome']} — PL {fund_out['plAtual']}, {len(classes_list)} classe(s)")

    if not all_funds:
        print("Nenhum fundo processado — nada foi gravado.")
        sys.exit(1)

    js_content = build_funds_js(all_funds)
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"\n{'[!] Gerado com avisos — revise antes de publicar.' if any_warning else '[OK] Gerado sem avisos.'}")
    print(f"Arquivo: {os.path.abspath(OUTPUT_JS)}")


if __name__ == "__main__":
    main()
