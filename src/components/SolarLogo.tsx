/**
 * Logo assets — arquivos oficiais do Brand Book v3 (4. Site/marca/logos/,
 * 2026-08-13), não aproximações. Ver 4. Site/marca/redes-sociais/
 * Galeria-de-Logos_2026-08-28.png para a referência de uso correta:
 * símbolo dourado ou navy (nunca navy sobre fundo dourado), lockup
 * empilhado com símbolo dourado + texto navy (fundo claro) ou branco
 * (fundo escuro).
 */

import { withBase } from '../lib/assetUrl'

const SIMBOLO_GOLD = withBase('/logo/simbolo-gold.png')
const SIMBOLO_WHITE = withBase('/logo/simbolo-white.png')
const SIMBOLO_NAVY = withBase('/logo/simbolo-navy.png')
const EMPILHADO_NAVY = withBase('/logo/empilhado-navy.png')
const EMPILHADO_BRANCO = withBase('/logo/empilhado-branco.png')

/** Logo completo empilhado (símbolo dourado + SOLAR / CAPITAL) — usado no header e no footer. */
export function SolarLogoFull({
  variant = 'white',
  className = '',
  alt = 'Solar Capital',
}: {
  variant?: 'white' | 'navy'
  className?: string
  alt?: string
}) {
  const src = variant === 'navy' ? EMPILHADO_NAVY : EMPILHADO_BRANCO
  return <img src={src} alt={alt} className={className} style={{ objectFit: 'contain' }} />
}

/**
 * Lockup compacto pra UI (cabeçalho): símbolo em imagem + "SOLAR CAPITAL"
 * escrito de verdade em Montserrat (não a imagem com o texto embutido) —
 * assim dá pra controlar cor/tamanho livremente e manter nítido em
 * qualquer tela. Sempre empilhado (símbolo em cima, texto embaixo).
 */
type SolarColorVariant = 'brand' | 'white' | 'navy'

const VARIANT_TEXT_COLOR: Record<SolarColorVariant, string> = {
  brand: 'var(--color-brand)',
  white: 'var(--color-text-on-dark)',
  navy: 'var(--color-text-on-light)',
}

export function SolarWordmark({
  symbolVariant = 'brand',
  textVariant = 'white',
  size = 'md',
  align = 'center',
  className = '',
}: {
  symbolVariant?: SolarColorVariant
  textVariant?: SolarColorVariant
  size?: 'sm' | 'md'
  align?: 'center' | 'start'
  className?: string
}) {
  const symbolSrc = symbolVariant === 'white' ? SIMBOLO_WHITE : symbolVariant === 'navy' ? SIMBOLO_NAVY : SIMBOLO_GOLD
  const textColor = VARIANT_TEXT_COLOR[textVariant]
  const symbolHeight = size === 'sm' ? 26 : 32
  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-center' : 'items-start'} ${className}`}>
      <img src={symbolSrc} alt="" aria-hidden style={{ height: symbolHeight, width: 'auto', marginBottom: 5, objectFit: 'contain' }} />
      <span
        className="font-bold uppercase leading-none"
        style={{ color: textColor, fontSize: size === 'sm' ? 14 : 16, letterSpacing: '0.04em' }}
      >
        Solar
      </span>
      <span
        className="font-medium uppercase leading-none"
        style={{ color: textColor, opacity: 0.7, fontSize: size === 'sm' ? 8 : 9, letterSpacing: '0.3em', marginTop: 3 }}
      >
        Capital
      </span>
    </div>
  )
}

/**
 * Marca d'água decorativa — símbolo em grande escala, opacidade controlada
 * pelo pai. Nunca navy sobre fundo dourado (regra explícita do Brand Book:
 * "Baixo contraste — evitar") — nesse caso usa branco.
 */
export function SolarMark({
  variant = 'brand',
  className = '',
}: {
  variant?: SolarColorVariant
  className?: string
}) {
  // Navy pedido sobre fundo dourado vira branco — regra do Brand Book.
  const src = variant === 'brand' ? SIMBOLO_GOLD : SIMBOLO_WHITE
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={className}
      style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain' }}
    />
  )
}
