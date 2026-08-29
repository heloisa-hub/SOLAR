/*
 * Fonte única de dados dos fundos.
 * GERADO AUTOMATICAMENTE por dados-fundos/parse_relatorios.py — não edite à mão.
 * Para atualizar: coloque os PDFs do mês em dados-fundos/relatorios/<AAAA-MM>/
 * e rode `python dados-fundos/parse_relatorios.py <AAAA-MM>`.
 * Dados estáveis (nome, descrição, rating, benchmark) vêm de dados-fundos/manifest.json.
 */
var SOLAR_CAPITAL_FUNDS = [
  {
    slug: "solar-br-fidc",
    nome: "Solar I FIDC",
    cnpj: "51.045.717/0001-90",
    fraseEstrategia: "Fundo feeder que aloca capital sênior e mezanino entre os FIDCs da família Solar geridos por Fram Capital ou Iggy Investimentos, com a Solar Capital como consultora de crédito.",
    classificacaoAnbima: "Crédito Estruturado",
    estrategiaResumo: "Multicedente / multissacado",
    classeCvm: "Fundo de Investimento em Direitos Creditórios",
    publicoAlvo: "Investidor profissional",
    janelaResgate: "Sem série aberta no momento",
    gestor: "Fram Capital",
    administrador: "Q.I. Tech",
    custodiante: "QI Corretora de Títulos e Valores Mobiliários S.A.",
    consultora: "Solar Capital",
    condominio: "Fechado",
    dataInicio: "2025-12-30",
    status: "operacional",
    statusLabel: "Em funcionamento normal",
    dataBase: "Jul/2026",
    plAtual: "R$ 61,88 milhões",
    carteiraCredito: null,
    creditosAtraso: null,
    pdd: null,
    disponibilidade: null,
    percentDcSobrePl: null,
    classePrincipal: "Sênior",
    // percentPL/plReais das 3 classes: NÃO vêm do parser automático (o
    // template Fram Capital só extrai rentabilidade) — foram calculados a
    // partir da tabela "PL por subclasse (Passivo)" da página 2 do PDF
    // oficial (20260728 Relatório Solar BR_Junho.pdf, dado de 06/2026:
    // Cotas Senior R$37,3mi / Mezanino R$7,2mi / Subordinadas R$17,3mi,
    // total R$61,9mi). Precisão limitada pelo arredondamento de 1 casa
    // decimal da fonte. benchmark da Sênior ("CDI + 3% a.a.") vem do
    // apêndice do regulamento (não do demonstrativo mensal, que não tem
    // coluna de meta) — citado pelo dossiê do Tomé (agentetome.com) com
    // referência ao documento específico (doc 1082162); Mezanino/Subordinada
    // seguem sem meta divulgada nessa mesma fonte.
    classes: [
      { nome: "Sênior", percentPL: 60.26, rating: null, benchmark: "CDI + 3,00% a.a.", dataInicioCota: null, plReais: "R$ 37,30 milhões", mes: 1.37, ano: 5.6, tresMeses: null, seisMeses: null, dozeMeses: null, desdeInicio: 5.6, cdiMes: null, cdiAno: 122.0, cdi3m: null, cdi6m: null, cdi12m: null, cdiInicio: 122.0, historicoMensal: [{ mes: "2026-03", rentabilidade: 1.47 }, { mes: "2026-04", rentabilidade: 1.33 }, { mes: "2026-05", rentabilidade: 1.31 }, { mes: "2026-06", rentabilidade: 1.37 }] },
      { nome: "Mezanino", percentPL: 11.63, rating: null, benchmark: null, dataInicioCota: null, plReais: "R$ 7,20 milhões", mes: 1.61, ano: 4.78, tresMeses: null, seisMeses: null, dozeMeses: null, desdeInicio: 4.78, cdiMes: null, cdiAno: 144.0, cdi3m: null, cdi6m: null, cdi12m: null, cdiInicio: 144.0, historicoMensal: [{ mes: "2026-04", rentabilidade: 1.55 }, { mes: "2026-05", rentabilidade: 1.54 }, { mes: "2026-06", rentabilidade: 1.61 }] },
      { nome: "Subordinada", percentPL: 27.95, rating: null, benchmark: null, dataInicioCota: null, plReais: "R$ 17,30 milhões", mes: -2.14, ano: 0.5, tresMeses: null, seisMeses: null, dozeMeses: null, desdeInicio: 0.5, cdiMes: null, cdiAno: 7.0, cdi3m: null, cdi6m: null, cdi12m: null, cdiInicio: 7.0, historicoMensal: [{ mes: "2026-01", rentabilidade: 4.73 }, { mes: "2026-02", rentabilidade: -1.81 }, { mes: "2026-03", rentabilidade: 0.13 }, { mes: "2026-04", rentabilidade: -0.42 }, { mes: "2026-05", rentabilidade: 0.15 }, { mes: "2026-06", rentabilidade: -2.14 }] }
    ],
    descricao: "O Solar I FIDC estrutura direitos creditórios de fomento mercantil multicedente e multissacado, transformando recebíveis de empresas em ativos investíveis sob supervisão da CVM. Iniciou sua primeira cotização em dezembro de 2025.",
    estrategia: "Aquisição de direitos creditórios com critérios de elegibilidade e diversificação de cedentes, com estrutura de cotas segmentada por nível de subordinação (Sênior, Mezanino e Subordinada).",
    tese: {
      originacao: "Não origina diretamente: aloca capital, via cotas, nos FIDCs Puglia, Vialoc e Belmonte — que originam duplicatas de fomento mercantil multicedente/multissacado. O regulamento restringe o investimento a fundos geridos ou cogeridos por Fram Capital ou Iggy Investimentos, com a Solar Capital como consultora de crédito.",
      protecao: "Estrutura própria de Sênior, Mezanino e Subordinada — a Subordinada absorve primeiro as oscilações de valor das cotas que o fundo detém nos FIDCs-alvo.",
      geracaoRetorno: "O retorno vem do spread entre o que os FIDCs-alvo pagam às cotas detidas pelo Solar I e o que o Solar I paga às próprias classes Sênior e Mezanino."
    },
    // "Parcelas inadimplentes/PL" é um campo do informe CVM/FNET distinto do
    // saldo de "Créditos em Atraso" mostrado em Carteira & Crédito (que vem
    // do demonstrativo mensal do administrador) — a própria Tomé (agentetome.
    // com) documenta essa diferença. Não temos como conferir esse número
    // contra o PDF oficial (ele não traz esse campo específico); mantido
    // separado e datado por transparência de fonte.
    inadimplenciaCvmPercentPL: 0.0,
    fonteInadimplenciaCvm: "Tomé / informe CVM-FNET, competência jul/2026",
    composicaoPortfolio: [],
    documentos: [
      { nome: "Regulamento", disponivel: false },
      { nome: "Lâmina de Informações Essenciais", disponivel: false },
      { nome: "Formulário de Ingresso", disponivel: false }
    ],
    fonteDados: "Relatório mensal oficial — Jul/2026",
    illustrative: false
  },
  {
    slug: "solar-puglia-fidc-rl",
    nome: "Solar Puglia FIDC",
    cnpj: "52.498.421/0001-98",
    fraseEstrategia: "O maior fundo da família Solar em patrimônio líquido — duplicatas de fomento mercantil multicedente, prazo médio de carteira curto e sacados diversificados.",
    classificacaoAnbima: "Crédito Estruturado",
    estrategiaResumo: "Proprietário",
    classeCvm: "Fundo de Investimento em Direitos Creditórios (Resolução CVM 175)",
    // Público-alvo confirmado por e-mail direto de Douglas Borges (Solar
    // Capital) em 28/08/2026: "Puglia: Investidores Qualificados, ABERTO" —
    // bate com o que já tínhamos derivado do próprio Regulamento ("condomínio
    // aberto"). Janela de resgate também informada diretamente: Sênior1 tem
    // resgate D+60 (fundo aberto).
    publicoAlvo: "Investidor qualificado",
    janelaResgate: "Fundo aberto — resgate D+60 (classe Sênior1)",
    // Administrador/custodiante corrigidos em 2026-08-28: o demonstrativo mensal
    // jul/2026 (fonte de todo o resto deste objeto) rotula "Singulare", mas o
    // Regulamento vigente (03/08/2026, arquivo 5. Relatórios
    // Fundos/52498421000198-REG14082026V01-001293263.pdf) define a
    // "Administradora" como QI Corretora de Títulos e Valores Mobiliários S.A.,
    // CNPJ 62.285.390/0001-40 — o mesmo CNPJ que a API do Tomé associa ao nome
    // "Singulare" (ver nota _notaSingulareQI em manifest.json). Não é conflito:
    // é a mesma pessoa jurídica sob dois nomes, ou um rebranding no período
    // entre jul/2026 (nome antigo no demonstrativo) e ago/2026 (nome atual no
    // regulamento). Gestora confirmada como Iguana/Iggy Investimentos no mesmo
    // regulamento, que também define Cogestora = Fram Capital – Gestão de
    // Ativos Ltda. (CNPJ 08.157.028/0001-49) — papel que o demonstrativo mensal
    // (template de 1 página) simplesmente não tem campo para mostrar.
    gestor: "Iggy Investimentos (cogestora: Fram Capital – Gestão de Ativos)",
    administrador: "QI Corretora de Títulos e Valores Mobiliários S.A.",
    custodiante: "QI Corretora de Títulos e Valores Mobiliários S.A.",
    condominio: "Aberto",
    agenciaRating: "Austin Rating",
    dataInicio: "2023-12-20",
    status: "operacional",
    statusLabel: "Em funcionamento normal",
    dataBase: "Jul/2026",
    plAtual: "R$ 311,16 milhões",
    carteiraCredito: "R$ 246,97 milhões",
    creditosAtraso: "R$ 5,84 milhões",
    pdd: "R$ 964 mil",
    disponibilidade: "R$ 63,82 milhões",
    percentDcSobrePl: "79,37%",
    classePrincipal: "Sênior1",
    classes: [
      { nome: "Subordinada", percentPL: 44.76, rating: "N/A", benchmark: null, dataInicioCota: "2023-12-20", plReais: "R$ 139,27 milhões", mes: 3.53, ano: 45.44, tresMeses: 13.66, seisMeses: 37.03, dozeMeses: 88.0, desdeInicio: 321.13, cdiMes: 290.2, cdiAno: 558.1, cdi3m: 396.3, cdi6m: 536.8, cdi12m: 598.1, cdiInicio: 857.8, historicoMensal: [{ mes: "2024-01", rentabilidade: 1.06 }, { mes: "2024-02", rentabilidade: 1.29 }, { mes: "2024-03", rentabilidade: 1.99 }, { mes: "2024-04", rentabilidade: 3.01 }, { mes: "2024-05", rentabilidade: 3.46 }, { mes: "2024-06", rentabilidade: 4.19 }, { mes: "2024-07", rentabilidade: 4.88 }, { mes: "2024-08", rentabilidade: 4.36 }, { mes: "2024-09", rentabilidade: 4.51 }, { mes: "2024-10", rentabilidade: 5.49 }, { mes: "2024-11", rentabilidade: 4.65 }, { mes: "2024-12", rentabilidade: 4.73 }, { mes: "2025-01", rentabilidade: 5.43 }, { mes: "2025-02", rentabilidade: 5.65 }, { mes: "2025-03", rentabilidade: 5.28 }, { mes: "2025-04", rentabilidade: 5.16 }, { mes: "2025-05", rentabilidade: 6.26 }, { mes: "2025-06", rentabilidade: 4.79 }, { mes: "2025-07", rentabilidade: 6.15 }, { mes: "2025-08", rentabilidade: 4.93 }, { mes: "2025-09", rentabilidade: 4.85 }, { mes: "2025-10", rentabilidade: 5.62 }, { mes: "2025-11", rentabilidade: 4.88 }, { mes: "2025-12", rentabilidade: 6.07 }, { mes: "2026-02", rentabilidade: 5.76 }, { mes: "2026-03", rentabilidade: 7.46 }, { mes: "2026-04", rentabilidade: 6.07 }, { mes: "2026-05", rentabilidade: 5.91 }, { mes: "2026-06", rentabilidade: 3.67 }, { mes: "2026-07", rentabilidade: 3.53 }] },
      { nome: "Sênior1", percentPL: 55.24, rating: "N/A", benchmark: "CDI + 4,00% a.a.", dataInicioCota: "2024-12-02", plReais: "R$ 171,89 milhões", mes: 1.58, ano: 10.61, tresMeses: 4.48, seisMeses: 8.98, dozeMeses: 18.9, desdeInicio: 31.83, cdiMes: 129.9, cdiAno: 130.3, cdi3m: 130.1, cdi6m: 130.2, cdi12m: 128.7, cdiInicio: 128.7, historicoMensal: [{ mes: "2024-12", rentabilidade: 1.12 }, { mes: "2025-01", rentabilidade: 1.27 }, { mes: "2025-02", rentabilidade: 1.22 }, { mes: "2025-03", rentabilidade: 1.19 }, { mes: "2025-04", rentabilidade: 1.29 }, { mes: "2025-05", rentabilidade: 1.39 }, { mes: "2025-06", rentabilidade: 1.33 }, { mes: "2025-07", rentabilidade: 1.55 }, { mes: "2025-08", rentabilidade: 1.41 }, { mes: "2025-09", rentabilidade: 1.48 }, { mes: "2025-10", rentabilidade: 1.55 }, { mes: "2025-11", rentabilidade: 1.29 }, { mes: "2025-12", rentabilidade: 1.57 }, { mes: "2026-02", rentabilidade: 1.28 }, { mes: "2026-03", rentabilidade: 1.56 }, { mes: "2026-04", rentabilidade: 1.41 }, { mes: "2026-05", rentabilidade: 1.39 }, { mes: "2026-06", rentabilidade: 1.45 }, { mes: "2026-07", rentabilidade: 1.58 }] }
    ],
    descricao: "O Solar Puglia FIDC estrutura direitos creditórios de fomento mercantil, com classe sênior e subordinada. É o maior fundo da família Solar em patrimônio líquido.",
    estrategia: "Aquisição de direitos creditórios com critérios de elegibilidade e diversificação de cedentes, com estrutura de cotas segmentada por nível de subordinação.",
    tese: {
      originacao: "Duplicatas de fomento mercantil originadas de múltiplos cedentes, com prazo de até 180 dias e prazo médio de carteira de até 80 dias.",
      protecao: "Subordinada de ~45% do PL protege a Sênior1; critérios de elegibilidade limitam concentração por cedente e por sacado.",
      geracaoRetorno: "Retorno vem do desconto na aquisição das duplicatas frente ao valor de face, líquido de inadimplência — Sênior1 busca CDI + 4,00% a.a., a Subordinada captura o resíduo."
    },
    // Ver nota equivalente no Solar I FIDC sobre a distinção entre este campo
    // (informe CVM/FNET) e "Créditos em Atraso" (demonstrativo do
    // administrador, Carteira & Crédito) — são declarações separadas.
    inadimplenciaCvmPercentPL: 1.88,
    fonteInadimplenciaCvm: "Tomé / informe CVM-FNET, competência jul/2026",
    composicaoPortfolio: [],
    // Regulamento vigente em 03/08/2026, obtido diretamente da CVM — ver nota
    // _notaSingulareQI em manifest.json. Arquivo hospedado em documentos/.
    documentos: [
      { nome: "Regulamento", disponivel: true, url: "documentos/regulamento-solar-puglia-fidc.pdf" },
      { nome: "Lâmina de Informações Essenciais", disponivel: false },
      { nome: "Formulário de Ingresso", disponivel: false }
    ],
    fonteDados: "Relatório mensal oficial — Jul/2026",
    illustrative: false
  },
  {
    slug: "solar-vialoc-fidc",
    nome: "Solar Vialoc FIDC",
    cnpj: "39.680.495/0001-82",
    fraseEstrategia: "Em operação desde abril de 2021 — a estrutura com FIDC próprio mais madura e o maior histórico de rentabilidade da família Solar, com quatro camadas de subordinação.",
    classificacaoAnbima: "Crédito Estruturado",
    estrategiaResumo: "Proprietário · Grupo Supporte",
    classeCvm: "Fundo de Investimento em Direitos Creditórios (Padronizado)",
    // Público-alvo e condomínio confirmados por e-mail direto de Douglas
    // Borges (Solar Capital) em 28/08/2026: "Vialoc: Investidores
    // Profissionais, FECHADO". Sem série aberta para captação no momento
    // ("provavelmente lançada em setembro", segundo o cliente — não publicado
    // como fato, só a situação atual).
    publicoAlvo: "Investidor profissional",
    condominio: "Fechado",
    janelaResgate: "Sem série aberta no momento",
    // Administrador/custodiante corrigidos em 2026-08-28: confirmado via fonte
    // primária própria do Vialoc — "Instrumento Particular de Emissão de
    // Cotas" (5. Relatórios Fundos/39680495000182-ADA17062026V01-001223406.pdf)
    // qualifica expressamente "A QI CORRETORA DE TÍTULOS E VALORES MOBILIÁRIOS
    // S.A. ... inscrita no CNPJ sob o nº 62.285.390/0001-40" como
    // "Administradora" do fundo. Mesmo CNPJ que a Puglia (ver nota lá) e que a
    // API do Tomé associa ao nome "Singulare" — mesma pessoa jurídica ou
    // rebranding, não um erro. Sem evidência de cogestora para este fundo
    // especificamente (diferente de Puglia/Solar1).
    gestor: "Iggy Investimentos",
    administrador: "QI Corretora de Títulos e Valores Mobiliários S.A.",
    custodiante: "QI Corretora de Títulos e Valores Mobiliários S.A.",
    agenciaRating: "Austin Rating",
    dataInicio: "2021-04-14",
    status: "operacional",
    statusLabel: "Em funcionamento normal",
    dataBase: "Jul/2026",
    plAtual: "R$ 65,17 milhões",
    carteiraCredito: "R$ 64,56 milhões",
    creditosAtraso: "R$ 1,09 milhões",
    pdd: null,
    disponibilidade: "R$ 1,82 milhões",
    percentDcSobrePl: "99,08%",
    classePrincipal: "Sênior3",
    classes: [
      { nome: "Sênior3", percentPL: 51.06, rating: null, benchmark: "CDI + 4,5% a.a.", dataInicioCota: "2025-11-26", plReais: "R$ 33,28 milhões", mes: 1.62, ano: 10.92, tresMeses: 4.61, seisMeses: 9.24, dozeMeses: 12.87, desdeInicio: null, cdiMes: 133.5, cdiAno: 134.1, cdi3m: 133.8, cdi6m: 134.0, cdi12m: 134.3, cdiInicio: null, historicoMensal: [{ mes: "2025-11", rentabilidade: 0.15 }, { mes: "2025-12", rentabilidade: 1.61 }, { mes: "2026-02", rentabilidade: 1.32 }, { mes: "2026-03", rentabilidade: 1.6 }, { mes: "2026-04", rentabilidade: 1.44 }, { mes: "2026-05", rentabilidade: 1.43 }, { mes: "2026-06", rentabilidade: 1.49 }, { mes: "2026-07", rentabilidade: 1.62 }] },
      { nome: "Sênior2", percentPL: 5.71, rating: "brBBB+(sf)", benchmark: "CDI + 4,0% a.a.", dataInicioCota: "2023-09-08", plReais: "R$ 3,72 milhões", mes: 1.58, ano: 10.63, tresMeses: 4.49, seisMeses: 9.0, dozeMeses: 19.32, desdeInicio: 58.99, cdiMes: 130.1, cdiAno: 130.5, cdi3m: 130.3, cdi6m: 130.5, cdi12m: 131.3, cdiInicio: 140.5, historicoMensal: [{ mes: "2023-09", rentabilidade: 0.96 }, { mes: "2023-10", rentabilidade: 1.33 }, { mes: "2023-11", rentabilidade: 1.23 }, { mes: "2023-12", rentabilidade: 1.21 }, { mes: "2024-01", rentabilidade: 1.31 }, { mes: "2024-02", rentabilidade: 1.1 }, { mes: "2024-03", rentabilidade: 1.15 }, { mes: "2024-04", rentabilidade: 1.23 }, { mes: "2024-05", rentabilidade: 1.16 }, { mes: "2024-06", rentabilidade: 1.1 }, { mes: "2024-07", rentabilidade: 1.27 }, { mes: "2024-08", rentabilidade: 1.21 }, { mes: "2024-09", rentabilidade: 1.16 }, { mes: "2024-10", rentabilidade: 1.29 }, { mes: "2024-11", rentabilidade: 1.09 }, { mes: "2024-12", rentabilidade: 1.26 }, { mes: "2025-01", rentabilidade: 1.36 }, { mes: "2025-02", rentabilidade: 1.3 }, { mes: "2025-03", rentabilidade: 1.26 }, { mes: "2025-04", rentabilidade: 1.37 }, { mes: "2025-05", rentabilidade: 1.47 }, { mes: "2025-06", rentabilidade: 1.41 }, { mes: "2025-07", rentabilidade: 1.77 }, { mes: "2025-08", rentabilidade: 1.5 }, { mes: "2025-09", rentabilidade: 1.57 }, { mes: "2025-10", rentabilidade: 1.64 }, { mes: "2025-11", rentabilidade: 1.35 }, { mes: "2025-12", rentabilidade: 1.57 }, { mes: "2026-02", rentabilidade: 1.28 }, { mes: "2026-03", rentabilidade: 1.56 }, { mes: "2026-04", rentabilidade: 1.41 }, { mes: "2026-05", rentabilidade: 1.39 }, { mes: "2026-06", rentabilidade: 1.45 }, { mes: "2026-07", rentabilidade: 1.58 }] },
      { nome: "Mezanino", percentPL: 2.29, rating: "brBB(sf)", benchmark: "CDI + 5,5% a.a.", dataInicioCota: "2024-02-28", plReais: "R$ 1,49 milhões", mes: 1.71, ano: 11.5, tresMeses: 4.86, seisMeses: 9.75, dozeMeses: 20.99, desdeInicio: 53.34, cdiMes: 140.8, cdiAno: 141.2, cdi3m: 141.1, cdi6m: 141.4, cdi12m: 142.7, cdiInicio: 153.5, historicoMensal: [{ mes: "2024-02", rentabilidade: 0.06 }, { mes: "2024-03", rentabilidade: 1.26 }, { mes: "2024-04", rentabilidade: 1.36 }, { mes: "2024-05", rentabilidade: 1.22 }, { mes: "2024-06", rentabilidade: 1.22 }, { mes: "2024-07", rentabilidade: 1.4 }, { mes: "2024-08", rentabilidade: 1.34 }, { mes: "2024-09", rentabilidade: 1.29 }, { mes: "2024-10", rentabilidade: 1.42 }, { mes: "2024-11", rentabilidade: 1.2 }, { mes: "2024-12", rentabilidade: 1.38 }, { mes: "2025-01", rentabilidade: 1.48 }, { mes: "2025-02", rentabilidade: 1.42 }, { mes: "2025-03", rentabilidade: 1.37 }, { mes: "2025-04", rentabilidade: 1.49 }, { mes: "2025-05", rentabilidade: 1.59 }, { mes: "2025-06", rentabilidade: 1.53 }, { mes: "2025-07", rentabilidade: 1.77 }, { mes: "2025-08", rentabilidade: 1.62 }, { mes: "2025-09", rentabilidade: 1.69 }, { mes: "2025-10", rentabilidade: 1.77 }, { mes: "2025-11", rentabilidade: 1.46 }, { mes: "2025-12", rentabilidade: 8.47 }, { mes: "2026-02", rentabilidade: 1.38 }, { mes: "2026-03", rentabilidade: 1.55 }, { mes: "2026-04", rentabilidade: 1.44 }, { mes: "2026-05", rentabilidade: 1.59 }, { mes: "2026-06", rentabilidade: 1.49 }, { mes: "2026-07", rentabilidade: 1.71 }] },
      { nome: "Subordinada", percentPL: 40.93, rating: "brB+(sf)", benchmark: null, dataInicioCota: "2021-04-14", plReais: "R$ 26,68 milhões", mes: 1.74, ano: 17.24, tresMeses: 5.99, seisMeses: 14.18, dozeMeses: 29.45, desdeInicio: 229.4, cdiMes: 143.3, cdiAno: 211.7, cdi3m: 173.8, cdi6m: 205.6, cdi12m: 200.2, cdiInicio: 283.9, historicoMensal: [{ mes: "2021-05", rentabilidade: 1.4 }, { mes: "2021-06", rentabilidade: 1.98 }, { mes: "2021-07", rentabilidade: 1.84 }, { mes: "2021-08", rentabilidade: 7.07 }, { mes: "2021-09", rentabilidade: 1.41 }, { mes: "2021-10", rentabilidade: 1.81 }, { mes: "2021-11", rentabilidade: 1.15 }, { mes: "2021-12", rentabilidade: 1.46 }, { mes: "2022-01", rentabilidade: 1.41 }, { mes: "2022-03", rentabilidade: 1.7 }, { mes: "2022-04", rentabilidade: 1.24 }, { mes: "2022-05", rentabilidade: 2.19 }, { mes: "2022-06", rentabilidade: 2.1 }, { mes: "2022-07", rentabilidade: 1.95 }, { mes: "2022-08", rentabilidade: 2.33 }, { mes: "2022-09", rentabilidade: 2.19 }, { mes: "2022-10", rentabilidade: 2.08 }, { mes: "2022-11", rentabilidade: 2.08 }, { mes: "2022-12", rentabilidade: 2.07 }, { mes: "2023-01", rentabilidade: 2.24 }, { mes: "2023-02", rentabilidade: 1.82 }, { mes: "2023-03", rentabilidade: -0.08 }, { mes: "2023-04", rentabilidade: 1.09 }, { mes: "2023-05", rentabilidade: 1.46 }, { mes: "2023-06", rentabilidade: 1.32 }, { mes: "2023-07", rentabilidade: 1.37 }, { mes: "2023-08", rentabilidade: 1.26 }, { mes: "2023-09", rentabilidade: 1.07 }, { mes: "2023-10", rentabilidade: 1.16 }, { mes: "2023-11", rentabilidade: 1.32 }, { mes: "2023-12", rentabilidade: 1.53 }, { mes: "2024-01", rentabilidade: 1.9 }, { mes: "2024-02", rentabilidade: 1.56 }, { mes: "2024-03", rentabilidade: 1.42 }, { mes: "2024-04", rentabilidade: 1.87 }, { mes: "2024-05", rentabilidade: 2.26 }, { mes: "2024-06", rentabilidade: 1.54 }, { mes: "2024-07", rentabilidade: 1.9 }, { mes: "2024-08", rentabilidade: 1.48 }, { mes: "2024-09", rentabilidade: 1.52 }, { mes: "2024-10", rentabilidade: 2.28 }, { mes: "2024-11", rentabilidade: 2.14 }, { mes: "2024-12", rentabilidade: 2.89 }, { mes: "2025-01", rentabilidade: 2.39 }, { mes: "2025-02", rentabilidade: 1.92 }, { mes: "2025-03", rentabilidade: 2.33 }, { mes: "2025-04", rentabilidade: 2.66 }, { mes: "2025-05", rentabilidade: 2.24 }, { mes: "2025-06", rentabilidade: 2.18 }, { mes: "2025-07", rentabilidade: 2.89 }, { mes: "2025-08", rentabilidade: 2.02 }, { mes: "2025-09", rentabilidade: 2.07 }, { mes: "2025-10", rentabilidade: 1.65 }, { mes: "2025-11", rentabilidade: 1.73 }, { mes: "2025-12", rentabilidade: 2.55 }, { mes: "2026-02", rentabilidade: 2.43 }, { mes: "2026-03", rentabilidade: 2.43 }, { mes: "2026-04", rentabilidade: 2.64 }, { mes: "2026-05", rentabilidade: 1.75 }, { mes: "2026-06", rentabilidade: 2.39 }, { mes: "2026-07", rentabilidade: 1.74 }] }
    ],
    descricao: "O Solar Vialoc FIDC Padronizado estrutura direitos creditórios de fomento mercantil, com quatro classes de cota ativas desde 2021.",
    estrategia: "Aquisição de direitos creditórios com critérios de elegibilidade e diversificação de cedentes, com estrutura de cotas segmentada por nível de subordinação.",
    tese: {
      originacao: "Direitos creditórios de fomento mercantil, com histórico operacional desde abril de 2021 — a base de dados mais longa entre os fundos com FIDC próprio da família Solar.",
      protecao: "Quatro camadas de subordinação (Sênior3, Sênior2, Mezanino, Subordinada) dão à camada mais sênior proteção de cerca de 43% do PL.",
      geracaoRetorno: "Cada camada tem meta própria (de CDI + 4,0% a CDI + 5,5% a.a.); a Subordinada captura o retorno residual da carteira."
    },
    // Ver nota equivalente no Solar I FIDC sobre a distinção entre este campo
    // (informe CVM/FNET) e "Créditos em Atraso" (demonstrativo do
    // administrador, Carteira & Crédito) — são declarações separadas.
    inadimplenciaCvmPercentPL: 0.29,
    fonteInadimplenciaCvm: "Tomé / informe CVM-FNET, competência jul/2026",
    composicaoPortfolio: [],
    documentos: [
      { nome: "Regulamento", disponivel: false },
      { nome: "Lâmina de Informações Essenciais", disponivel: false },
      { nome: "Formulário de Ingresso", disponivel: false }
    ],
    fonteDados: "Relatório mensal oficial — Jul/2026",
    illustrative: false
  },
  {
    slug: "solar-belmonte-fidc",
    nome: "Solar Belmonte FIDC",
    cnpj: "58.347.004/0001-20",
    fraseEstrategia: "O fundo com FIDC próprio mais recente da família Solar, em operação desde fevereiro de 2025, com estrutura sênior/mezanino/subordinada ainda em consolidação.",
    classificacaoAnbima: "Crédito Estruturado",
    estrategiaResumo: "Proprietário",
    classeCvm: "Fundo de Investimento em Direitos Creditórios (Padronizado)",
    // Público-alvo confirmado por e-mail direto de Douglas Borges (Solar
    // Capital) em 28/08/2026: "Belmonte: Investidores Profissionais,
    // FECHADO" — bate com o condomínio já confirmado pelo próprio Regulamento.
    publicoAlvo: "Investidor profissional",
    janelaResgate: "Sem série aberta no momento",
    // TROCA DE PRESTADORES em 2026-08-28: confirmada pelo Regulamento do fundo
    // "vigente em 20 de agosto de 2026" (fonte primária, 79 páginas, papel
    // timbrado Hemera — 5. Relatórios Fundos/58347004000120-REG24082026V01-
    // 001299209.pdf), que define GESTORA = ANTHARUS GESTORA DE RECURSOS LTDA.
    // (CNPJ 55.080.408/0001-02) e ADMINISTRADORA = Hemera DTVM. Isso bate
    // exatamente com o e-mail do cliente (28/08/2026): "Belmonte a partir de
    // 20/08/26: Administrador/Custodiante = Hemera; Gestor = Antharus".
    // ANTES de 20/08/2026 o fundo era administrado pela QI Corretora (rótulo
    // "Singulare" no demonstrativo, mesma entidade — ver nota na Puglia) com
    // gestão da Iggy/Iguana Investimentos — é sob ESSE regime anterior que
    // todos os dados financeiros deste objeto (PL, rentabilidade, classes,
    // etc., competência jul/2026) foram apurados. Não apagar/reatribuir esse
    // histórico ao novo prestador. Condomínio confirmado no mesmo regulamento:
    // "natureza especial fechado, com prazo de duração indeterminado".
    gestor: "Antharus Gestora de Recursos Ltda.",
    administrador: "Hemera Distribuidora de Títulos e Valores Mobiliários S.A.",
    custodiante: "Hemera Distribuidora de Títulos e Valores Mobiliários S.A.",
    prestadorAnterior: {
      vigenciaAte: "2026-08-19",
      gestor: "Iggy Investimentos",
      administrador: "QI Corretora de Títulos e Valores Mobiliários S.A. (rótulo \"Singulare\" nos demonstrativos)",
      nota: "Os dados financeiros abaixo (PL, rentabilidade, classes) são da competência Jul/2026, apurados sob este prestador anterior."
    },
    condominio: "Fechado",
    agenciaRating: "Austin Rating",
    dataInicio: "2025-02-21",
    status: "operacional",
    statusLabel: "Em funcionamento normal",
    dataBase: "Jul/2026",
    plAtual: "R$ 24,92 milhões",
    carteiraCredito: "R$ 19,84 milhões",
    creditosAtraso: null,
    pdd: null,
    disponibilidade: "R$ 4,76 milhões",
    percentDcSobrePl: "79,63%",
    classePrincipal: "Sênior",
    classes: [
      { nome: "Subordinada", percentPL: 59.54, rating: "N/A", benchmark: null, dataInicioCota: "2025-02-21", plReais: "R$ 14,84 milhões", mes: 1.33, ano: 13.75, tresMeses: 3.69, seisMeses: 7.72, dozeMeses: 36.0, desdeInicio: 52.33, cdiMes: 109.1, cdiAno: 168.8, cdi3m: 106.9, cdi6m: 112.0, cdi12m: 244.5, cdiInicio: 243.4, historicoMensal: [{ mes: "2025-02", rentabilidade: 0.28 }, { mes: "2025-03", rentabilidade: 1.68 }, { mes: "2025-04", rentabilidade: 1.79 }, { mes: "2025-05", rentabilidade: 1.07 }, { mes: "2025-06", rentabilidade: 2.6 }, { mes: "2025-07", rentabilidade: 4.1 }, { mes: "2025-08", rentabilidade: 4.22 }, { mes: "2025-09", rentabilidade: 2.89 }, { mes: "2025-10", rentabilidade: 5.89 }, { mes: "2025-11", rentabilidade: 1.36 }, { mes: "2025-12", rentabilidade: 3.86 }, { mes: "2026-03", rentabilidade: 1.41 }, { mes: "2026-04", rentabilidade: 1.36 }, { mes: "2026-05", rentabilidade: 1.11 }, { mes: "2026-06", rentabilidade: 1.2 }, { mes: "2026-07", rentabilidade: 1.33 }] },
      { nome: "Sênior", percentPL: 40.46, rating: "N/A", benchmark: "CDI + 4,25% a.a.", dataInicioCota: "2025-06-09", plReais: "R$ 10,08 milhões", mes: 1.6, ano: 10.77, tresMeses: 4.55, seisMeses: 9.1, dozeMeses: 19.6, desdeInicio: 22.7, cdiMes: 131.7, cdiAno: 132.2, cdi3m: 131.9, cdi6m: 132.1, cdi12m: 133.2, cdiInicio: 133.0, historicoMensal: [{ mes: "2025-06", rentabilidade: 1.0 }, { mes: "2025-07", rentabilidade: 1.66 }, { mes: "2025-08", rentabilidade: 1.52 }, { mes: "2025-09", rentabilidade: 1.59 }, { mes: "2025-10", rentabilidade: 1.66 }, { mes: "2025-11", rentabilidade: 1.37 }, { mes: "2025-12", rentabilidade: 1.59 }, { mes: "2026-03", rentabilidade: 1.58 }, { mes: "2026-04", rentabilidade: 1.43 }, { mes: "2026-05", rentabilidade: 1.41 }, { mes: "2026-06", rentabilidade: 1.47 }, { mes: "2026-07", rentabilidade: 1.6 }] },
      { nome: "Mezanino", percentPL: 0.0, rating: "N/A", benchmark: "CDI + 6,00% a.a.", dataInicioCota: "2025-06-09", plReais: "R$ 0", mes: 1.06, ano: 11.07, tresMeses: 4.28, seisMeses: 9.26, dozeMeses: 20.8, desdeInicio: 24.28, cdiMes: 87.6, cdiAno: 136.0, cdi3m: 124.1, cdi6m: 134.3, cdi12m: 141.2, cdiInicio: 142.2, historicoMensal: [{ mes: "2025-06", rentabilidade: 1.08 }, { mes: "2025-07", rentabilidade: 1.82 }, { mes: "2025-08", rentabilidade: 1.66 }, { mes: "2025-09", rentabilidade: 1.74 }, { mes: "2025-10", rentabilidade: 1.82 }, { mes: "2025-11", rentabilidade: 1.5 }, { mes: "2025-12", rentabilidade: 1.74 }, { mes: "2026-03", rentabilidade: 1.73 }, { mes: "2026-04", rentabilidade: 1.56 }, { mes: "2026-05", rentabilidade: 1.54 }, { mes: "2026-06", rentabilidade: 1.61 }, { mes: "2026-07", rentabilidade: 1.06 }] }
    ],
    descricao: "O Solar Belmonte FIDC estrutura direitos creditórios de fomento mercantil, com classes sênior, mezanino e subordinada, em operação desde fevereiro de 2025. Desde 20/08/2026, o fundo é administrado pela Hemera DTVM e gerido pela Antharus Gestora de Recursos — os números de rentabilidade e patrimônio abaixo (competência Jul/2026) referem-se ao período anterior a essa transição.",
    estrategia: "Aquisição de direitos creditórios com critérios de elegibilidade e diversificação de cedentes, com estrutura de cotas segmentada por nível de subordinação.",
    tese: {
      originacao: "Direitos creditórios de fomento mercantil — fundo proprietário (não-feeder) em operação desde fevereiro de 2025, o mais novo com FIDC próprio da família Solar.",
      protecao: "Subordinação de cerca de 60% do PL (Subordinada + Mezanino) protege a classe Sênior — carteira ainda em fase de originação e diversificação.",
      geracaoRetorno: "Sênior busca CDI + 4,25% a.a. e Mezanino CDI + 6,00% a.a.; a Subordinada captura o retorno residual da carteira de recebíveis."
    },
    // Ver nota equivalente no Solar I FIDC sobre a distinção entre este campo
    // (informe CVM/FNET) e "Créditos em Atraso" (demonstrativo do
    // administrador, Carteira & Crédito) — são declarações separadas.
    inadimplenciaCvmPercentPL: 0.0,
    fonteInadimplenciaCvm: "Tomé / informe CVM-FNET, competência jul/2026",
    composicaoPortfolio: [],
    // Regulamento vigente em 20/08/2026 (já sob a Hemera/Antharus), obtido
    // diretamente da CVM — ver nota _notaBelmonteTransicaoPrestadores em
    // manifest.json. Arquivo hospedado em documentos/.
    documentos: [
      { nome: "Regulamento", disponivel: true, url: "documentos/regulamento-solar-belmonte-fidc.pdf" },
      { nome: "Lâmina de Informações Essenciais", disponivel: false },
      { nome: "Formulário de Ingresso", disponivel: false }
    ],
    fonteDados: "Relatório mensal oficial — Jul/2026",
    illustrative: false
  }
];
