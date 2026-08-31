import { Link } from 'react-router'
import { SolarMark } from './SolarLogo'

type CTAButton = {
  label: string
  to: string
}

/**
 * Faixa de chamada amarela antes do rodapé (Tarefa 2.2). Layout e altura
 * fixos e idênticos em toda página que a usa — só título, texto de apoio e
 * destino dos botões mudam. Botão primário sempre sólido, secundário
 * (opcional) sempre vazado — nunca o contrário.
 */
export default function CTABand({
  title,
  body,
  primaryButton,
  secondaryButton,
}: {
  title: string
  body?: string
  primaryButton: CTAButton
  secondaryButton?: CTAButton
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--color-brand)', paddingTop: 'var(--cta-band-py)', paddingBottom: 'var(--cta-band-py)' }}
    >
      <div
        className="absolute pointer-events-none"
        style={{ right: '-2%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(240px, 30vw, 440px)', opacity: 0.35 }}
      >
        <SolarMark variant="navy" className="w-full h-auto" />
      </div>
      <div className="site-container relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div>
          <h2
            className="font-bold mb-2"
            style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em' }}
          >
            {title}
          </h2>
          {body && (
            <p className="text-base font-light" style={{ color: 'rgb(var(--ink-rgb) / 0.65)' }}>
              {body}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-4 flex-shrink-0">
          <Link
            to={primaryButton.to}
            className="inline-flex items-center px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded transition-all duration-200 hover:opacity-90"
            style={{ background: 'var(--color-text-on-light)', color: 'var(--color-brand)' }}
          >
            {primaryButton.label}
          </Link>
          {secondaryButton && (
            <Link
              to={secondaryButton.to}
              className="inline-flex items-center px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded border-2 transition-all duration-200 hover:bg-solar-navy hover:text-white"
              style={{ borderColor: 'var(--color-text-on-light)', color: 'var(--color-text-on-light)' }}
            >
              {secondaryButton.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
