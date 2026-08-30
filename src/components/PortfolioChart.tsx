import { useState } from 'react'
import type { PortfolioCategory, AgingBucket } from '../data/funds'

function fmt1(v: number) {
  return `${v.toFixed(1).replace('.', ',')}%`
}

/** Donut interativo — passar o mouse numa fatia ou na legenda destaca as duas juntas. */
export function PortfolioDonut({ categories }: { categories: PortfolioCategory[] }) {
  const [active, setActive] = useState<number | null>(null)
  const total = categories.reduce((s, c) => s + c.value, 0) || 1
  let cumulative = 0
  const R = 60, cx = 80, cy = 80

  const segments = categories.map((cat) => {
    const pct = cat.value / total
    const startAngle = (cumulative / total) * 360 - 90
    cumulative += cat.value
    const endAngle = (cumulative / total) * 360 - 90
    const largeArc = pct > 0.5 ? 1 : 0
    const toRad = (deg: number) => (deg * Math.PI) / 180
    const x1 = cx + R * Math.cos(toRad(startAngle))
    const y1 = cy + R * Math.sin(toRad(startAngle))
    const x2 = cx + R * Math.cos(toRad(endAngle))
    const y2 = cy + R * Math.sin(toRad(endAngle))
    return { ...cat, d: `M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${largeArc} 1 ${x2},${y2} Z` }
  })

  const top = categories.reduce((a, b) => (b.value > a.value ? b : a), categories[0])
  const shown = active != null ? categories[active] : top

  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="relative flex-shrink-0" style={{ width: 160, height: 160 }}>
        <svg viewBox="0 0 160 160" className="w-40 h-40">
          {segments.map((s, i) => (
            <path
              key={i}
              d={s.d}
              fill={s.color}
              opacity={active == null || active === i ? 1 : 0.35}
              style={{ cursor: 'pointer', transition: 'opacity 0.12s ease' }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
          <circle cx={cx} cy={cy} r={R * 0.55} fill="#F7F2E6" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6">
          <span className="font-bold leading-none" style={{ color: '#0C0F2E', fontSize: '1.1rem' }}>
            {fmt1(shown.value)}
          </span>
          <span className="text-[10px] leading-tight mt-1" style={{ color: 'rgba(12,15,46,0.5)' }}>
            {shown.name}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        {categories.map((c, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors duration-150"
            style={{ background: active === i ? 'rgba(12,15,46,0.04)' : 'transparent' }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
            <span className="text-xs" style={{ color: 'rgba(12,15,46,0.65)' }}>
              {c.name} <span className="font-semibold" style={{ color: '#0C0F2E' }}>{fmt1(c.value)}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Barras de prazo de vencimento da carteira (aging). */
export function AgingBars({ buckets }: { buckets: AgingBucket[] }) {
  return (
    <div className="space-y-3">
      {buckets.map((b, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs" style={{ color: 'rgba(12,15,46,0.6)' }}>{b.label}</span>
            <span className="text-xs font-semibold" style={{ color: '#0C0F2E' }}>{fmt1(b.value)}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(12,15,46,0.08)' }}>
            <div className="h-full rounded-full" style={{ width: `${Math.min(100, b.value)}%`, background: '#0C0F2E' }} />
          </div>
        </div>
      ))}
    </div>
  )
}
