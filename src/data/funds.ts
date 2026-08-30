/**
 * Fonte de dados dos fundos Solar Capital.
 * GERADO AUTOMATICAMENTE a partir de 4. Site/js/funds-data.js por
 * scripts/convert-funds.cjs — não edite este arquivo à mão. Dados reais
 * dos demonstrativos mensais oficiais e do informe mensal CVM de cada
 * fundo (data-base: julho de 2026), incluindo histórico mensal completo
 * de todas as classes, composição de carteira e aging.
 * Para atualizar: rode `node scripts/convert-funds.cjs` depois de
 * atualizar 4. Site/js/funds-data.js.
 */

export interface MonthlyPoint {
  month: string
  value: number | null
}

export interface ClassPeriods {
  month: number | null
  year: number | null
  threeMonths: number | null
  sixMonths: number | null
  twelveMonths: number | null
  sinceInception: number | null
  cdiMonth: number | null
  cdiYear: number | null
  cdiThreeMonths: number | null
  cdiSixMonths: number | null
  cdiTwelveMonths: number | null
  cdiSinceInception: number | null
}

export interface FundClass {
  name: string
  participation: string | null
  targetReturn: string
  rating: string | null
  periods: ClassPeriods
  history: MonthlyPoint[]
}

export interface PeriodReturns {
  month: number | null
  year: number | null
  twelveMonths: number | null
  sinceInception: number | null
}

export interface PortfolioCategory {
  name: string
  value: number
  color: string
}

export interface CreditIndicator {
  label: string
  value: string
}

export interface AgingBucket {
  label: string
  value: number
}

export interface FundDocument {
  name: string
  date?: string
  url?: string | null
}

export interface Fund {
  slug: string
  name: string
  cnpj: string
  startDate: string
  dataBase: string
  tagline: string
  strategyLabel: string
  description: string
  strategyDetail: string
  aum: string
  aumShort: string
  targetReturn: string
  returns: PeriodReturns
  subordination: string | null
  defaultRate: string | null
  publicTarget: string
  condominium: string
  administrator: string
  custodian: string
  manager: string
  coManager?: string | null
  classes: FundClass[]
  tesis: { title: string; body: string }[]
  portfolio: {
    categories: PortfolioCategory[]
    indicators: CreditIndicator[]
    aging: AgingBucket[]
  } | null
  documents: FundDocument[]
}

