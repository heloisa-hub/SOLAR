import { Link } from 'react-router'
import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import { funds } from '../data/funds'
import usePageTitle from '../hooks/usePageTitle'
import { withBase } from '../lib/assetUrl'

export default function Fundos() {
  usePageTitle('Fundos')
  return (
    <>
      <PageHero
        image={withBase('/img/page-hero-sol.jpg')}
        eyebrow="Estratégias"
        titleLine1="Fundos construídos com"
        titleLine2="disciplina de crédito."
      />

      {/* Intro */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="py-16 lg:py-20">
        <div className="site-container max-w-3xl">
          <p className="text-base leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.65)' }}>
            Cada veículo Solar possui política de investimento própria, prestadores independentes e relatórios periódicos. As estratégias são construídas a partir de originação próxima e análise individual de crédito — não de modelos de prateleira.
          </p>
        </div>
      </section>

      {/* Fund cards */}
      <section style={{ background: 'var(--color-surface-cream)' }} className="py-12 lg:py-16 pb-24 lg:pb-32">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {funds.map((fund) => (
              <Link
                key={fund.slug}
                to={`/fundos/${fund.slug}`}
                className="group block border transition-all duration-200"
                style={{ background: 'var(--color-surface-offwhite)', borderColor: 'rgb(var(--ink-rgb) / 0.10)' }}
              >
                <div className="p-8 flex flex-col h-full">
                  {/* Strategy label */}
                  <p className="font-semibold uppercase tracking-wider mb-6" style={{ color: 'var(--color-brand)', fontSize: 'var(--text-label-size)' }}>
                    {fund.strategyLabel}
                  </p>

                  {/* Name */}
                  <h2
                    className="font-bold mb-3 leading-snug transition-colors duration-200 group-hover:text-solar-amber"
                    style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h3-size)' }}
                  >
                    {fund.name}
                  </h2>

                  {/* Tagline */}
                  <p className="text-base font-medium leading-relaxed mb-3 flex-1" style={{ color: 'rgb(var(--ink-rgb) / 0.75)' }}>
                    {fund.tagline}
                  </p>
                  <p className="text-xs mb-6" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>
                    PL {fund.aumShort} · {fund.publicTarget} · Condomínio {fund.condominium}
                  </p>

                  {/* Key metrics row */}
                  <div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 mt-auto border-t mb-8"
                    style={{ borderColor: 'rgb(var(--ink-rgb) / 0.10)' }}
                  >
                    {[
                      ['Mês', fund.returns.month],
                      ['Ano', fund.returns.year],
                      ['12M', fund.returns.twelveMonths],
                      ['Desde o início', fund.returns.sinceInception],
                    ].map(([label, value]) => (
                      <div key={label as string}>
                        <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>
                          {label}
                        </p>
                        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-on-light)' }}>
                          {value == null ? '—' : `${(value as number).toFixed(2).replace('.', ',')}%`}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgb(var(--ink-rgb) / 0.35)' }}>
                      CNPJ {fund.cnpj}
                    </p>
                    <span
                      className="text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 group-hover:gap-3"
                      style={{ color: 'var(--color-text-on-light)' }}
                    >
                      Conheça o fundo <span style={{ color: 'var(--color-brand)' }}>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Tem interesse em investir em algum fundo Solar?"
        body="Entre em contato para falar com um especialista."
        primaryButton={{ label: 'Fale com a Solar', to: '/contato' }}
      />
    </>
  )
}
