import { SolarMark } from './SolarLogo'

/**
 * Cabeçalho de página interna — usado em Soluções para Empresas, Fundos e
 * Sobre a Solar (Tarefa 2.1). Altura fixa (--page-hero-height, ver
 * src/styles/tokens.css), nunca 100vh, igual nas três páginas. O overlay
 * escurece a foto o suficiente pra manter o texto branco acima de 4.5:1 de
 * contraste em qualquer região da imagem (ver nota de contraste abaixo).
 */
export default function PageHero({
  image,
  eyebrow,
  titleLine1,
  titleLine2,
}: {
  image: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
}) {
  return (
    <section
      className="relative overflow-hidden flex flex-col justify-end"
      style={{ height: 'var(--page-hero-height)' }}
    >
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/*
        Overlay de contraste: navy a 88% de opacidade na zona do texto (à
        esquerda), abrindo pra 35% à direita pra deixar a foto respirar sob
        a marca d'água. Pior caso (pixel branco puro da foto sob 88% de
        navy): luminância de fundo ≈ 0.105, contraste do texto branco
        ≈ 6,8:1 — acima do mínimo de 4.5:1 pedido em qualquer ponto onde
        há texto.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgb(var(--ink-rgb) / 0.88) 0%, rgb(var(--ink-rgb) / 0.88) 42%, rgb(var(--ink-rgb) / 0.6) 72%, rgb(var(--ink-rgb) / 0.38) 100%)',
        }}
      />
      {/* Símbolo "S" vazado, perceptível (não decoração quase invisível). */}
      <div
        className="absolute pointer-events-none"
        style={{ right: '2%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(220px, 26vw, 380px)', opacity: 0.22 }}
      >
        <SolarMark className="w-full h-auto" />
      </div>

      <div className="site-container relative z-10" style={{ paddingBottom: 'var(--space-8)' }}>
        <p
          className="font-semibold uppercase tracking-[0.25em] mb-3"
          style={{ color: 'var(--color-brand)', fontSize: 'var(--text-label-size)' }}
        >
          {eyebrow}
        </p>
        <div className="w-8 h-px mb-6" style={{ background: 'var(--color-brand)' }} />
        <h1
          className="font-bold text-white"
          style={{ fontSize: 'var(--text-h1-size)', lineHeight: 'var(--text-h1-leading)', maxWidth: '640px' }}
        >
          {titleLine1}
          <br />
          {titleLine2}
        </h1>
      </div>
    </section>
  )
}