export const funds: Fund[] = [
  {
    "slug": "solar-fidc-multissetorial",
    "name": "Solar FIDC Multissetorial",
    "cnpj": "29.970.251/0001-80",
    "startDate": "25 de outubro de 2018",
    "dataBase": "julho de 2026",
    "tagline": "Direitos creditórios multissetoriais, com originação pulverizada desde 2018.",
    "strategyLabel": "Multissetorial · CDI+",
    "description": "O Solar FIDC Multissetorial estrutura direitos creditórios diversificados — incluindo cotas de outros FIDCs, créditos vencidos e renda fixa — sob supervisão da CVM, com histórico de operação desde 2018.",
    "strategyDetail": "Aquisição e gestão de uma carteira multissetorial de direitos creditórios, cotas de FIDC e renda fixa, com estrutura de cotas segmentada por nível de subordinação.",
    "aum": "R$ 100,55 milhões",
    "aumShort": "R$ 100,5 mi",
    "targetReturn": "CDI + 4,00% a.a.",
    "returns": {
      "month": 1.58,
      "year": 10.61,
      "twelveMonths": 19.3,
      "sinceInception": 32.55
    },
    "subordination": "40,12%",
    "defaultRate": "2,41%",
    "publicTarget": "Investidores Profissionais",
    "condominium": "Fechado",
    "administrator": "Singulare",
    "custodian": "Singulare",
    "manager": "Iggy Investimentos",
    "coManager": "Fram Capital",
    "classes": [
      {
        "name": "Sênior6",
        "participation": "49,85%",
        "targetReturn": "CDI + 4,00% a.a.",
        "rating": "brA(sf)",
        "periods": {
          "month": 1.58,
          "year": 10.61,
          "threeMonths": 4.48,
          "sixMonths": 8.98,
          "twelveMonths": 19.3,
          "sinceInception": 32.55,
          "cdiMonth": 129.9,
          "cdiYear": 130.4,
          "cdiThreeMonths": 130.1,
          "cdiSixMonths": 130.2,
          "cdiTwelveMonths": 131.2,
          "cdiSinceInception": 133.6
        },
        "history": [
          {
            "month": "2024-12",
            "value": 0.79
          },
          {
            "month": "2025-01",
            "value": 1.36
          },
          {
            "month": "2025-02",
            "value": 1.3
          },
          {
            "month": "2025-03",
            "value": 1.26
          },
          {
            "month": "2025-04",
            "value": 1.37
          },
          {
            "month": "2025-05",
            "value": 1.47
          },
          {
            "month": "2025-06",
            "value": 1.41
          },
          {
            "month": "2025-07",
            "value": 1.64
          },
          {
            "month": "2025-08",
            "value": 1.5
          },
          {
            "month": "2025-09",
            "value": 1.57
          },
          {
            "month": "2025-10",
            "value": 1.64
          },
          {
            "month": "2025-11",
            "value": 1.35
          },
          {
            "month": "2025-12",
            "value": 1.57
          },
          {
            "month": "2026-02",
            "value": 1.28
          },
          {
            "month": "2026-03",
            "value": 1.56
          },
          {
            "month": "2026-04",
            "value": 1.41
          },
          {
            "month": "2026-05",
            "value": 1.39
          },
          {
            "month": "2026-06",
            "value": 1.45
          },
          {
            "month": "2026-07",
            "value": 1.58
          }
        ]
      },
      {
        "name": "Sênior5",
        "participation": "10,03%",
        "targetReturn": "CDI + 4,00% a.a.",
        "rating": "brA(sf)",
        "periods": {
          "month": 1.58,
          "year": 10.61,
          "threeMonths": 4.48,
          "sixMonths": 8.98,
          "twelveMonths": 19.3,
          "sinceInception": 54.91,
          "cdiMonth": 129.9,
          "cdiYear": 130.4,
          "cdiThreeMonths": 130.1,
          "cdiSixMonths": 130.2,
          "cdiTwelveMonths": 131.2,
          "cdiSinceInception": 139.9
        },
        "history": [
          {
            "month": "2023-11",
            "value": 0.92
          },
          {
            "month": "2023-12",
            "value": 1.21
          },
          {
            "month": "2024-01",
            "value": 1.31
          },
          {
            "month": "2024-02",
            "value": 1.1
          },
          {
            "month": "2024-03",
            "value": 1.15
          },
          {
            "month": "2024-04",
            "value": 1.23
          },
          {
            "month": "2024-05",
            "value": 1.16
          },
          {
            "month": "2024-06",
            "value": 1.1
          },
          {
            "month": "2024-07",
            "value": 1.27
          },
          {
            "month": "2024-08",
            "value": 1.21
          },
          {
            "month": "2024-09",
            "value": 1.16
          },
          {
            "month": "2024-10",
            "value": 1.29
          },
          {
            "month": "2024-11",
            "value": 1.09
          },
          {
            "month": "2024-12",
            "value": 1.26
          },
          {
            "month": "2025-01",
            "value": 1.36
          },
          {
            "month": "2025-02",
            "value": 1.3
          },
          {
            "month": "2025-03",
            "value": 1.26
          },
          {
            "month": "2025-04",
            "value": 1.37
          },
          {
            "month": "2025-05",
            "value": 1.47
          },
          {
            "month": "2025-06",
            "value": 1.41
          },
          {
            "month": "2025-07",
            "value": 1.64
          },
          {
            "month": "2025-08",
            "value": 1.5
          },
          {
            "month": "2025-09",
            "value": 1.57
          },
          {
            "month": "2025-10",
            "value": 1.64
          },
          {
            "month": "2025-11",
            "value": 1.35
          },
          {
            "month": "2025-12",
            "value": 1.57
          },
          {
            "month": "2026-02",
            "value": 1.28
          },
          {
            "month": "2026-03",
            "value": 1.56
          },
          {
            "month": "2026-04",
            "value": 1.41
          },
          {
            "month": "2026-05",
            "value": 1.39
          },
          {
            "month": "2026-06",
            "value": 1.45
          },
          {
            "month": "2026-07",
            "value": 1.58
          }
        ]
      },
      {
        "name": "Mezanino",
        "participation": "0,00%",
        "targetReturn": "CDI + 5,50% a.a.",
        "rating": "brBBB-(sf)",
        "periods": {
          "month": null,
          "year": 9.89,
          "threeMonths": 3.33,
          "sixMonths": 8.15,
          "twelveMonths": 19.25,
          "sinceInception": 68.9,
          "cdiMonth": null,
          "cdiYear": 121.5,
          "cdiThreeMonths": 96.6,
          "cdiSixMonths": 118.1,
          "cdiTwelveMonths": 130.9,
          "cdiSinceInception": 151.7
        },
        "history": [
          {
            "month": "2023-07",
            "value": 1.52
          },
          {
            "month": "2023-08",
            "value": 1.63
          },
          {
            "month": "2023-09",
            "value": 1.4
          },
          {
            "month": "2023-10",
            "value": 1.45
          },
          {
            "month": "2023-11",
            "value": 1.35
          },
          {
            "month": "2023-12",
            "value": 1.33
          },
          {
            "month": "2024-01",
            "value": 1.44
          },
          {
            "month": "2024-02",
            "value": 1.21
          },
          {
            "month": "2024-03",
            "value": 1.3
          },
          {
            "month": "2024-04",
            "value": 1.36
          },
          {
            "month": "2024-05",
            "value": 1.28
          },
          {
            "month": "2024-06",
            "value": 1.22
          },
          {
            "month": "2024-07",
            "value": 1.4
          },
          {
            "month": "2024-08",
            "value": 1.34
          },
          {
            "month": "2024-09",
            "value": 1.29
          },
          {
            "month": "2024-10",
            "value": 1.42
          },
          {
            "month": "2024-11",
            "value": 1.2
          },
          {
            "month": "2024-12",
            "value": 1.38
          },
          {
            "month": "2025-01",
            "value": 1.48
          },
          {
            "month": "2025-02",
            "value": 1.42
          },
          {
            "month": "2025-03",
            "value": 1.37
          },
          {
            "month": "2025-04",
            "value": 1.49
          },
          {
            "month": "2025-05",
            "value": 1.59
          },
          {
            "month": "2025-06",
            "value": 1.53
          },
          {
            "month": "2025-07",
            "value": 1.77
          },
          {
            "month": "2025-08",
            "value": 1.62
          },
          {
            "month": "2025-09",
            "value": 1.69
          },
          {
            "month": "2025-10",
            "value": 1.77
          },
          {
            "month": "2025-11",
            "value": 1.46
          },
          {
            "month": "2025-12",
            "value": 1.69
          },
          {
            "month": "2026-02",
            "value": 1.38
          },
          {
            "month": "2026-03",
            "value": 1.69
          },
          {
            "month": "2026-04",
            "value": 1.52
          },
          {
            "month": "2026-05",
            "value": 1.5
          },
          {
            "month": "2026-06",
            "value": 1.57
          }
        ]
      },
      {
        "name": "Subordinada",
        "participation": "40,12%",
        "targetReturn": "Residual (sem meta fixa)",
        "rating": "brB+(sf)",
        "periods": {
          "month": 1.47,
          "year": 11.41,
          "threeMonths": 3.36,
          "sixMonths": 6.28,
          "twelveMonths": 10.35,
          "sinceInception": 246.71,
          "cdiMonth": 120.7,
          "cdiYear": 140.1,
          "cdiThreeMonths": 97.6,
          "cdiSixMonths": 91,
          "cdiTwelveMonths": 70.3,
          "cdiSinceInception": 246.3
        },
        "history": [
          {
            "month": "2020-08",
            "value": 0.38
          },
          {
            "month": "2020-09",
            "value": 2.86
          },
          {
            "month": "2020-10",
            "value": 3.35
          },
          {
            "month": "2020-11",
            "value": 1.42
          },
          {
            "month": "2020-12",
            "value": 1.1
          },
          {
            "month": "2021-01",
            "value": 1.99
          },
          {
            "month": "2021-02",
            "value": 1.46
          },
          {
            "month": "2021-03",
            "value": 2.49
          },
          {
            "month": "2021-04",
            "value": 2.17
          },
          {
            "month": "2021-05",
            "value": 2.5
          },
          {
            "month": "2021-06",
            "value": 2.25
          },
          {
            "month": "2021-07",
            "value": 2.56
          },
          {
            "month": "2021-08",
            "value": 2.43
          },
          {
            "month": "2021-09",
            "value": 2.31
          },
          {
            "month": "2021-10",
            "value": 2.11
          },
          {
            "month": "2021-11",
            "value": 2.48
          },
          {
            "month": "2021-12",
            "value": 1.45
          },
          {
            "month": "2022-01",
            "value": 1.87
          },
          {
            "month": "2022-03",
            "value": 2.63
          },
          {
            "month": "2022-04",
            "value": 2.69
          },
          {
            "month": "2022-05",
            "value": 1.86
          },
          {
            "month": "2022-06",
            "value": 1.83
          },
          {
            "month": "2022-07",
            "value": 1.55
          },
          {
            "month": "2022-08",
            "value": 2.94
          },
          {
            "month": "2022-09",
            "value": 1.62
          },
          {
            "month": "2022-10",
            "value": 2.41
          },
          {
            "month": "2022-11",
            "value": 0.76
          },
          {
            "month": "2022-12",
            "value": 0.08
          },
          {
            "month": "2023-01",
            "value": -1.15
          },
          {
            "month": "2023-02",
            "value": -3.45
          },
          {
            "month": "2023-03",
            "value": 1.31
          },
          {
            "month": "2023-04",
            "value": -1.33
          },
          {
            "month": "2023-05",
            "value": -1.36
          },
          {
            "month": "2023-06",
            "value": -3
          },
          {
            "month": "2023-07",
            "value": 0.76
          },
          {
            "month": "2023-08",
            "value": 3.21
          },
          {
            "month": "2023-09",
            "value": 2.28
          },
          {
            "month": "2023-10",
            "value": 2.25
          },
          {
            "month": "2023-11",
            "value": -0.52
          },
          {
            "month": "2023-12",
            "value": 3.54
          },
          {
            "month": "2024-01",
            "value": -0.73
          },
          {
            "month": "2024-02",
            "value": 2.38
          },
          {
            "month": "2024-03",
            "value": 2.16
          },
          {
            "month": "2024-04",
            "value": 1.9
          },
          {
            "month": "2024-05",
            "value": 0.24
          },
          {
            "month": "2024-06",
            "value": -0.38
          },
          {
            "month": "2024-07",
            "value": 1.99
          },
          {
            "month": "2024-08",
            "value": 0.22
          },
          {
            "month": "2024-09",
            "value": 0.73
          },
          {
            "month": "2024-10",
            "value": 1.25
          },
          {
            "month": "2024-11",
            "value": 1.34
          },
          {
            "month": "2024-12",
            "value": 1.26
          },
          {
            "month": "2025-01",
            "value": -0.07
          },
          {
            "month": "2025-02",
            "value": 0.89
          },
          {
            "month": "2025-03",
            "value": 3.67
          },
          {
            "month": "2025-04",
            "value": 4.29
          },
          {
            "month": "2025-05",
            "value": 0.19
          },
          {
            "month": "2025-06",
            "value": 3.95
          },
          {
            "month": "2025-07",
            "value": -0.56
          },
          {
            "month": "2025-08",
            "value": 3.4
          },
          {
            "month": "2025-09",
            "value": 2.49
          },
          {
            "month": "2025-10",
            "value": 1.49
          },
          {
            "month": "2025-11",
            "value": -6.29
          },
          {
            "month": "2025-12",
            "value": -1.74
          },
          {
            "month": "2026-02",
            "value": 0.36
          },
          {
            "month": "2026-03",
            "value": 1.58
          },
          {
            "month": "2026-04",
            "value": 0.86
          },
          {
            "month": "2026-05",
            "value": 1.38
          },
          {
            "month": "2026-06",
            "value": 0.48
          },
          {
            "month": "2026-07",
            "value": 1.47
          }
        ]
      }
    ],
    "tesis": [
      {
        "title": "Originação",
        "body": "Carteira multissetorial de direitos creditórios, cotas de outros FIDCs, créditos vencidos e renda fixa, reduzindo a dependência de um único segmento da economia."
      },
      {
        "title": "Proteções da estrutura",
        "body": "Subordinação de 40,12% do patrimônio líquido, com classes Sênior5 e Sênior6 pari passu no topo da hierarquia de pagamento e Mezanino como camada intermediária."
      },
      {
        "title": "Geração de retorno",
        "body": "O spread entre a rentabilidade da carteira e o custo de captação das cotas Sênior (CDI + 4,00% a.a.) remunera as classes e gera excedente residual para a Subordinada."
      }
    ],
    "portfolio": {
      "categories": [
        {
          "name": "Carteira de direitos creditórios",
          "value": 97,
          "color": "#F5A623"
        },
        {
          "name": "Cotas de outros FIDCs",
          "value": 7.1,
          "color": "#0C0F2E"
        },
        {
          "name": "Títulos públicos federais",
          "value": 0.3,
          "color": "#8A94B0"
        },
        {
          "name": "Disponibilidades",
          "value": 0,
          "color": "#CBD0E0"
        }
      ],
      "indicators": [
        {
          "label": "Carteira de crédito",
          "value": "R$ 75,47 milhões"
        },
        {
          "label": "Créditos em atraso",
          "value": "R$ 2,43 milhões"
        },
        {
          "label": "PDD constituída",
          "value": "R$ 2,09 milhões"
        },
        {
          "label": "Disponibilidades",
          "value": "R$ 28,41 milhões"
        },
        {
          "label": "Direitos Creditórios / PL",
          "value": "75,06%"
        },
        {
          "label": "Inadimplência da carteira",
          "value": "3,5%"
        },
        {
          "label": "Concentração top 5 cedentes",
          "value": "10,8%"
        },
        {
          "label": "Agência de rating",
          "value": "Austin Rating"
        }
      ],
      "aging": [
        {
          "label": "até 30 dias",
          "value": 43
        },
        {
          "label": "31 a 60 dias",
          "value": 19.3
        },
        {
          "label": "61 a 90 dias",
          "value": 8.2
        },
        {
          "label": "91 a 120 dias",
          "value": 2.8
        },
        {
          "label": "121 a 150 dias",
          "value": 1.9
        },
        {
          "label": "151 a 180 dias",
          "value": 1.7
        },
        {
          "label": "181 a 360 dias",
          "value": 9.1
        },
        {
          "label": "361 a 720 dias",
          "value": 13
        },
        {
          "label": "721 a 1080 dias",
          "value": 1.1
        }
      ]
    },
    "documents": [
      {
        "name": "Regulamento vigente",
        "date": "julho de 2026",
        "url": "/documentos/regulamento-solar-fidc-multissetorial.pdf"
      }
    ]
  },
  {
    "slug": "solar-puglia-fidc-rl",
    "name": "Solar Puglia FIDC",
    "cnpj": "52.498.421/0001-98",
    "startDate": "20 de dezembro de 2023",
    "dataBase": "julho de 2026",
    "tagline": "O maior fundo da família Solar em patrimônio líquido, com classe sênior e subordinada.",
    "strategyLabel": "Fomento Mercantil · CDI+",
    "description": "O Solar Puglia FIDC estrutura direitos creditórios de fomento mercantil, com classe sênior e subordinada. É o maior fundo da família Solar em patrimônio líquido.",
    "strategyDetail": "Aquisição de direitos creditórios com critérios de elegibilidade e diversificação de cedentes, com estrutura de cotas segmentada por nível de subordinação.",
    "aum": "R$ 311,16 milhões",
    "aumShort": "R$ 311,2 mi",
    "targetReturn": "CDI + 4,00% a.a.",
    "returns": {
      "month": 1.58,
      "year": 10.61,
      "twelveMonths": 18.9,
      "sinceInception": 31.83
    },
    "subordination": "44,76%",
    "defaultRate": "1,88%",
    "publicTarget": "Investidores Qualificados",
    "condominium": "Aberto",
    "administrator": "Singulare",
    "custodian": "Singulare",
    "manager": "Iggy Investimentos",
    "coManager": "Fram Capital",
    "classes": [
      {
        "name": "Subordinada",
        "participation": "44,76%",
        "targetReturn": "Residual (sem meta fixa)",
        "rating": "N/A",
        "periods": {
          "month": 3.53,
          "year": 45.44,
          "threeMonths": 13.66,
          "sixMonths": 37.03,
          "twelveMonths": 88,
          "sinceInception": 321.13,
          "cdiMonth": 290.2,
          "cdiYear": 558.1,
          "cdiThreeMonths": 396.3,
          "cdiSixMonths": 536.8,
          "cdiTwelveMonths": 598.1,
          "cdiSinceInception": 857.8
        },
        "history": [
          {
            "month": "2024-01",
            "value": 1.06
          },
          {
            "month": "2024-02",
            "value": 1.29
          },
          {
            "month": "2024-03",
            "value": 1.99
          },
          {
            "month": "2024-04",
            "value": 3.01
          },
          {
            "month": "2024-05",
            "value": 3.46
          },
          {
            "month": "2024-06",
            "value": 4.19
          },
          {
            "month": "2024-07",
            "value": 4.88
          },
          {
            "month": "2024-08",
            "value": 4.36
          },
          {
            "month": "2024-09",
            "value": 4.51
          },
          {
            "month": "2024-10",
            "value": 5.49
          },
          {
            "month": "2024-11",
            "value": 4.65
          },
          {
            "month": "2024-12",
            "value": 4.73
          },
          {
            "month": "2025-01",
            "value": 5.43
          },
          {
            "month": "2025-02",
            "value": 5.65
          },
          {
            "month": "2025-03",
            "value": 5.28
          },
          {
            "month": "2025-04",
            "value": 5.16
          },
          {
            "month": "2025-05",
            "value": 6.26
          },
          {
            "month": "2025-06",
            "value": 4.79
          },
          {
            "month": "2025-07",
            "value": 6.15
          },
          {
            "month": "2025-08",
            "value": 4.93
          },
          {
            "month": "2025-09",
            "value": 4.85
          },
          {
            "month": "2025-10",
            "value": 5.62
          },
          {
            "month": "2025-11",
            "value": 4.88
          },
          {
            "month": "2025-12",
            "value": 6.07
          },
          {
            "month": "2026-02",
            "value": 5.76
          },
          {
            "month": "2026-03",
            "value": 7.46
          },
          {
            "month": "2026-04",
            "value": 6.07
          },
          {
            "month": "2026-05",
            "value": 5.91
          },
          {
            "month": "2026-06",
            "value": 3.67
          },
          {
            "month": "2026-07",
            "value": 3.53
          }
        ]
      },
      {
        "name": "Sênior1",
        "participation": "55,24%",
        "targetReturn": "CDI + 4,00% a.a.",
        "rating": "N/A",
        "periods": {
          "month": 1.58,
          "year": 10.61,
          "threeMonths": 4.48,
          "sixMonths": 8.98,
          "twelveMonths": 18.9,
          "sinceInception": 31.83,
          "cdiMonth": 129.9,
          "cdiYear": 130.3,
          "cdiThreeMonths": 130.1,
          "cdiSixMonths": 130.2,
          "cdiTwelveMonths": 128.7,
          "cdiSinceInception": 128.7
        },
        "history": [
          {
            "month": "2024-12",
            "value": 1.12
          },
          {
            "month": "2025-01",
            "value": 1.27
          },
          {
            "month": "2025-02",
            "value": 1.22
          },
          {
            "month": "2025-03",
            "value": 1.19
          },
          {
            "month": "2025-04",
            "value": 1.29
          },
          {
            "month": "2025-05",
            "value": 1.39
          },
          {
            "month": "2025-06",
            "value": 1.33
          },
          {
            "month": "2025-07",
            "value": 1.55
          },
          {
            "month": "2025-08",
            "value": 1.41
          },
          {
            "month": "2025-09",
            "value": 1.48
          },
          {
            "month": "2025-10",
            "value": 1.55
          },
          {
            "month": "2025-11",
            "value": 1.29
          },
          {
            "month": "2025-12",
            "value": 1.57
          },
          {
            "month": "2026-02",
            "value": 1.28
          },
          {
            "month": "2026-03",
            "value": 1.56
          },
          {
            "month": "2026-04",
            "value": 1.41
          },
          {
            "month": "2026-05",
            "value": 1.39
          },
          {
            "month": "2026-06",
            "value": 1.45
          },
          {
            "month": "2026-07",
            "value": 1.58
          }
        ]
      }
    ],
    "tesis": [
      {
        "title": "Originação",
        "body": "Direitos creditórios de fomento mercantil, com diversificação de cedentes e critérios de elegibilidade definidos em regulamento."
      },
      {
        "title": "Proteções da estrutura",
        "body": "Subordinação de 44,76% do patrimônio líquido — a maior entre os fundos Solar —, absorvendo oscilações da carteira antes de impactar a classe Sênior."
      },
      {
        "title": "Geração de retorno",
        "body": "Desconto de recebíveis a taxas compatíveis com o risco da carteira, remunerando a Sênior em CDI + 4,00% a.a. e distribuindo o excedente à Subordinada."
      }
    ],
    "portfolio": {
      "categories": [
        {
          "name": "Carteira de direitos creditórios",
          "value": 99.6,
          "color": "#F5A623"
        },
        {
          "name": "Títulos públicos federais",
          "value": 0,
          "color": "#0C0F2E"
        },
        {
          "name": "Disponibilidades",
          "value": 0,
          "color": "#8A94B0"
        }
      ],
      "indicators": [
        {
          "label": "Carteira de crédito",
          "value": "R$ 246,97 milhões"
        },
        {
          "label": "Créditos em atraso",
          "value": "R$ 5,84 milhões"
        },
        {
          "label": "PDD constituída",
          "value": "R$ 964 mil"
        },
        {
          "label": "Disponibilidades",
          "value": "R$ 63,82 milhões"
        },
        {
          "label": "Direitos Creditórios / PL",
          "value": "79,37%"
        },
        {
          "label": "Inadimplência da carteira",
          "value": "2,4%"
        },
        {
          "label": "Concentração top 5 cedentes",
          "value": "72,1%"
        },
        {
          "label": "Agência de rating",
          "value": "Austin Rating"
        }
      ],
      "aging": [
        {
          "label": "até 30 dias",
          "value": 32.2
        },
        {
          "label": "31 a 60 dias",
          "value": 34.4
        },
        {
          "label": "61 a 90 dias",
          "value": 20.4
        },
        {
          "label": "91 a 120 dias",
          "value": 6.7
        },
        {
          "label": "121 a 150 dias",
          "value": 1.2
        },
        {
          "label": "151 a 180 dias",
          "value": 0.3
        },
        {
          "label": "181 a 360 dias",
          "value": 3.9
        },
        {
          "label": "361 a 720 dias",
          "value": 0.6
        },
        {
          "label": "mais de 1080 dias",
          "value": 0.2
        }
      ]
    },
    "documents": [
      {
        "name": "Regulamento vigente",
        "date": "julho de 2026",
        "url": "/documentos/regulamento-solar-puglia-fidc.pdf"
      }
    ]
  },
  {
    "slug": "solar-vialoc-fidc",
    "name": "Solar Vialoc FIDC",
    "cnpj": "39.680.495/0001-82",
    "startDate": "14 de abril de 2021",
    "dataBase": "julho de 2026",
    "tagline": "Fomento mercantil com quatro classes de cota ativas desde 2021.",
    "strategyLabel": "Fomento Mercantil · CDI+",
    "description": "O Solar Vialoc FIDC Padronizado estrutura direitos creditórios de fomento mercantil, com quatro classes de cota ativas desde 2021.",
    "strategyDetail": "Aquisição de direitos creditórios com critérios de elegibilidade e diversificação de cedentes, com estrutura de cotas segmentada por nível de subordinação.",
    "aum": "R$ 65,17 milhões",
    "aumShort": "R$ 65,2 mi",
    "targetReturn": "CDI + 4,5% a.a.",
    "returns": {
      "month": 1.62,
      "year": 10.92,
      "twelveMonths": null,
      "sinceInception": 12.87
    },
    "subordination": "43,23%",
    "defaultRate": "1,68%",
    "publicTarget": "Investidores Profissionais",
    "condominium": "Fechado",
    "administrator": "Singulare",
    "custodian": "Singulare",
    "manager": "Iggy Investimentos",
    "coManager": null,
    "classes": [
      {
        "name": "Sênior3",
        "participation": "51,06%",
        "targetReturn": "CDI + 4,5% a.a.",
        "rating": null,
        "periods": {
          "month": 1.62,
          "year": 10.92,
          "threeMonths": 4.61,
          "sixMonths": 9.24,
          "twelveMonths": null,
          "sinceInception": 12.87,
          "cdiMonth": 133.5,
          "cdiYear": 134.1,
          "cdiThreeMonths": 133.8,
          "cdiSixMonths": 134,
          "cdiTwelveMonths": null,
          "cdiSinceInception": 134.3
        },
        "history": [
          {
            "month": "2025-11",
            "value": 0.15
          },
          {
            "month": "2025-12",
            "value": 1.61
          },
          {
            "month": "2026-02",
            "value": 1.32
          },
          {
            "month": "2026-03",
            "value": 1.6
          },
          {
            "month": "2026-04",
            "value": 1.44
          },
          {
            "month": "2026-05",
            "value": 1.43
          },
          {
            "month": "2026-06",
            "value": 1.49
          },
          {
            "month": "2026-07",
            "value": 1.62
          }
        ]
      },
      {
        "name": "Sênior2",
        "participation": "5,71%",
        "targetReturn": "CDI + 4,0% a.a.",
        "rating": "brBBB+(sf)",
        "periods": {
          "month": 1.58,
          "year": 10.63,
          "threeMonths": 4.49,
          "sixMonths": 9,
          "twelveMonths": 19.32,
          "sinceInception": 58.99,
          "cdiMonth": 130.1,
          "cdiYear": 130.5,
          "cdiThreeMonths": 130.3,
          "cdiSixMonths": 130.5,
          "cdiTwelveMonths": 131.3,
          "cdiSinceInception": 140.5
        },
        "history": [
          {
            "month": "2023-09",
            "value": 0.96
          },
          {
            "month": "2023-10",
            "value": 1.33
          },
          {
            "month": "2023-11",
            "value": 1.23
          },
          {
            "month": "2023-12",
            "value": 1.21
          },
          {
            "month": "2024-01",
            "value": 1.31
          },
          {
            "month": "2024-02",
            "value": 1.1
          },
          {
            "month": "2024-03",
            "value": 1.15
          },
          {
            "month": "2024-04",
            "value": 1.23
          },
          {
            "month": "2024-05",
            "value": 1.16
          },
          {
            "month": "2024-06",
            "value": 1.1
          },
          {
            "month": "2024-07",
            "value": 1.27
          },
          {
            "month": "2024-08",
            "value": 1.21
          },
          {
            "month": "2024-09",
            "value": 1.16
          },
          {
            "month": "2024-10",
            "value": 1.29
          },
          {
            "month": "2024-11",
            "value": 1.09
          },
          {
            "month": "2024-12",
            "value": 1.26
          },
          {
            "month": "2025-01",
            "value": 1.36
          },
          {
            "month": "2025-02",
            "value": 1.3
          },
          {
            "month": "2025-03",
            "value": 1.26
          },
          {
            "month": "2025-04",
            "value": 1.37
          },
          {
            "month": "2025-05",
            "value": 1.47
          },
          {
            "month": "2025-06",
            "value": 1.41
          },
          {
            "month": "2025-07",
            "value": 1.77
          },
          {
            "month": "2025-08",
            "value": 1.5
          },
          {
            "month": "2025-09",
            "value": 1.57
          },
          {
            "month": "2025-10",
            "value": 1.64
          },
          {
            "month": "2025-11",
            "value": 1.35
          },
          {
            "month": "2025-12",
            "value": 1.57
          },
          {
            "month": "2026-02",
            "value": 1.28
          },
          {
            "month": "2026-03",
            "value": 1.56
          },
          {
            "month": "2026-04",
            "value": 1.41
          },
          {
            "month": "2026-05",
            "value": 1.39
          },
          {
            "month": "2026-06",
            "value": 1.45
          },
          {
            "month": "2026-07",
            "value": 1.58
          }
        ]
      },
      {
        "name": "Mezanino",
        "participation": "2,29%",
        "targetReturn": "CDI + 5,5% a.a.",
        "rating": "brBB(sf)",
        "periods": {
          "month": 1.71,
          "year": 11.5,
          "threeMonths": 4.86,
          "sixMonths": 9.75,
          "twelveMonths": 20.99,
          "sinceInception": 53.34,
          "cdiMonth": 140.8,
          "cdiYear": 141.2,
          "cdiThreeMonths": 141.1,
          "cdiSixMonths": 141.4,
          "cdiTwelveMonths": 142.7,
          "cdiSinceInception": 153.5
        },
        "history": [
          {
            "month": "2024-02",
            "value": 0.06
          },
          {
            "month": "2024-03",
            "value": 1.26
          },
          {
            "month": "2024-04",
            "value": 1.36
          },
          {
            "month": "2024-05",
            "value": 1.22
          },
          {
            "month": "2024-06",
            "value": 1.22
          },
          {
            "month": "2024-07",
            "value": 1.4
          },
          {
            "month": "2024-08",
            "value": 1.34
          },
          {
            "month": "2024-09",
            "value": 1.29
          },
          {
            "month": "2024-10",
            "value": 1.42
          },
          {
            "month": "2024-11",
            "value": 1.2
          },
          {
            "month": "2024-12",
            "value": 1.38
          },
          {
            "month": "2025-01",
            "value": 1.48
          },
          {
            "month": "2025-02",
            "value": 1.42
          },
          {
            "month": "2025-03",
            "value": 1.37
          },
          {
            "month": "2025-04",
            "value": 1.49
          },
          {
            "month": "2025-05",
            "value": 1.59
          },
          {
            "month": "2025-06",
            "value": 1.53
          },
          {
            "month": "2025-07",
            "value": 1.77
          },
          {
            "month": "2025-08",
            "value": 1.62
          },
          {
            "month": "2025-09",
            "value": 1.69
          },
          {
            "month": "2025-10",
            "value": 1.77
          },
          {
            "month": "2025-11",
            "value": 1.46
          },
          {
            "month": "2025-12",
            "value": 8.47
          },
          {
            "month": "2026-02",
            "value": 1.38
          },
          {
            "month": "2026-03",
            "value": 1.55
          },
          {
            "month": "2026-04",
            "value": 1.44
          },
          {
            "month": "2026-05",
            "value": 1.59
          },
          {
            "month": "2026-06",
            "value": 1.49
          },
          {
            "month": "2026-07",
            "value": 1.71
          }
        ]
      },
      {
        "name": "Subordinada",
        "participation": "40,93%",
        "targetReturn": "Residual (sem meta fixa)",
        "rating": "brB+(sf)",
        "periods": {
          "month": 1.74,
          "year": 17.24,
          "threeMonths": 5.99,
          "sixMonths": 14.18,
          "twelveMonths": 29.45,
          "sinceInception": 229.4,
          "cdiMonth": 143.3,
          "cdiYear": 211.7,
          "cdiThreeMonths": 173.8,
          "cdiSixMonths": 205.6,
          "cdiTwelveMonths": 200.2,
          "cdiSinceInception": 283.9
        },
        "history": [
          {
            "month": "2021-05",
            "value": 1.4
          },
          {
            "month": "2021-06",
            "value": 1.98
          },
          {
            "month": "2021-07",
            "value": 1.84
          },
          {
            "month": "2021-08",
            "value": 7.07
          },
          {
            "month": "2021-09",
            "value": 1.41
          },
          {
            "month": "2021-10",
            "value": 1.81
          },
          {
            "month": "2021-11",
            "value": 1.15
          },
          {
            "month": "2021-12",
            "value": 1.46
          },
          {
            "month": "2022-01",
            "value": 1.41
          },
          {
            "month": "2022-03",
            "value": 1.7
          },
          {
            "month": "2022-04",
            "value": 1.24
          },
          {
            "month": "2022-05",
            "value": 2.19
          },
          {
            "month": "2022-06",
            "value": 2.1
          },
          {
            "month": "2022-07",
            "value": 1.95
          },
          {
            "month": "2022-08",
            "value": 2.33
          },
          {
            "month": "2022-09",
            "value": 2.19
          },
          {
            "month": "2022-10",
            "value": 2.08
          },
          {
            "month": "2022-11",
            "value": 2.08
          },
          {
            "month": "2022-12",
            "value": 2.07
          },
          {
            "month": "2023-01",
            "value": 2.24
          },
          {
            "month": "2023-02",
            "value": 1.82
          },
          {
            "month": "2023-03",
            "value": -0.08
          },
          {
            "month": "2023-04",
            "value": 1.09
          },
          {
            "month": "2023-05",
            "value": 1.46
          },
          {
            "month": "2023-06",
            "value": 1.32
          },
          {
            "month": "2023-07",
            "value": 9.57
          },
          {
            "month": "2023-08",
            "value": 1.26
          },
          {
            "month": "2023-09",
            "value": 1.07
          },
          {
            "month": "2023-10",
            "value": 1.16
          },
          {
            "month": "2023-11",
            "value": 1.32
          },
          {
            "month": "2023-12",
            "value": 1.53
          },
          {
            "month": "2024-01",
            "value": 1.9
          },
          {
            "month": "2024-02",
            "value": 1.56
          },
          {
            "month": "2024-03",
            "value": 1.42
          },
          {
            "month": "2024-04",
            "value": 1.87
          },
          {
            "month": "2024-05",
            "value": 2.26
          },
          {
            "month": "2024-06",
            "value": 1.54
          },
          {
            "month": "2024-07",
            "value": 1.9
          },
          {
            "month": "2024-08",
            "value": 1.48
          },
          {
            "month": "2024-09",
            "value": 1.52
          },
          {
            "month": "2024-10",
            "value": 2.28
          },
          {
            "month": "2024-11",
            "value": 2.14
          },
          {
            "month": "2024-12",
            "value": 2.89
          },
          {
            "month": "2025-01",
            "value": 2.39
          },
          {
            "month": "2025-02",
            "value": 1.92
          },
          {
            "month": "2025-03",
            "value": 2.33
          },
          {
            "month": "2025-04",
            "value": 2.66
          },
          {
            "month": "2025-05",
            "value": 2.24
          },
          {
            "month": "2025-06",
            "value": 2.18
          },
          {
            "month": "2025-07",
            "value": 2.89
          },
          {
            "month": "2025-08",
            "value": 2.02
          },
          {
            "month": "2025-09",
            "value": 2.07
          },
          {
            "month": "2025-10",
            "value": 1.65
          },
          {
            "month": "2025-11",
            "value": 1.73
          },
          {
            "month": "2025-12",
            "value": 2.55
          },
          {
            "month": "2026-02",
            "value": 2.43
          },
          {
            "month": "2026-03",
            "value": 2.43
          },
          {
            "month": "2026-04",
            "value": 2.64
          },
          {
            "month": "2026-05",
            "value": 1.75
          },
          {
            "month": "2026-06",
            "value": 2.39
          },
          {
            "month": "2026-07",
            "value": 1.74
          }
        ]
      }
    ],
    "tesis": [
      {
        "title": "Originação",
        "body": "Direitos creditórios de fomento mercantil, com critérios de elegibilidade e diversificação de cedentes definidos em regulamento."
      },
      {
        "title": "Proteções da estrutura",
        "body": "Subordinação somando as camadas seniores, com Mezanino intermediário e Subordinada absorvendo primeiro as oscilações da carteira."
      },
      {
        "title": "Geração de retorno",
        "body": "Spread entre a taxa de desconto dos direitos creditórios e o custo de captação das classes seniores, com excedente distribuído à Subordinada."
      }
    ],
    "portfolio": {
      "categories": [
        {
          "name": "Carteira de direitos creditórios",
          "value": 99.9,
          "color": "#F5A623"
        },
        {
          "name": "Títulos públicos federais",
          "value": 0.1,
          "color": "#0C0F2E"
        },
        {
          "name": "Disponibilidades",
          "value": 0,
          "color": "#8A94B0"
        }
      ],
      "indicators": [
        {
          "label": "Carteira de crédito",
          "value": "R$ 64,56 milhões"
        },
        {
          "label": "Créditos em atraso",
          "value": "R$ 1,09 milhões"
        },
        {
          "label": "PDD constituída",
          "value": "—"
        },
        {
          "label": "Disponibilidades",
          "value": "R$ 1,82 milhões"
        },
        {
          "label": "Direitos Creditórios / PL",
          "value": "99,08%"
        },
        {
          "label": "Inadimplência da carteira",
          "value": "0,3%"
        },
        {
          "label": "Concentração top 5 cedentes",
          "value": "60,0%"
        },
        {
          "label": "Agência de rating",
          "value": "Austin Rating"
        }
      ],
      "aging": [
        {
          "label": "até 30 dias",
          "value": 29.8
        },
        {
          "label": "31 a 60 dias",
          "value": 13.8
        },
        {
          "label": "61 a 90 dias",
          "value": 5
        },
        {
          "label": "91 a 120 dias",
          "value": 0.2
        },
        {
          "label": "121 a 150 dias",
          "value": 0.2
        },
        {
          "label": "151 a 180 dias",
          "value": 0.3
        },
        {
          "label": "181 a 360 dias",
          "value": 1.7
        },
        {
          "label": "361 a 720 dias",
          "value": 4.5
        },
        {
          "label": "721 a 1080 dias",
          "value": 8.1
        },
        {
          "label": "mais de 1080 dias",
          "value": 36.4
        }
      ]
    },
    "documents": [
      {
        "name": "Regulamento vigente",
        "date": "julho de 2026",
        "url": "/documentos/regulamento-solar-vialoc-fidc.pdf"
      }
    ]
  },
  {
    "slug": "solar-belmonte-fidc",
    "name": "Solar Belmonte FIDC",
    "cnpj": "58.347.004/0001-20",
    "startDate": "21 de fevereiro de 2025",
    "dataBase": "julho de 2026",
    "tagline": "Fomento mercantil com classes sênior, mezanino e subordinada, em operação desde 2025.",
    "strategyLabel": "Fomento Mercantil · CDI+",
    "description": "O Solar Belmonte FIDC estrutura direitos creditórios de fomento mercantil, com classes sênior, mezanino e subordinada, em operação desde fevereiro de 2025.",
    "strategyDetail": "Aquisição de direitos creditórios com critérios de elegibilidade e diversificação de cedentes, com estrutura de cotas segmentada por nível de subordinação.",
    "aum": "R$ 24,92 milhões",
    "aumShort": "R$ 24,9 mi",
    "targetReturn": "CDI + 4,25% a.a.",
    "returns": {
      "month": 1.6,
      "year": 10.77,
      "twelveMonths": 19.6,
      "sinceInception": 22.7
    },
    "subordination": "59,54%",
    "defaultRate": null,
    "publicTarget": "Investidores Profissionais",
    "condominium": "Fechado",
    "administrator": "Hemera DTVM",
    "custodian": "Hemera DTVM",
    "manager": "Antharus Gestora de Recursos",
    "coManager": null,
    "classes": [
      {
        "name": "Subordinada",
        "participation": "59,54%",
        "targetReturn": "Residual (sem meta fixa)",
        "rating": "N/A",
        "periods": {
          "month": 1.33,
          "year": 13.75,
          "threeMonths": 3.69,
          "sixMonths": 7.72,
          "twelveMonths": 36,
          "sinceInception": 52.33,
          "cdiMonth": 109.1,
          "cdiYear": 168.8,
          "cdiThreeMonths": 106.9,
          "cdiSixMonths": 112,
          "cdiTwelveMonths": 244.5,
          "cdiSinceInception": 243.4
        },
        "history": [
          {
            "month": "2025-02",
            "value": 0.28
          },
          {
            "month": "2025-03",
            "value": 1.68
          },
          {
            "month": "2025-04",
            "value": 1.79
          },
          {
            "month": "2025-05",
            "value": 1.07
          },
          {
            "month": "2025-06",
            "value": 2.6
          },
          {
            "month": "2025-07",
            "value": 4.1
          },
          {
            "month": "2025-08",
            "value": 4.22
          },
          {
            "month": "2025-09",
            "value": 2.89
          },
          {
            "month": "2025-10",
            "value": 5.89
          },
          {
            "month": "2025-11",
            "value": 1.36
          },
          {
            "month": "2025-12",
            "value": 3.86
          },
          {
            "month": "2026-03",
            "value": 1.41
          },
          {
            "month": "2026-04",
            "value": 1.36
          },
          {
            "month": "2026-05",
            "value": 1.11
          },
          {
            "month": "2026-06",
            "value": 1.2
          },
          {
            "month": "2026-07",
            "value": 1.33
          }
        ]
      },
      {
        "name": "Sênior",
        "participation": "40,46%",
        "targetReturn": "CDI + 4,25% a.a.",
        "rating": "N/A",
        "periods": {
          "month": 1.6,
          "year": 10.77,
          "threeMonths": 4.55,
          "sixMonths": 9.1,
          "twelveMonths": 19.6,
          "sinceInception": 22.7,
          "cdiMonth": 131.7,
          "cdiYear": 132.2,
          "cdiThreeMonths": 131.9,
          "cdiSixMonths": 132.1,
          "cdiTwelveMonths": 133.2,
          "cdiSinceInception": 133
        },
        "history": [
          {
            "month": "2025-06",
            "value": 1
          },
          {
            "month": "2025-07",
            "value": 1.66
          },
          {
            "month": "2025-08",
            "value": 1.52
          },
          {
            "month": "2025-09",
            "value": 1.59
          },
          {
            "month": "2025-10",
            "value": 1.66
          },
          {
            "month": "2025-11",
            "value": 1.37
          },
          {
            "month": "2025-12",
            "value": 1.59
          },
          {
            "month": "2026-03",
            "value": 1.58
          },
          {
            "month": "2026-04",
            "value": 1.43
          },
          {
            "month": "2026-05",
            "value": 1.41
          },
          {
            "month": "2026-06",
            "value": 1.47
          },
          {
            "month": "2026-07",
            "value": 1.6
          }
        ]
      },
      {
        "name": "Mezanino",
        "participation": "0,00%",
        "targetReturn": "CDI + 6,00% a.a.",
        "rating": "N/A",
        "periods": {
          "month": 1.06,
          "year": 11.07,
          "threeMonths": 4.28,
          "sixMonths": 9.26,
          "twelveMonths": 20.8,
          "sinceInception": 24.28,
          "cdiMonth": 87.6,
          "cdiYear": 136,
          "cdiThreeMonths": 124.1,
          "cdiSixMonths": 134.3,
          "cdiTwelveMonths": 141.2,
          "cdiSinceInception": 142.2
        },
        "history": [
          {
            "month": "2025-06",
            "value": 1.08
          },
          {
            "month": "2025-07",
            "value": 1.82
          },
          {
            "month": "2025-08",
            "value": 1.66
          },
          {
            "month": "2025-09",
            "value": 1.74
          },
          {
            "month": "2025-10",
            "value": 1.82
          },
          {
            "month": "2025-11",
            "value": 1.5
          },
          {
            "month": "2025-12",
            "value": 1.74
          },
          {
            "month": "2026-03",
            "value": 1.73
          },
          {
            "month": "2026-04",
            "value": 1.56
          },
          {
            "month": "2026-05",
            "value": 1.54
          },
          {
            "month": "2026-06",
            "value": 1.61
          },
          {
            "month": "2026-07",
            "value": 1.06
          }
        ]
      }
    ],
    "tesis": [
      {
        "title": "Originação",
        "body": "Direitos creditórios de fomento mercantil, com critérios de elegibilidade e diversificação de cedentes, em operação desde fevereiro de 2025."
      },
      {
        "title": "Proteções da estrutura",
        "body": "Subordinação de 59,54% do patrimônio líquido — a mais alta entre os fundos Solar —, refletindo o estágio ainda inicial de captação do veículo."
      },
      {
        "title": "Geração de retorno",
        "body": "Spread entre a rentabilidade da carteira e o custo de captação da Sênior (CDI + 4,25% a.a.), com excedente residual distribuído à Subordinada."
      }
    ],
    "portfolio": {
      "categories": [
        {
          "name": "Carteira de direitos creditórios",
          "value": 92.1,
          "color": "#F5A623"
        },
        {
          "name": "Cotas de outros FIDCs",
          "value": 11.2,
          "color": "#0C0F2E"
        },
        {
          "name": "Disponibilidades",
          "value": 0,
          "color": "#8A94B0"
        }
      ],
      "indicators": [
        {
          "label": "Carteira de crédito",
          "value": "R$ 19,84 milhões"
        },
        {
          "label": "Créditos em atraso",
          "value": "—"
        },
        {
          "label": "PDD constituída",
          "value": "—"
        },
        {
          "label": "Disponibilidades",
          "value": "R$ 4,76 milhões"
        },
        {
          "label": "Direitos Creditórios / PL",
          "value": "79,63%"
        },
        {
          "label": "Inadimplência da carteira",
          "value": "0,0%"
        },
        {
          "label": "Concentração top 5 cedentes",
          "value": "—"
        },
        {
          "label": "Agência de rating",
          "value": "Austin Rating"
        }
      ],
      "aging": [
        {
          "label": "até 30 dias",
          "value": 52.6
        },
        {
          "label": "31 a 60 dias",
          "value": 37
        },
        {
          "label": "61 a 90 dias",
          "value": 9.3
        },
        {
          "label": "91 a 120 dias",
          "value": 1.1
        }
      ]
    },
    "documents": [
      {
        "name": "Regulamento vigente",
        "date": "julho de 2026",
        "url": "/documentos/regulamento-solar-belmonte-fidc.pdf"
      }
    ]
  }
]
