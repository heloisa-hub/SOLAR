import { Fragment, useState } from 'react'
import { useParams, Link } from 'react-router'
import { funds } from '../data/funds'
import { SolarMark } from '../components/SolarLogo'
import CTABand from '../components/CTABand'
import ReturnChart from '../components/ReturnChart'
import { PortfolioDonut, AgingBars } from '../components/PortfolioChart'
import usePageTitle from '../hooks/usePageTitle'
import { withBase } from '../lib/assetUrl'

const TABS = ['Visão Geral', 'Estratégia e Estrutura', 'Carteira & Crédito', 'Rentabilidade', 'Documentos']

function fmtPct(v: number | null | undefined) {
  if (v == null) return '—'
  return `${v > 0 ? '+' : ''}${v.toFixed(2).replace('.', ',')}%`
}
function fmtCdi(v: number | null | undefined) {
  if (v == null) return '—'
  return `${v.toFixed(1).replace('.', ',')}%`
}

export default function FundoDetalhe() {
  const { slug } = useParams<{ slug: string }>()
  const [activeTab, setActiveTab] = useState(0)

  const fund = funds.find((f) => f.slug === slug)
  const principalClassName = fund?.classes[0]?.name ?? 'Sênior'
  usePageTitle(fund ? fund.name : 'Fundo não encontrado')

  if (!fund) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--color-surface-offwhite)', paddingTop: '72px' }}>
        <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgb(var(--ink-rgb) / 0.3)' }}>
          404
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-on-light)' }}>Fundo não encontrado</h1>
        <Link to="/fundos" className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--color-brand)' }}>
          ← Ver todos os fundos
        </Link>
      </div>
    )
  }

  return (
    // key=slug força remontar o componente ao trocar de fundo — sem isso,
    // a aba ativa e o estado interno do gráfico (classe/modo selecionados)
    // ficavam "grudados" na navegação entre fundos, já que o React Router
    // reaproveita a mesma instância quando só o parâmetro da rota muda.
    <Fragment key={fund.slug}>
      {/* Fund hero */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ background: 'linear-gradient(135deg, var(--color-surface-dark-deep) 0%, var(--color-surface-dark) 100%)', minHeight: '52vh', paddingTop: '118px' }}
      >
        <div className="absolute pointer-events-none" style={{ right: '-8%', top: '50%', transform: 'translateY(-50%)', width: '50vw', opacity: 0.06 }}>
          <SolarMark className="w-full h-full" />
        </div>
        <div className="site-container pb-0 relative z-10">
          <Link to="/fundos" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-8 hover:opacity-70 transition-opacity" style={{ color: 'rgb(var(--paper-rgb) / 0.45)' }}>
            ← Todos os fundos
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-brand)' }}>
            {fund.strategyLabel}
          </p>
          <div className="w-8 h-px mb-6" style={{ background: 'var(--color-brand)' }} />
          <h1 className="font-bold text-white mb-6" style={{ fontSize: 'var(--text-h1-size)', lineHeight: 'var(--text-h1-leading)' }}>
            {fund.name}
          </h1>
          <div className="flex flex-wrap gap-6 pb-10 text-xs" style={{ color: 'rgb(var(--paper-rgb) / 0.45)' }}>
            <span>CNPJ {fund.cnpj}</span>
            <span>·</span>
            <span>Início: {fund.startDate}</span>
            <span>·</span>
            <span>Data-base: {fund.dataBase}</span>
          </div>
        </div>
      </section>

      {/* KPI strip */}
      <section style={{ background: 'var(--color-surface-dark-elevated)' }}>
        <div className="site-container py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Patrimônio Líquido', value: fund.aumShort },
              { label: `Retorno-alvo ${principalClassName}`, value: fund.targetReturn },
              { label: 'Índice de Subordinação', value: fund.subordination ?? '—' },
              { label: 'Inadimplência / PL', value: fund.defaultRate ?? '—' },
            ].map((k, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xs uppercase tracking-wider mb-2" style={{ color: 'rgb(var(--paper-rgb) / 0.35)' }}>
                  {k.label}
                </span>
                <span className="font-bold" style={{ color: 'var(--color-brand)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
                  {k.value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-6" style={{ color: 'rgb(var(--paper-rgb) / 0.25)' }}>
            Dados com base em {fund.dataBase}. Rentabilidade passada não representa garantia de rentabilidade futura.
          </p>
        </div>
      </section>

      {/* Tabs navigation */}
      <section style={{ background: 'var(--color-surface-cream)', borderBottom: '1px solid rgb(var(--ink-rgb) / 0.10)' }}>
        <div className="site-container overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {TABS.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="px-5 py-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all duration-200 whitespace-nowrap"
                style={{ borderColor: activeTab === i ? 'var(--color-brand)' : 'transparent', color: activeTab === i ? 'var(--color-text-on-light)' : 'rgb(var(--ink-rgb) / 0.45)' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab content */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="py-16 lg:py-24">
        <div className="site-container">

          {/* TAB 0 — Visão Geral */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <h2 className="font-bold text-xl mb-4" style={{ color: 'var(--color-text-on-light)' }}>Sobre o fundo</h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'rgb(var(--ink-rgb) / 0.65)' }}>
                  {fund.description}
                </p>
                <ReturnChart classes={fund.classes} />
              </div>
              <div className="lg:col-span-2">
                <h2 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
                  Ficha do fundo
                </h2>
                <div className="space-y-3">
                  {[
                    { label: 'Patrimônio Líquido', value: fund.aum },
                    { label: 'Público-alvo', value: fund.publicTarget },
                    { label: 'Condomínio', value: fund.condominium },
                    { label: 'Início', value: fund.startDate },
                    { label: 'Data-base', value: fund.dataBase },
                    { label: 'Gestor', value: fund.coManager ? `${fund.manager} (cogestão: ${fund.coManager})` : fund.manager },
                    { label: 'Administrador', value: fund.administrator },
                    { label: 'Custodiante', value: fund.custodian },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-start py-3 border-b gap-4" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.10)' }}>
                      <span className="text-xs" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>{row.label}</span>
                      <span className="text-xs font-semibold text-right" style={{ color: 'var(--color-text-on-light)' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-6 leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.35)' }}>
                  Rentabilidade passada não representa garantia de rentabilidade futura.
                </p>
              </div>
            </div>
          )}

          {/* TAB 1 — Estratégia e Estrutura */}
          {activeTab === 1 && (
            <div>
              <h2 className="font-bold text-xl mb-4" style={{ color: 'var(--color-text-on-light)' }}>Estratégia</h2>
              <p className="text-base leading-relaxed mb-4 max-w-3xl" style={{ color: 'rgb(var(--ink-rgb) / 0.65)' }}>
                {fund.description}
              </p>
              <p className="text-base leading-relaxed mb-12 max-w-3xl" style={{ color: 'rgb(var(--ink-rgb) / 0.65)' }}>
                {fund.strategyDetail}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 mb-12 border" style={{ background: 'var(--color-surface-cream)', borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}>
                {[
                  { label: 'Público-alvo', value: fund.publicTarget },
                  { label: 'Condomínio', value: fund.condominium },
                  { label: 'Início', value: fund.startDate },
                  { label: 'Retorno-alvo', value: fund.targetReturn },
                ].map((c, i) => (
                  <div key={i}>
                    <p className="text-xs uppercase tracking-wider mb-1.5" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>{c.label}</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{c.value}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-sm uppercase tracking-wider mb-8" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
                A tese em três pontos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                {fund.tesis.map((t, i) => (
                  <div key={i} className="p-6 border" style={{ background: 'var(--color-surface-cream)', borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}>
                    <span className="block text-xs font-bold mb-3" style={{ color: 'var(--color-brand)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--color-text-on-light)' }}>{t.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.6)' }}>{t.body}</p>
                  </div>
                ))}
              </div>

              <h2 className="font-bold text-xl mb-4" style={{ color: 'var(--color-text-on-light)' }}>Estrutura de capital</h2>
              <p className="text-base leading-relaxed mb-10 max-w-3xl" style={{ color: 'rgb(var(--ink-rgb) / 0.65)' }}>
                O fundo emite diferentes classes de cotas com hierarquia de pagamento definida. As cotas Sênior têm preferência no recebimento e retorno-alvo predefinido. As cotas Subordinadas absorvem as primeiras perdas e recebem o excedente.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px]">
                  <thead>
                    <tr style={{ background: 'var(--color-text-on-light)' }}>
                      {['Classe / Série', 'Participação', 'Retorno-alvo', 'Rating', 'Prazo'].map((h, i) => (
                        <th key={i} className="text-left px-5 py-3.5">
                          <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{h}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fund.classes.map((cls, i) => (
                      <tr key={i} className="border-b" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.10)', background: i % 2 === 0 ? 'var(--color-surface-cream)' : 'var(--color-surface-offwhite)' }}>
                        <td className="px-5 py-4 text-sm font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{cls.name}</td>
                        <td className="px-5 py-4 text-sm" style={{ color: 'rgb(var(--ink-rgb) / 0.7)' }}>{cls.participation ?? '—'}</td>
                        <td className="px-5 py-4 text-sm font-medium" style={{ color: 'var(--color-text-on-light)' }}>{cls.targetReturn}</td>
                        <td className="px-5 py-4 text-sm" style={{ color: 'rgb(var(--ink-rgb) / 0.7)' }}>{cls.rating ?? '—'}</td>
                        <td className="px-5 py-4 text-sm" style={{ color: 'rgb(var(--ink-rgb) / 0.7)' }}>Não divulgado</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-6" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>
                * Retorno-alvo é o objetivo de remuneração das cotas, não garantia de rentabilidade. Informações com base em {fund.dataBase}.
              </p>
            </div>
          )}

          {/* TAB 2 — Carteira & Crédito */}
          {activeTab === 2 && (
            <div>
              <h2 className="font-bold text-xl mb-10" style={{ color: 'var(--color-text-on-light)' }}>Carteira & Crédito</h2>
              {fund.portfolio ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-stretch">
                    <div className="flex flex-col">
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
                        Composição da carteira
                      </h3>
                      <div className="flex-1 flex items-center" style={{ minHeight: 260 }}>
                        <PortfolioDonut categories={fund.portfolio.categories} />
                      </div>
                    </div>
                    {fund.portfolio.aging.length > 0 && (
                      <div className="flex flex-col">
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
                          Prazo da carteira (aging)
                        </h3>
                        <div className="flex-1 flex items-end">
                          <AgingBars buckets={fund.portfolio.aging} height={260} />
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
                    Indicadores de qualidade
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                    {fund.portfolio.indicators.map((ind, i) => (
                      <div key={i} className="py-3 border-b" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.10)' }}>
                        <p className="text-xs mb-1" style={{ color: 'rgb(var(--ink-rgb) / 0.5)' }}>{ind.label}</p>
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{ind.value}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-12 text-center border" style={{ background: 'var(--color-surface-cream)', borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}>
                  <p className="text-sm" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
                    Informações da carteira disponíveis mediante solicitação.
                  </p>
                  <Link to="/contato" className="inline-flex mt-4 text-sm font-semibold" style={{ color: 'var(--color-brand)' }}>
                    Fale com a Solar →
                  </Link>
                </div>
              )}
              <p className="text-xs mt-8" style={{ color: 'rgb(var(--ink-rgb) / 0.35)' }}>
                Dados com base em {fund.dataBase}.
              </p>
            </div>
          )}

          {/* TAB 3 — Rentabilidade */}
          {activeTab === 3 && (
            <div>
              <h2 className="font-bold text-xl mb-4" style={{ color: 'var(--color-text-on-light)' }}>Rentabilidade por classe de cota</h2>
              <p className="text-xs mb-10" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
                Linhas em cinza mostram o percentual do CDI equivalente a cada período.
              </p>
              <div className="grid grid-cols-1 gap-12 items-start">
                <div>
                  <ReturnChart classes={fund.classes} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs min-w-[820px]">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgb(var(--ink-rgb) / 0.15)' }}>
                        {['Classe', '% PL', 'Rating', 'Mês', 'Ano', '3M', '6M', '12M', 'Desde início'].map((h) => (
                          <th key={h} className="text-left py-3 pr-4 font-semibold uppercase tracking-wider" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {fund.classes.map((c) => (
                        <Fragment key={c.name}>
                          <tr className="border-t" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{c.name}</td>
                            <td className="py-2.5 pr-4" style={{ color: 'var(--color-text-on-light)' }}>{c.participation ?? '—'}</td>
                            <td className="py-2.5 pr-4" style={{ color: 'var(--color-text-on-light)' }}>{c.rating ?? '—'}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{fmtPct(c.periods.month)}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{fmtPct(c.periods.year)}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{fmtPct(c.periods.threeMonths)}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{fmtPct(c.periods.sixMonths)}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{fmtPct(c.periods.twelveMonths)}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{fmtPct(c.periods.sinceInception)}</td>
                          </tr>
                          <tr className="border-b" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>% do CDI</td>
                            <td className="pb-2.5" />
                            <td className="pb-2.5" />
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>{fmtCdi(c.periods.cdiMonth)}</td>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>{fmtCdi(c.periods.cdiYear)}</td>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>{fmtCdi(c.periods.cdiThreeMonths)}</td>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>{fmtCdi(c.periods.cdiSixMonths)}</td>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>{fmtCdi(c.periods.cdiTwelveMonths)}</td>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>{fmtCdi(c.periods.cdiSinceInception)}</td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-xs mt-8 max-w-2xl" style={{ color: 'rgb(var(--ink-rgb) / 0.35)' }}>
                Rentabilidade passada não representa garantia de rentabilidade futura. As informações acima têm base em {fund.dataBase} e podem ser atualizadas periodicamente.
              </p>
            </div>
          )}

          {/* TAB 4 — Documentos */}
          {activeTab === 4 && (
            <div style={{ maxWidth: 'clamp(320px, 50vw, 760px)' }}>
              <h2 className="font-bold text-xl mb-6" style={{ color: 'var(--color-text-on-light)' }}>Documentos</h2>
              {fund.documents.length > 0 ? (
                <div>
                  {fund.documents.map((doc, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-6 py-4 border-b"
                      style={{ borderColor: 'rgb(var(--ink-rgb) / 0.10)' }}
                    >
                      <p className="text-sm font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{doc.name}</p>
                      <p className="text-xs whitespace-nowrap" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>{doc.date ?? '—'}</p>
                      {doc.url ? (
                        <a
                          href={withBase(doc.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold uppercase tracking-wider px-4 py-2 border-2 transition-all duration-200 hover:bg-solar-navy hover:text-white"
                          style={{ borderColor: 'var(--color-text-on-light)', color: 'var(--color-text-on-light)' }}
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-xs" style={{ color: 'rgb(var(--ink-rgb) / 0.35)' }}>Sob solicitação</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center border" style={{ background: 'var(--color-surface-cream)', borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}>
                  <p className="text-sm" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
                    Nenhum documento publicado para este fundo até o momento.
                  </p>
                  <Link to="/contato" className="inline-flex mt-4 text-sm font-semibold" style={{ color: 'var(--color-brand)' }}>
                    Fale com a Solar →
                  </Link>
                </div>
              )}
              <p className="text-xs mt-6 leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>
                Documentos oficiais serão publicados aqui assim que disponibilizados pelo administrador.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTABand
        title="Tem interesse em investir neste fundo?"
        body="Fale com a Solar. Investimentos em FIDCs são destinados a investidores qualificados ou profissionais."
        primaryButton={{ label: 'Fale com a Solar', to: '/contato' }}
      />
    </Fragment>
  )
}
