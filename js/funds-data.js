/*
 * Fonte única de dados dos fundos.
 * GERADO AUTOMATICAMENTE por dados-fundos/parse_relatorios.py — não edite à mão.
 * Para atualizar: coloque os PDFs do mês em dados-fundos/relatorios/<AAAA-MM>/
 * e rode `python dados-fundos/parse_relatorios.py <AAAA-MM>`.
 * Dados estáveis (nome, descrição, rating, benchmark) vêm de dados-fundos/manifest.json.
 */
var SOLAR_CAPITAL_FUNDS = [
  {
    slug: "solar-fidc-multissetorial",
    nome: "Solar FIDC Multissetorial",
    cnpj: "29.970.251/0001-80",
    classificacaoAnbima: "Crédito Estruturado",
    classeCvm: "Fundo de Investimento em Direitos Creditórios",
    publicoAlvo: "Investidor profissional",
    gestor: "Iggy Investimentos (cogestão: Fram Capital)",
    administrador: "Singulare",
    custodiante: "Singulare",
    agenciaRating: "Austin Rating",
    consultora: "Solar Capital",
    condominio: "Fechado",
    dataInicio: "2018-10-25",
    status: "operacional",
    statusLabel: "Em funcionamento normal",
    dataBase: "Jul/2026",
    plAtual: "R$ 100,55 milhões",
    carteiraCredito: "R$ 75,47 milhões",
    creditosAtraso: "R$ 2,43 milhões",
    pdd: "R$ 2,09 milhões",
    disponibilidade: "R$ 28,41 milhões",
    percentDcSobrePl: "75,06%",
    classePrincipal: "Sênior",
    janelaResgate: "Sem série Sênior aberta a novos aportes no momento (prevista para set/2026, segundo o cliente em 28/08)",
    inadimplenciaCvmPercentPL: 2.41,
    classes: [
      { nome: "Sênior", percentPL: null, rating: null, benchmark: null, dataInicioCota: null, plReais: null, mes: null, ano: null, tresMeses: null, seisMeses: null, dozeMeses: null, desdeInicio: null, cdiMes: null, cdiAno: null, cdi3m: null, cdi6m: null, cdi12m: null, cdiInicio: null },
      { nome: "Mezanino", percentPL: 0.0, rating: null, benchmark: null, dataInicioCota: "2023-07-03", plReais: "R$ 0", mes: 9.89, ano: 3.33, tresMeses: 8.15, seisMeses: 19.25, dozeMeses: 68.9, desdeInicio: null, cdiMes: 121.5, cdiAno: 96.6, cdi3m: 118.1, cdi6m: 130.9, cdi12m: 151.7, cdiInicio: null },
      { nome: "Subordinada", percentPL: 40.12, rating: null, benchmark: null, dataInicioCota: "2018-10-25", plReais: "R$ 40,34 milhões", mes: 1.47, ano: 11.41, tresMeses: 3.36, seisMeses: 6.28, dozeMeses: 10.35, desdeInicio: 246.71, cdiMes: 120.7, cdiAno: 140.1, cdi3m: 97.6, cdi6m: 91.0, cdi12m: 70.3, cdiInicio: 246.3 }
    ],
    descricao: "O Solar FIDC Multissetorial estrutura direitos creditórios diversificados — incluindo cotas de outros FIDCs, créditos vencidos e renda fixa — sob supervisão da CVM, com histórico de operação desde 2018.",
    estrategia: "Aquisição e gestão de uma carteira multissetorial de direitos creditórios, cotas de FIDC e renda fixa, com estrutura de cotas segmentada por nível de subordinação.",
    composicaoPortfolio: [
      { categoria: "Carteira de direitos creditórios", percent: 97.0 },
      { categoria: "Cotas de outros FIDCs", percent: 7.1 },
      { categoria: "Títulos públicos federais", percent: 0.3 },
      { categoria: "Disponibilidades", percent: 0.0 }
    ],
    documentos: [
      { nome: "Regulamento", disponivel: true, url: "documentos/regulamento-solar-fidc-multissetorial.pdf" },
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
    classificacaoAnbima: "Crédito Estruturado",
    classeCvm: "Fundo de Investimento em Direitos Creditórios (Resolução CVM 175)",
    publicoAlvo: "Investidor qualificado",
    gestor: "Iggy Investimentos (cogestão: Fram Capital)",
    administrador: "Singulare",
    custodiante: "Singulare",
    agenciaRating: "Austin Rating",
    condominio: "Aberto",
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
    janelaResgate: "D+60 (classe Sênior1, única aberta a novos aportes hoje)",
    inadimplenciaCvmPercentPL: 1.88,
    classes: [
      { nome: "Subordinada", percentPL: 44.76, rating: "N/A", benchmark: null, dataInicioCota: "2023-12-20", plReais: "R$ 139,27 milhões", mes: 3.53, ano: 45.44, tresMeses: 13.66, seisMeses: 37.03, dozeMeses: 88.0, desdeInicio: 321.13, cdiMes: 290.2, cdiAno: 558.1, cdi3m: 396.3, cdi6m: 536.8, cdi12m: 598.1, cdiInicio: 857.8 },
      { nome: "Sênior1", percentPL: 55.24, rating: "N/A", benchmark: "CDI + 4,00% a.a.", dataInicioCota: "2024-12-02", plReais: "R$ 171,89 milhões", mes: 1.58, ano: 10.61, tresMeses: 4.48, seisMeses: 8.98, dozeMeses: 18.9, desdeInicio: 31.83, cdiMes: 129.9, cdiAno: 130.3, cdi3m: 130.1, cdi6m: 130.2, cdi12m: 128.7, cdiInicio: 128.7 }
    ],
    descricao: "O Solar Puglia FIDC estrutura direitos creditórios de fomento mercantil, com classe sênior e subordinada. É o maior fundo da família Solar em patrimônio líquido.",
    estrategia: "Aquisição de direitos creditórios com critérios de elegibilidade e diversificação de cedentes, com estrutura de cotas segmentada por nível de subordinação.",
    composicaoPortfolio: [
      { categoria: "Carteira de direitos creditórios", percent: 99.6 },
      { categoria: "Títulos públicos federais", percent: 0.0 },
      { categoria: "Disponibilidades", percent: 0.0 }
    ],
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
    classificacaoAnbima: "Crédito Estruturado",
    classeCvm: "Fundo de Investimento em Direitos Creditórios (Padronizado)",
    publicoAlvo: "Investidor profissional",
    gestor: "Iggy Investimentos",
    administrador: "Singulare",
    custodiante: "Singulare",
    agenciaRating: "Austin Rating",
    condominio: "Fechado",
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
    janelaResgate: "Sem série aberta a novos aportes no momento (nova série prevista para set/2026, segundo o cliente em 28/08)",
    inadimplenciaCvmPercentPL: 1.68,
    classes: [
      { nome: "Sênior3", percentPL: 51.06, rating: null, benchmark: "CDI + 4,5% a.a.", dataInicioCota: "2025-11-26", plReais: "R$ 33,28 milhões", mes: 1.62, ano: 10.92, tresMeses: 4.61, seisMeses: 9.24, dozeMeses: 12.87, desdeInicio: null, cdiMes: 133.5, cdiAno: 134.1, cdi3m: 133.8, cdi6m: 134.0, cdi12m: 134.3, cdiInicio: null },
      { nome: "Sênior2", percentPL: 5.71, rating: "brBBB+(sf)", benchmark: "CDI + 4,0% a.a.", dataInicioCota: "2023-09-08", plReais: "R$ 3,72 milhões", mes: 1.58, ano: 10.63, tresMeses: 4.49, seisMeses: 9.0, dozeMeses: 19.32, desdeInicio: 58.99, cdiMes: 130.1, cdiAno: 130.5, cdi3m: 130.3, cdi6m: 130.5, cdi12m: 131.3, cdiInicio: 140.5 },
      { nome: "Mezanino", percentPL: 2.29, rating: "brBB(sf)", benchmark: "CDI + 5,5% a.a.", dataInicioCota: "2024-02-28", plReais: "R$ 1,49 milhões", mes: 1.71, ano: 11.5, tresMeses: 4.86, seisMeses: 9.75, dozeMeses: 20.99, desdeInicio: 53.34, cdiMes: 140.8, cdiAno: 141.2, cdi3m: 141.1, cdi6m: 141.4, cdi12m: 142.7, cdiInicio: 153.5 },
      { nome: "Subordinada", percentPL: 40.93, rating: "brB+(sf)", benchmark: null, dataInicioCota: "2021-04-14", plReais: "R$ 26,68 milhões", mes: 1.74, ano: 17.24, tresMeses: 5.99, seisMeses: 14.18, dozeMeses: 29.45, desdeInicio: 229.4, cdiMes: 143.3, cdiAno: 211.7, cdi3m: 173.8, cdi6m: 205.6, cdi12m: 200.2, cdiInicio: 283.9 }
    ],
    descricao: "O Solar Vialoc FIDC Padronizado estrutura direitos creditórios de fomento mercantil, com quatro classes de cota ativas desde 2021.",
    estrategia: "Aquisição de direitos creditórios com critérios de elegibilidade e diversificação de cedentes, com estrutura de cotas segmentada por nível de subordinação.",
    composicaoPortfolio: [
      { categoria: "Carteira de direitos creditórios", percent: 99.9 },
      { categoria: "Títulos públicos federais", percent: 0.1 },
      { categoria: "Disponibilidades", percent: 0.0 }
    ],
    documentos: [
      { nome: "Regulamento", disponivel: true, url: "documentos/regulamento-solar-vialoc-fidc.pdf" },
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
    classificacaoAnbima: "Crédito Estruturado",
    classeCvm: "Fundo de Investimento em Direitos Creditórios (Padronizado)",
    publicoAlvo: "Investidor profissional",
    gestor: "Iggy Investimentos",
    administrador: "Singulare",
    custodiante: "Singulare",
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
    janelaResgate: "Sem série aberta a novos aportes no momento",
    inadimplenciaCvmPercentPL: null,
    classes: [
      { nome: "Subordinada", percentPL: 59.54, rating: "N/A", benchmark: null, dataInicioCota: "2025-02-21", plReais: "R$ 14,84 milhões", mes: 1.33, ano: 13.75, tresMeses: 3.69, seisMeses: 7.72, dozeMeses: 36.0, desdeInicio: 52.33, cdiMes: 109.1, cdiAno: 168.8, cdi3m: 106.9, cdi6m: 112.0, cdi12m: 244.5, cdiInicio: 243.4 },
      { nome: "Sênior", percentPL: 40.46, rating: "N/A", benchmark: "CDI + 4,25% a.a.", dataInicioCota: "2025-06-09", plReais: "R$ 10,08 milhões", mes: 1.6, ano: 10.77, tresMeses: 4.55, seisMeses: 9.1, dozeMeses: 19.6, desdeInicio: 22.7, cdiMes: 131.7, cdiAno: 132.2, cdi3m: 131.9, cdi6m: 132.1, cdi12m: 133.2, cdiInicio: 133.0 },
      { nome: "Mezanino", percentPL: 0.0, rating: "N/A", benchmark: "CDI + 6,00% a.a.", dataInicioCota: "2025-06-09", plReais: "R$ 0", mes: 1.06, ano: 11.07, tresMeses: 4.28, seisMeses: 9.26, dozeMeses: 20.8, desdeInicio: 24.28, cdiMes: 87.6, cdiAno: 136.0, cdi3m: 124.1, cdi6m: 134.3, cdi12m: 141.2, cdiInicio: 142.2 }
    ],
    descricao: "O Solar Belmonte FIDC estrutura direitos creditórios de fomento mercantil, com classes sênior, mezanino e subordinada, em operação desde fevereiro de 2025.",
    estrategia: "Aquisição de direitos creditórios com critérios de elegibilidade e diversificação de cedentes, com estrutura de cotas segmentada por nível de subordinação.",
    composicaoPortfolio: [
      { categoria: "Carteira de direitos creditórios", percent: 92.1 },
      { categoria: "Cotas de outros FIDCs", percent: 11.2 },
      { categoria: "Disponibilidades", percent: 0.0 }
    ],
    documentos: [
      { nome: "Regulamento", disponivel: true, url: "documentos/regulamento-solar-belmonte-fidc.pdf" },
      { nome: "Lâmina de Informações Essenciais", disponivel: false },
      { nome: "Formulário de Ingresso", disponivel: false }
    ],
    fonteDados: "Relatório mensal oficial — Jul/2026",
    illustrative: false
  }
];
