import { Fragment, useState } from 'react'
import { useParams, Link } from 'react-router'
import { funds } from '../data/funds'
import { SolarMark } from '../components/SolarLogo'
import ReturnChart from '../components/ReturnChart'
import { PortfolioDonut, AgingBars } from '../components/PortfolioChart'
import usePageTitle from '../hooks/usePageTitle'

const TABS = ['Visão Geral', 'Estratégia', 'Estrutura', 'Carteira & Crédito', 'Rentabilidade', 'Documentos']

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
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#F7F2E6', paddingTop: '72px' }}>
        <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(12,15,46,0.3)' }}>
          404
        </p>
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#0C0F2E' }}>Fundo não encontrado</h1>
        <Link to="/fundos" className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#F5A623' }}>
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
        style={{ background: 'linear-gradient(135deg, #080A20 0%, #0C0F2E 100%)', minHeight: '52vh', paddingTop: '118px' }}
      >
        <div className="absolute pointer-events-none" style={{ right: '-8%', top: '50%', transform: 'translateY(-50%)', width: '50vw', opacity: 0.06 }}>
          <SolarMark color="#F5A623" className="w-full h-full" />
        </div>
        <div className="site-container pb-0 relative z-10">
          <Link to="/fundos" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-8 hover:opacity-70 transition-opacity" style={{ color: 'rgba(255,255,255,0.45)' }}>
            ← Todos os fundos
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: '#F5A623' }}>
            {fund.strategyLabel}
          </p>
          <div className="w-8 h-px mb-6" style={{ background: '#F5A623' }} />
          <h1 className="font-bold leading-[1.06] text-white mb-6" style={{ fontSize: 'clamp(1.7rem, 2.8vw, 2.5rem)' }}>
            {fund.name}
          </h1>
          <div className="flex flex-wrap gap-6 pb-10 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <span>CNPJ {fund.cnpj}</span>
            <span>·</span>
            <span>Início: {fund.startDate}</span>
            <span>·</span>
            <span>Data-base: {fund.dataBase}</span>
          </div>
        </div>
      </section>

      {/* KPI strip */}
      <section style={{ background: '#131737' }}>
        <div className="site-container py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Patrimônio Líquido', value: fund.aumShort },
              { label: `Retorno-alvo ${principalClassName}`, value: fund.targetReturn },
              { label: 'Índice de Subordinação', value: fund.subordination ?? '—' },
              { label: 'Inadimplência / PL', value: fund.defaultRate ?? '—' },
            ].map((k, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {k.label}
                </span>
                <span className="font-bold" style={{ color: '#F5A623', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
                  {k.value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Dados com base em {fund.dataBase}. Rentabilidade passada não representa garantia de rentabilidade futura.
          </p>
        </div>
      </section>

      {/* Tabs navigation */}
      <section style={{ background: '#EDE6D3', borderBottom: '1px solid rgba(12,15,46,0.10)' }}>
        <div className="site-container overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {TABS.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className="px-5 py-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all duration-200 whitespace-nowrap"
                style={{ borderColor: activeTab === i ? '#F5A623' : 'transparent', color: activeTab === i ? '#0C0F2E' : 'rgba(12,15,46,0.45)' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab content */}
      <section style={{ background: '#F7F2E6' }} className="py-16 lg:py-24">
        <div className="site-container">

          {/* TAB 0 — Visão Geral */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <h2 className="font-bold text-xl mb-4" style={{ color: '#0C0F2E' }}>Sobre o fundo</h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(12,15,46,0.65)' }}>
                  {fund.description}
                </p>
                <ReturnChart classes={fund.classes} />
              </div>
              <div className="lg:col-span-2">
                <h2 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'rgba(12,15,46,0.45)' }}>
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
                    <div key={i} className="flex justify-between items-start py-3 border-b gap-4" style={{ borderColor: 'rgba(12,15,46,0.10)' }}>
                      <span className="text-xs" style={{ color: 'rgba(12,15,46,0.45)' }}>{row.label}</span>
                      <span className="text-xs font-semibold text-right" style={{ color: '#0C0F2E' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-6 leading-relaxed" style={{ color: 'rgba(12,15,46,0.35)' }}>
                  Rentabilidade passada não representa garantia de rentabilidade futura.
                </p>
              </div>
            </div>
          )}

          {/* TAB 1 — Estratégia */}
          {activeTab === 1 && (
            <div className="max-w-4xl">
              <h2 className="font-bold text-xl mb-4" style={{ color: '#0C0F2E' }}>Estratégia</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'rgba(12,15,46,0.65)' }}>
                {fund.description}
              </p>
              <p className="text-base leading-relaxed mb-12" style={{ color: 'rgba(12,15,46,0.65)' }}>
                {fund.strategyDetail}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 mb-12 border" style={{ background: '#EDE6D3', borderColor: 'rgba(12,15,46,0.08)' }}>
                {[
                  { label: 'Público-alvo', value: fund.publicTarget },
                  { label: 'Condomínio', value: fund.condominium },
                  { label: 'Início', value: fund.startDate },
                  { label: 'Retorno-alvo', value: fund.targetReturn },
                ].map((c, i) => (
                  <div key={i}>
                    <p className="text-xs uppercase tracking-wider mb-1.5" style={{ color: 'rgba(12,15,46,0.4)' }}>{c.label}</p>
                    <p className="text-sm font-semibold" style={{ color: '#0C0F2E' }}>{c.value}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-sm uppercase tracking-wider mb-8" style={{ color: 'rgba(12,15,46,0.45)' }}>
                A tese em três pontos
              </h3>
              <div className="space-y-4">
                {fund.tesis.map((t, i) => (
                  <div key={i} className="p-6 border" style={{ background: '#EDE6D3', borderColor: 'rgba(12,15,46,0.08)' }}>
                    <div className="flex items-start gap-4">
                      <span className="text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: '#F5A623' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm mb-2" style={{ color: '#0C0F2E' }}>{t.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(12,15,46,0.6)' }}>{t.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2 — Estrutura */}
          {activeTab === 2 && (
            <div>
              <h2 className="font-bold text-xl mb-4" style={{ color: '#0C0F2E' }}>Estrutura de capital</h2>
              <p className="text-base leading-relaxed mb-10 max-w-2xl" style={{ color: 'rgba(12,15,46,0.65)' }}>
                O fundo emite diferentes classes de cotas com hierarquia de pagamento definida. As cotas Sênior têm preferência no recebimento e retorno-alvo predefinido. As cotas Subordinadas absorvem as primeiras perdas e recebem o excedente.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px]">
                  <thead>
                    <tr style={{ background: '#0C0F2E' }}>
                      {['Classe / Série', 'Participação', 'Retorno-alvo', 'Rating', 'Prazo'].map((h, i) => (
                        <th key={i} className="text-left px-5 py-3.5">
                          <span className="text-xs font-semibold uppercase tracking-wider text-white/60">{h}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fund.classes.map((cls, i) => (
                      <tr key={i} className="border-b" style={{ borderColor: 'rgba(12,15,46,0.10)', background: i % 2 === 0 ? '#EDE6D3' : '#F7F2E6' }}>
                        <td className="px-5 py-4 text-sm font-semibold" style={{ color: '#0C0F2E' }}>{cls.name}</td>
                        <td className="px-5 py-4 text-sm" style={{ color: 'rgba(12,15,46,0.7)' }}>{cls.participation ?? '—'}</td>
                        <td className="px-5 py-4 text-sm font-medium" style={{ color: '#0C0F2E' }}>{cls.targetReturn}</td>
                        <td className="px-5 py-4 text-sm" style={{ color: 'rgba(12,15,46,0.7)' }}>{cls.rating ?? '—'}</td>
                        <td className="px-5 py-4 text-sm" style={{ color: 'rgba(12,15,46,0.7)' }}>Não divulgado</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs mt-6" style={{ color: 'rgba(12,15,46,0.4)' }}>
                * Retorno-alvo é o objetivo de remuneração das cotas, não garantia de rentabilidade. Informações com base em {fund.dataBase}.
              </p>
            </div>
          )}

          {/* TAB 3 — Carteira & Crédito */}
          {activeTab === 3 && (
            <div>
              <h2 className="font-bold text-xl mb-10" style={{ color: '#0C0F2E' }}>Carteira & Crédito</h2>
              {fund.portfolio ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'rgba(12,15,46,0.45)' }}>
                        Composição da carteira
                      </h3>
                      <PortfolioDonut categories={fund.portfolio.categories} />
                    </div>
                    {fund.portfolio.aging.length > 0 && (
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'rgba(12,15,46,0.45)' }}>
                          Prazo da carteira (aging)
                        </h3>
                        <AgingBars buckets={fund.portfolio.aging} />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-6" style={{ color: 'rgba(12,15,46,0.45)' }}>
                    Indicadores de qualidade
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                    {fund.portfolio.indicators.map((ind, i) => (
                      <div key={i} className="py-3 border-b" style={{ borderColor: 'rgba(12,15,46,0.10)' }}>
                        <p className="text-xs mb-1" style={{ color: 'rgba(12,15,46,0.5)' }}>{ind.label}</p>
                        <p className="text-sm font-semibold" style={{ color: '#0C0F2E' }}>{ind.value}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-12 text-center border" style={{ background: '#EDE6D3', borderColor: 'rgba(12,15,46,0.08)' }}>
                  <p className="text-sm" style={{ color: 'rgba(12,15,46,0.45)' }}>
                    Informações da carteira disponíveis mediante solicitação.
                  </p>
                  <Link to="/contato" className="inline-flex mt-4 text-sm font-semibold" style={{ color: '#F5A623' }}>
                    Fale com a Solar →
                  </Link>
                </div>
              )}
              <p className="text-xs mt-8" style={{ color: 'rgba(12,15,46,0.35)' }}>
                Dados com base em {fund.dataBase}.
              </p>
            </div>
          )}

          {/* TAB 4 — Rentabilidade */}
          {activeTab === 4 && (
            <div>
              <h2 className="font-bold text-xl mb-4" style={{ color: '#0C0F2E' }}>Rentabilidade por classe de cota</h2>
              <p className="text-xs mb-10" style={{ color: 'rgba(12,15,46,0.45)' }}>
                Linhas em cinza mostram o percentual do CDI equivalente a cada período.
              </p>
              <div className="grid grid-cols-1 gap-12 items-start">
                <div className="p-6 border" style={{ background: '#EDE6D3', borderColor: 'rgba(12,15,46,0.08)' }}>
                  <ReturnChart classes={fund.classes} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs min-w-[820px]">
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(12,15,46,0.15)' }}>
                        {['Classe', '% PL', 'Rating', 'Mês', 'Ano', '3M', '6M', '12M', 'Desde início'].map((h) => (
                          <th key={h} className="text-left py-3 pr-4 font-semibold uppercase tracking-wider" style={{ color: 'rgba(12,15,46,0.45)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {fund.classes.map((c) => (
                        <Fragment key={c.name}>
                          <tr className="border-t" style={{ borderColor: 'rgba(12,15,46,0.08)' }}>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: '#0C0F2E' }}>{c.name}</td>
                            <td className="py-2.5 pr-4" style={{ color: '#0C0F2E' }}>{c.participation ?? '—'}</td>
                            <td className="py-2.5 pr-4" style={{ color: '#0C0F2E' }}>{c.rating ?? '—'}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: '#0C0F2E' }}>{fmtPct(c.periods.month)}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: '#0C0F2E' }}>{fmtPct(c.periods.year)}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: '#0C0F2E' }}>{fmtPct(c.periods.threeMonths)}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: '#0C0F2E' }}>{fmtPct(c.periods.sixMonths)}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: '#0C0F2E' }}>{fmtPct(c.periods.twelveMonths)}</td>
                            <td className="py-2.5 pr-4 font-semibold" style={{ color: '#0C0F2E' }}>{fmtPct(c.periods.sinceInception)}</td>
                          </tr>
                          <tr className="border-b" style={{ borderColor: 'rgba(12,15,46,0.08)' }}>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgba(12,15,46,0.4)' }}>% do CDI</td>
                            <td className="pb-2.5" />
                            <td className="pb-2.5" />
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgba(12,15,46,0.4)' }}>{fmtCdi(c.periods.cdiMonth)}</td>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgba(12,15,46,0.4)' }}>{fmtCdi(c.periods.cdiYear)}</td>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgba(12,15,46,0.4)' }}>{fmtCdi(c.periods.cdiThreeMonths)}</td>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgba(12,15,46,0.4)' }}>{fmtCdi(c.periods.cdiSixMonths)}</td>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgba(12,15,46,0.4)' }}>{fmtCdi(c.periods.cdiTwelveMonths)}</td>
                            <td className="pb-2.5 pr-4 italic" style={{ color: 'rgba(12,15,46,0.4)' }}>{fmtCdi(c.periods.cdiSinceInception)}</td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-xs mt-8 max-w-2xl" style={{ color: 'rgba(12,15,46,0.35)' }}>
                Rentabilidade passada não representa garantia de rentabilidade futura. As informações acima têm base em {fund.dataBase} e podem ser atualizadas periodicamente.
              </p>
            </div>
          )}

          {/* TAB 5 — Documentos */}
          {activeTab === 5 && (
            <div className="max-w-2xl">
              <h2 className="font-bold text-xl mb-10" style={{ color: '#0C0F2E' }}>Documentos</h2>
              <div className="space-y-3">
                {fund.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-5 border" style={{ background: '#EDE6D3', borderColor: 'rgba(12,15,46,0.08)' }}>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#0C0F2E' }}>{doc.name}</p>
                      {doc.date && <p className="text-xs mt-0.5" style={{ color: 'rgba(12,15,46,0.4)' }}>{doc.date}</p>}
                    </div>
                    {doc.url ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold uppercase tracking-wider px-4 py-2 border transition-all duration-200 hover:bg-solar-navy hover:border-solar-navy hover:text-white"
                        style={{ borderColor: '#0C0F2E', color: '#0C0F2E' }}
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-xs" style={{ color: 'rgba(12,15,46,0.35)' }}>Sob solicitação</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs mt-8 leading-relaxed" style={{ color: 'rgba(12,15,46,0.4)' }}>
                Documentos oficiais serão publicados aqui assim que disponibilizados pelo administrador.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden py-16" style={{ background: '#F5A623' }}>
        <div
          className="absolute pointer-events-none"
          style={{ right: '-4%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(180px, 24vw, 360px)', opacity: 0.12 }}
        >
          <SolarMark color="#0C0F2E" className="w-full h-auto" />
        </div>
        <div className="site-container relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-bold text-xl mb-1" style={{ color: '#0C0F2E' }}>
              Tem interesse em investir neste fundo?
            </h2>
            <p className="text-sm" style={{ color: 'rgba(12,15,46,0.65)' }}>
              Fale com a Solar. Investimentos em FIDCs são destinados a investidores qualificados ou profissionais.
            </p>
          </div>
          <Link
            to="/contato"
            className="inline-flex items-center px-8 py-4 text-sm font-semibold uppercase tracking-wider border-2 rounded flex-shrink-0 transition-all duration-200 hover:bg-solar-navy hover:border-solar-navy hover:text-white"
            style={{ borderColor: '#0C0F2E', color: '#0C0F2E' }}
          >
            Fale com a Solar
          </Link>
        </div>
      </section>
    </Fragment>
  )
}
