import { useState } from 'react'
import type { PortfolioCategory, AgingBucket } from '../data/funds'

function fmt1(v: number) {
  return `${v.toFixed(1).replace('.', ',')}%`
}

/** Donut interativo — passar o mouse numa fatia ou na legenda destaca as duas juntas. */
export function PortfolioDonut({ categories }: { categories: PortfolioCategory[] }) {
  const [active, setActive] = useState<number | null>(null)

  const rawTotal = categories.reduce((s, c) => s + c.value, 0)

  if (categories.length === 0 || rawTotal <= 0) {
    return (
      <p className="text-sm" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
        Composição da carteira não disponível para este fundo.
      </p>
    )
  }

  const total = rawTotal
  let cumulative = 0
  const R = 60, cx = 80, cy = 80

  const segments = categories.map((cat) => {
    const pct = cat.value / total
    const startAngle = (cumulative / total) * 360 - 90
    cumulative += cat.value
    const endAngle = (cumulative / total) * 360 - 90
    // Uma fatia que soma ~100% do total tem início e fim no mesmo ponto do
    // círculo — o arco SVG (M→L→A→Z) degenera e não desenha nada nesse
    // caso. Desenhamos um círculo cheio em vez do arco quando isso acontece.
    const isFullCircle = pct >= 0.9999
    const largeArc = pct > 0.5 ? 1 : 0
    const toRad = (deg: number) => (deg * Math.PI) / 180
    const x1 = cx + R * Math.cos(toRad(startAngle))
    const y1 = cy + R * Math.sin(toRad(startAngle))
    const x2 = cx + R * Math.cos(toRad(endAngle))
    const y2 = cy + R * Math.sin(toRad(endAngle))
    return {
      ...cat,
      isFullCircle,
      d: isFullCircle ? '' : `M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${largeArc} 1 ${x2},${y2} Z`,
    }
  })

  const top = categories.reduce((a, b) => (b.value > a.value ? b : a), categories[0])
  const shown = active != null ? categories[active] : top

  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="relative flex-shrink-0" style={{ width: 160, height: 160 }}>
        <svg viewBox="0 0 160 160" className="w-40 h-40">
          {segments.map((s, i) =>
            s.isFullCircle ? (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={R}
                fill={s.color}
                opacity={active == null || active === i ? 1 : 0.35}
                style={{ cursor: 'pointer', transition: 'opacity 0.12s ease' }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              />
            ) : (
              <path
                key={i}
                d={s.d}
                fill={s.color}
                opacity={active == null || active === i ? 1 : 0.35}
                style={{ cursor: 'pointer', transition: 'opacity 0.12s ease' }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              />
            )
          )}
          <circle cx={cx} cy={cy} r={R * 0.55} fill="var(--color-surface-offwhite)" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">
          <span className="font-bold leading-none" style={{ color: 'var(--color-text-on-light)', fontSize: '1.1rem' }}>
            {fmt1(shown.value)}
          </span>
          <span className="leading-tight mt-1" style={{ color: 'rgb(var(--ink-rgb) / 0.5)', fontSize: 'var(--text-label-size)' }}>
            {shown.name}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        {categories.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors duration-150"
            style={{ background: active === i ? 'rgb(var(--ink-rgb) / 0.04)' : 'transparent' }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
            <span className="text-xs" style={{ color: 'rgb(var(--ink-rgb) / 0.65)' }}>
              {c.name} <span className="font-semibold" style={{ color: 'var(--color-text-on-light)' }}>{fmt1(c.value)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Barras verticais de prazo de vencimento da carteira (aging). */
export function AgingBars({ buckets, height = 260 }: { buckets: AgingBucket[]; height?: number }) {
  if (buckets.length === 0) return null
  const max = Math.max(...buckets.map((b) => b.value), 1)
  const barArea = height - 60

  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {buckets.map((b, i) => (
        <div key={i} className="flex-1 h-full flex flex-col items-center justify-end min-w-0">
          <span className="font-semibold mb-1.5 whitespace-nowrap" style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-label-size)' }}>
            {fmt1(b.value)}
          </span>
          <div
            className="w-full rounded-t-sm transition-all duration-300"
            style={{ height: Math.max((b.value / max) * barArea, 2), background: 'var(--color-brand)' }}
          />
          <span
            className="leading-tight text-center mt-2"
            style={{ color: 'rgb(var(--ink-rgb) / 0.55)', fontSize: 'var(--text-label-size)' }}
          >
            {b.label}
          </span>
        </div>
      ))}
    </div>
  )
}
