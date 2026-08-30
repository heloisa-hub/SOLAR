import { Link } from 'react-router'
import { SolarMark } from '../components/SolarLogo'
import { funds } from '../data/funds'
import usePageTitle from '../hooks/usePageTitle'

export default function Fundos() {
  usePageTitle('Fundos')
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ background: 'linear-gradient(135deg, #080A20 0%, #0C0F2E 100%)', minHeight: '52vh', paddingTop: '118px' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{ right: '-8%', top: '50%', transform: 'translateY(-50%)', width: '50vw', opacity: 0.06 }}
        >
          <SolarMark color="#F5A623" className="w-full h-full" />
        </div>
        <div className="site-container pb-16 relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: '#F5A623' }}>
            Estratégias
          </p>
          <div className="w-8 h-px mb-6" style={{ background: '#F5A623' }} />
          <h1
            className="font-bold leading-[1.06] text-white max-w-3xl"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
          >
            Fundos construídos com disciplina de crédito.
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: '#F7F2E6' }} className="py-16 lg:py-20">
        <div className="site-container max-w-3xl">
          <p className="text-base leading-relaxed" style={{ color: 'rgba(12,15,46,0.65)' }}>
            Cada veículo Solar possui política de investimento própria, prestadores independentes e relatórios periódicos. As estratégias são construídas a partir de originação próxima e análise individual de crédito — não de modelos de prateleira.
          </p>
        </div>
      </section>

      {/* Fund cards */}
      <section style={{ background: '#EDE6D3' }} className="py-12 lg:py-16 pb-24 lg:pb-32">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {funds.map((fund) => (
              <Link
                key={fund.slug}
                to={`/fundos/${fund.slug}`}
                className="group block border transition-all duration-200"
                style={{ background: '#F7F2E6', borderColor: 'rgba(12,15,46,0.10)' }}
              >
                <div className="p-8 flex flex-col h-full">
                  {/* Strategy label */}
                  <p className="text-xs font-semibold uppercase tracking-wider mb-6" style={{ color: '#F5A623' }}>
                    {fund.strategyLabel}
                  </p>

                  {/* Name */}
                  <h2
                    className="font-bold mb-3 leading-snug transition-colors duration-200 group-hover:text-solar-amber"
                    style={{ color: '#0C0F2E', fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)' }}
                  >
                    {fund.name}
                  </h2>

                  {/* Tagline */}
                  <p className="text-sm leading-relaxed mb-2 flex-1" style={{ color: 'rgba(12,15,46,0.6)' }}>
                    {fund.tagline}
                  </p>
                  <p className="text-xs mb-6" style={{ color: 'rgba(12,15,46,0.4)' }}>
                    PL {fund.aumShort} · {fund.publicTarget} · Condomínio {fund.condominium}
                  </p>

                  {/* Key metrics row */}
                  <div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 mt-auto border-t mb-8"
                    style={{ borderColor: 'rgba(12,15,46,0.10)' }}
                  >
                    {[
                      ['Mês', fund.returns.month],
                      ['Ano', fund.returns.year],
                      ['12M', fund.returns.twelveMonths],
                      ['Desde o início', fund.returns.sinceInception],
                    ].map(([label, value]) => (
                      <div key={label as string}>
                        <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(12,15,46,0.4)' }}>
                          {label}
                        </p>
                        <p className="text-sm font-semibold" style={{ color: '#0C0F2E' }}>
                          {value == null ? '—' : `${(value as number).toFixed(2).replace('.', ',')}%`}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(12,15,46,0.35)' }}>
                      CNPJ {fund.cnpj}
                    </p>
                    <span
                      className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 group-hover:gap-3"
                      style={{ color: '#0C0F2E' }}
                    >
                      Conheça o fundo <span style={{ color: '#F5A623' }}>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              Tem interesse em investir em algum fundo Solar?
            </h2>
            <p className="text-sm" style={{ color: 'rgba(12,15,46,0.6)' }}>
              Entre em contato para falar com um especialista.
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
    </>
  )
}
