// Gera src/data/funds.ts a partir da fonte real: 4. Site/js/funds-data.js
// (dados oficiais já apurados e verificados nesta sessão) — evita
// retranscrever manualmente centenas de pontos de histórico mensal.
const fs = require('fs');
const path = require('path');

const HTML_SITE = path.resolve(__dirname, '..', '..', '4. Site');
const rawJs = fs.readFileSync(path.join(HTML_SITE, 'js', 'funds-data.js'), 'utf8');

// funds-data.js é `var SOLAR_CAPITAL_FUNDS = [...];` — extrai e avalia o array.
const match = rawJs.match(/var SOLAR_CAPITAL_FUNDS\s*=\s*(\[[\s\S]*\]);/);
if (!match) throw new Error('Não consegui extrair SOLAR_CAPITAL_FUNDS de funds-data.js');
const SOLAR_CAPITAL_FUNDS = new Function('return ' + match[1])();

const MONTHS_LONG = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
function formatDateLong(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${MONTHS_LONG[m - 1]} de ${y}`;
}
function formatDataBase(label) {
  // "Jul/2026" -> "julho de 2026"
  const MESES = { Jan:'janeiro', Fev:'fevereiro', Mar:'março', Abr:'abril', Mai:'maio', Jun:'junho', Jul:'julho', Ago:'agosto', Set:'setembro', Out:'outubro', Nov:'novembro', Dez:'dezembro' };
  const [mes, ano] = label.split('/');
  return `${MESES[mes] || mes.toLowerCase()} de ${ano}`;
}
function isResidual(nome) {
  const n = (nome || '').toLowerCase();
  return n.includes('subordinada') || n.includes('júnior') || n.includes('junior');
}
function benchmarkLabel(c) {
  if (c.benchmark) return c.benchmark;
  return isResidual(c.nome) ? 'Residual (sem meta fixa)' : 'Não divulgado nas fontes disponíveis';
}
function pct(v, decimals = 2) {
  if (v === null || v === undefined) return null;
  return Number(Number(v).toFixed(decimals));
}
// "R$ 100,55 milhões" -> "R$ 100,6 mi" (pra caber em cards compactos, mesmo arredondamento usado no site HTML)
function abbreviateReais(label) {
  const m = label.match(/R\$\s*([\d.,]+)\s*(milhões|milhão|mil)/i);
  if (!m) return label;
  const num = parseFloat(m[1].replace(/\./g, '').replace(',', '.'));
  const unit = /mil(?!h)/i.test(m[2]) ? 'mil' : 'mi';
  const rounded = unit === 'mi' ? num.toFixed(1) : Math.round(num).toString();
  return `R$ ${rounded.replace('.', ',')} ${unit}`;
}

const PORTFOLIO_COLORS = ['#F5A623', '#0C0F2E', '#8A94B0', '#CBD0E0'];

// classificacaoAnbima ("Crédito Estruturado") é igual pros 4 fundos — não
// diferencia nada na Home/listagem. Usa a estratégia real de cada um.
const STRATEGY_LABEL = {
  'solar-fidc-multissetorial': 'Multissetorial · CDI+',
  'solar-puglia-fidc-rl': 'Fomento Mercantil · CDI+',
  'solar-vialoc-fidc': 'Fomento Mercantil · CDI+',
  'solar-belmonte-fidc': 'Fomento Mercantil · CDI+',
};

// Tagline curta pros cards de listagem — descricao já é o parágrafo cheio
// usado na aba Estratégia, repetir o mesmo texto nos dois lugares é redundante.
const TAGLINE = {
  'solar-fidc-multissetorial': 'Direitos creditórios multissetoriais, com originação pulverizada desde 2018.',
  'solar-puglia-fidc-rl': 'O maior fundo da família Solar em patrimônio líquido, com classe sênior e subordinada.',
  'solar-vialoc-fidc': 'Fomento mercantil com quatro classes de cota ativas desde 2021.',
  'solar-belmonte-fidc': 'Fomento mercantil com classes sênior, mezanino e subordinada, em operação desde 2025.',
};

const TESIS = {
  'solar-fidc-multissetorial': [
    { title: 'Originação', body: 'Carteira multissetorial de direitos creditórios, cotas de outros FIDCs, créditos vencidos e renda fixa, reduzindo a dependência de um único segmento da economia.' },
    { title: 'Proteções da estrutura', body: 'Subordinação de 40,12% do patrimônio líquido, com classes Sênior5 e Sênior6 pari passu no topo da hierarquia de pagamento e Mezanino como camada intermediária.' },
    { title: 'Geração de retorno', body: 'O spread entre a rentabilidade da carteira e o custo de captação das cotas Sênior (CDI + 4,00% a.a.) remunera as classes e gera excedente residual para a Subordinada.' },
  ],
  'solar-puglia-fidc-rl': [
    { title: 'Originação', body: 'Direitos creditórios de fomento mercantil, com diversificação de cedentes e critérios de elegibilidade definidos em regulamento.' },
    { title: 'Proteções da estrutura', body: 'Subordinação de 44,76% do patrimônio líquido — a maior entre os fundos Solar —, absorvendo oscilações da carteira antes de impactar a classe Sênior.' },
    { title: 'Geração de retorno', body: 'Desconto de recebíveis a taxas compatíveis com o risco da carteira, remunerando a Sênior em CDI + 4,00% a.a. e distribuindo o excedente à Subordinada.' },
  ],
  'solar-vialoc-fidc': [
    { title: 'Originação', body: 'Direitos creditórios de fomento mercantil, com critérios de elegibilidade e diversificação de cedentes definidos em regulamento.' },
    { title: 'Proteções da estrutura', body: 'Subordinação somando as camadas seniores, com Mezanino intermediário e Subordinada absorvendo primeiro as oscilações da carteira.' },
    { title: 'Geração de retorno', body: 'Spread entre a taxa de desconto dos direitos creditórios e o custo de captação das classes seniores, com excedente distribuído à Subordinada.' },
  ],
  'solar-belmonte-fidc': [
    { title: 'Originação', body: 'Direitos creditórios de fomento mercantil, com critérios de elegibilidade e diversificação de cedentes, em operação desde fevereiro de 2025.' },
    { title: 'Proteções da estrutura', body: 'Subordinação de 59,54% do patrimônio líquido — a mais alta entre os fundos Solar —, refletindo o estágio ainda inicial de captação do veículo.' },
    { title: 'Geração de retorno', body: 'Spread entre a rentabilidade da carteira e o custo de captação da Sênior (CDI + 4,25% a.a.), com excedente residual distribuído à Subordinada.' },
  ],
};

const funds = SOLAR_CAPITAL_FUNDS.map((f) => {
  const principal = f.classes.find((c) => c.nome === f.classePrincipal) || f.classes[0];

  const classes = f.classes.map((c) => ({
    name: c.nome,
    participation: c.percentPL != null ? `${c.percentPL.toFixed(2).replace('.', ',')}%` : null,
    targetReturn: benchmarkLabel(c),
    rating: c.rating || null,
    periods: {
      month: pct(c.mes), year: pct(c.ano), threeMonths: pct(c.tresMeses), sixMonths: pct(c.seisMeses),
      twelveMonths: pct(c.dozeMeses), sinceInception: pct(c.desdeInicio),
      cdiMonth: pct(c.cdiMes, 1), cdiYear: pct(c.cdiAno, 1), cdiThreeMonths: pct(c.cdi3m, 1),
      cdiSixMonths: pct(c.cdi6m, 1), cdiTwelveMonths: pct(c.cdi12m, 1), cdiSinceInception: pct(c.cdiInicio, 1),
    },
    history: (c.historicoMensal || []).map((h) => ({ month: h.mes, value: pct(h.rentabilidade) })),
  }));

  return {
    slug: f.slug,
    name: f.nome,
    cnpj: f.cnpj,
    startDate: formatDateLong(f.dataInicio),
    dataBase: formatDataBase(f.dataBase),
    tagline: TAGLINE[f.slug] || f.descricao,
    strategyLabel: STRATEGY_LABEL[f.slug] || f.classificacaoAnbima,
    description: f.descricao,
    strategyDetail: f.estrategia,
    aum: f.plAtual,
    aumShort: abbreviateReais(f.plAtual),
    targetReturn: benchmarkLabel(principal),
    returns: {
      month: pct(principal.mes), year: pct(principal.ano),
      twelveMonths: pct(principal.dozeMeses), sinceInception: pct(principal.desdeInicio),
    },
    subordination: f.classes.filter((c) => /^s[eê]nior/i.test(c.nome)).every((c) => c.percentPL != null)
      ? `${Math.max(0, 100 - f.classes.filter((c) => /^s[eê]nior/i.test(c.nome)).reduce((s, c) => s + c.percentPL, 0)).toFixed(2).replace('.', ',')}%`
      : null,
    defaultRate: f.inadimplenciaCvmPercentPL != null ? `${f.inadimplenciaCvmPercentPL.toFixed(2).replace('.', ',')}%` : null,
    publicTarget: f.publicoAlvo === 'Investidor profissional' ? 'Investidores Profissionais' : 'Investidores Qualificados',
    condominium: f.condominio || 'Fechado',
    administrator: f.administrador,
    custodian: f.custodiante,
    manager: (f.gestor || '').split(' (cogestão:')[0].trim(),
    coManager: f.gestor && f.gestor.includes('cogestão:') ? f.gestor.match(/cogestão:\s*([^)]+)\)/)[1].trim() : null,
    classes,
    tesis: TESIS[f.slug] || [],
    portfolio: f.composicaoPortfolio && f.composicaoPortfolio.length ? {
      categories: f.composicaoPortfolio.map((p, i) => ({ name: p.categoria, value: pct(p.percent, 1), color: PORTFOLIO_COLORS[i % PORTFOLIO_COLORS.length] })),
      indicators: [
        { label: 'Carteira de crédito', value: f.carteiraCredito || '—' },
        { label: 'Créditos em atraso', value: f.creditosAtraso || '—' },
        { label: 'PDD constituída', value: f.pdd || '—' },
        { label: 'Disponibilidades', value: f.disponibilidade || '—' },
        { label: 'Direitos Creditórios / PL', value: f.percentDcSobrePl || '—' },
        { label: 'Inadimplência da carteira', value: f.inadimplenciaPercentCarteira != null ? `${f.inadimplenciaPercentCarteira.toFixed(1).replace('.', ',')}%` : '—' },
        { label: 'Concentração top 5 cedentes', value: f.concentracaoTop5Cedentes != null ? `${f.concentracaoTop5Cedentes.toFixed(1).replace('.', ',')}%` : '—' },
        { label: 'Agência de rating', value: f.agenciaRating || '—' },
      ],
      aging: (f.agingCarteira || []).map((a) => ({ label: a.faixa, value: pct(a.percent, 1) })),
    } : null,
    documents: (f.documentos || []).map((d) => ({ name: d.nome === 'Regulamento' ? 'Regulamento vigente' : d.nome, date: formatDataBase(f.dataBase), url: d.url ? `/${d.url}` : null })),
  };
});

const header = `/**
 * Fonte de dados dos fundos Solar Capital.
 * GERADO AUTOMATICAMENTE a partir de 4. Site/js/funds-data.js por
 * scripts/convert-funds.cjs — não edite este arquivo à mão. Dados reais
 * dos demonstrativos mensais oficiais e do informe mensal CVM de cada
 * fundo (data-base: julho de 2026), incluindo histórico mensal completo
 * de todas as classes, composição de carteira e aging.
 * Para atualizar: rode \`node scripts/convert-funds.cjs\` depois de
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

export const funds: Fund[] = `;

const out = header + JSON.stringify(funds, null, 2) + '\n';
fs.writeFileSync(path.resolve(__dirname, '..', 'src', 'data', 'funds.ts'), out, 'utf8');
console.log('OK — funds.ts gerado com', funds.length, 'fundos.');
for (const f of funds) {
  console.log(' -', f.slug, ':', f.classes.length, 'classes,', f.classes.reduce((s, c) => s + c.history.length, 0), 'pontos de histórico total');
}
