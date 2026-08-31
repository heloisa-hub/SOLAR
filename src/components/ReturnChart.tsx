import { useMemo, useRef, useState } from 'react'
import type { FundClass } from '../data/funds'

const MONTHS_SHORT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
const MONTHS_LONG = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

function shortMonth(iso: string) {
  const [y, m] = iso.split('-')
  return `${MONTHS_SHORT[Number(m) - 1]}/${y.slice(2)}`
}
function longMonth(iso: string) {
  const [y, m] = iso.split('-')
  return `${MONTHS_LONG[Number(m) - 1]} de ${y}`
}
function fmtPct(v: number | null | undefined, showSign = true) {
  if (v == null) return '—'
  const sign = showSign && v > 0 ? '+' : ''
  return `${sign}${v.toFixed(2).replace('.', ',')}%`
}

// Composição geométrica dos retornos mensais — mesma lógica do site HTML
// (acc *= 1 + r/100), não soma simples, que subestima o efeito de juros
// compostos mesmo em janelas curtas.
function computeCumulative(history: FundClass['history']) {
  let acc = 1
  return history.map((h) => {
    if (h.value == null) return { month: h.month, value: null as number | null }
    acc *= 1 + h.value / 100
    return { month: h.month, value: (acc - 1) * 100 }
  })
}

export default function ReturnChart({
  classes,
  dark = false,
}: {
  classes: FundClass[]
  dark?: boolean
}) {
  const withHistory = useMemo(() => classes.filter((c) => c.history && c.history.length > 0), [classes])
  const [selectedClass, setSelectedClass] = useState(withHistory[0]?.name ?? '')
  const [mode, setMode] = useState<'acumulado' | 'mensal'>('acumulado')
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const cls = withHistory.find((c) => c.name === selectedClass) ?? withHistory[0]

  if (!cls) {
    return <p className="text-sm" style={{ color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(12,15,46,0.45)' }}>Histórico de rentabilidade ainda insuficiente para exibir gráfico.</p>
  }

  const cumulative = computeCumulative(cls.history)
  const monthlyValues = cls.history.map((h) => h.value)
  const cumulativeValues = cumulative.map((h) => h.value)
  const data = mode === 'mensal' ? cls.history : cumulative
  const values = data.map((d) => d.value ?? 0)

  const W = 640
  const H = 220
  const pad = { l: 44, r: 16, t: 20, b: 26 }
  const plotW = W - pad.l - pad.r
  const plotH = H - pad.t - pad.b
  const singlePoint = data.length === 1

  const dataMin = Math.min(...values)
  const dataMax = Math.max(...values)
  const MIN_RANGE = 1.2
  const mid = (dataMax + dataMin) / 2
  const span = Math.max(dataMax - dataMin, MIN_RANGE)
  const min = Math.min(0, mid - span / 2)
  const max = Math.max(0, mid + span / 2)

  const toX = (i: number) => pad.l + (singlePoint ? 0.5 : i / (data.length - 1 || 1)) * plotW
  const toY = (v: number) => pad.t + (1 - (v - min) / (max - min || 1)) * plotH

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(d.value ?? 0).toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${toX(data.length - 1).toFixed(1)},${toY(min).toFixed(1)} L${toX(0).toFixed(1)},${toY(min).toFixed(1)} Z`

  const gridCount = 4
  const gridLines = Array.from({ length: gridCount + 1 }, (_, g) => {
    const v = min + (max - min) * (g / gridCount)
    return { y: toY(v), v }
  })

  const xLabelIdx: number[] = []
  if (data.length <= 6) {
    for (let i = 0; i < data.length; i++) xLabelIdx.push(i)
  } else {
    const step = Math.ceil(data.length / 5)
    for (let i = 0; i < data.length; i += step) xLabelIdx.push(i)
    if (xLabelIdx[xLabelIdx.length - 1] !== data.length - 1) xLabelIdx.push(data.length - 1)
  }

  function handleMove(evt: React.MouseEvent<SVGRectElement>) {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const scale = W / rect.width
    const svgX = (evt.clientX - rect.left) * scale
    let best = 0
    let bestDist = Infinity
    for (let i = 0; i < data.length; i++) {
      const d = Math.abs(toX(i) - svgX)
      if (d < bestDist) { bestDist = d; best = i }
    }
    setHoverIdx(best)
  }

  const gridColor = dark ? 'rgba(255,255,255,0.14)' : 'rgba(12,15,46,0.1)'
  const axisColor = dark ? 'rgba(255,255,255,0.45)' : 'rgba(12,15,46,0.35)'
  const labelColor = dark ? '#ffffff' : '#0C0F2E'

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5" style={{ background: '#F5A623' }} />
          <span className="text-xs" style={{ color: axisColor }}>
            {mode === 'mensal' ? 'Rentabilidade mensal' : 'Rentabilidade acumulada'} — {cls.name}
          </span>
        </div>
        <div className="flex gap-2">
          {(['acumulado', 'mensal'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className="px-3 py-1 text-xs font-semibold uppercase tracking-wider border rounded-full transition-colors duration-150"
              style={{
                borderColor: mode === m ? '#F5A623' : (dark ? 'rgba(255,255,255,0.2)' : 'rgba(12,15,46,0.15)'),
                background: mode === m ? 'rgba(245,166,35,0.12)' : 'transparent',
                color: mode === m ? '#F5A623' : axisColor,
              }}
            >
              {m === 'acumulado' ? 'Desde o início' : 'Mensal'}
            </button>
          ))}
        </div>
      </div>

      {withHistory.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {withHistory.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelectedClass(c.name)}
              aria-pressed={c.name === cls.name}
              className="px-3 py-1 text-xs font-semibold border rounded-full transition-colors duration-150"
              style={{
                borderColor: c.name === cls.name ? '#F5A623' : (dark ? 'rgba(255,255,255,0.2)' : 'rgba(12,15,46,0.15)'),
                background: c.name === cls.name ? 'rgba(245,166,35,0.12)' : 'transparent',
                color: c.name === cls.name ? labelColor : axisColor,
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ height: `${H}px` }}
          role="img"
          aria-label={`${mode === 'mensal' ? 'Rentabilidade mensal' : 'Rentabilidade acumulada desde o início'} da classe ${cls.name}: ${data.map((d) => `${shortMonth(d.month)} ${fmtPct(d.value)}`).join(', ')}`}
        >
          <defs>
            <linearGradient id="returnChartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5A623" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
            </linearGradient>
          </defs>

          {gridLines.map((g, i) => (
            <g key={i}>
              <line x1={pad.l} y1={g.y} x2={W - pad.r} y2={g.y} stroke={gridColor} strokeWidth={1} />
              <text x={pad.l - 8} y={g.y + 3.5} textAnchor="end" fontSize={9.5} fill={axisColor}>
                {(g.v >= 0 ? '+' : '') + g.v.toFixed(1).replace('.', ',')}%
              </text>
            </g>
          ))}

          {xLabelIdx.map((i) => (
            <text key={i} x={toX(i)} y={H - 8} textAnchor="middle" fontSize={9.5} fill={axisColor}>
              {shortMonth(data[i].month)}
            </text>
          ))}

          {!singlePoint && <path d={areaPath} fill="url(#returnChartGradient)" />}
          {!singlePoint && <path d={linePath} fill="none" stroke="#F5A623" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />}

          {data.map((d, i) => (
            <circle key={i} cx={toX(i)} cy={toY(d.value ?? 0)} r={2} fill="#F5A623" stroke={dark ? '#0C0F2E' : '#F7F2E6'} strokeWidth={1} />
          ))}

          {/* Rótulos fixos no primeiro e último ponto */}
          {values.length >= 1 && (
            <text
              x={toX(values.length - 1)}
              y={toY(values[values.length - 1]) - 9}
              textAnchor="end"
              fontSize={11}
              fontWeight={700}
              fill={labelColor}
            >
              {fmtPct(values[values.length - 1])}
            </text>
          )}
          {/* Acima do ponto (nunca abaixo) — evita colidir com o rótulo do
              eixo X, já que o primeiro ponto costuma ficar perto de 0,
              bem próximo da base do gráfico. */}
          {values.length >= 2 && (
            <text
              x={toX(0) + 4}
              y={Math.max(toY(values[0]) - 9, pad.t + 9)}
              textAnchor="start"
              fontSize={10}
              fontWeight={700}
              fill={labelColor}
            >
              {fmtPct(values[0])}
            </text>
          )}

          {/* Guia + ponto de hover */}
          {hoverIdx != null && (
            <>
              <line
                x1={toX(hoverIdx)} x2={toX(hoverIdx)}
                y1={pad.t} y2={pad.t + plotH}
                stroke={dark ? 'rgba(255,255,255,0.35)' : 'rgba(12,15,46,0.25)'}
                strokeWidth={1} strokeDasharray="3,3"
              />
              <circle cx={toX(hoverIdx)} cy={toY(data[hoverIdx].value ?? 0)} r={5} fill="#F5A623" stroke={dark ? '#0C0F2E' : '#F7F2E6'} strokeWidth={2} />
            </>
          )}

          <rect
            x={pad.l} y={0} width={Math.max(plotW, 1)} height={H}
            fill="transparent" style={{ cursor: 'crosshair' }}
            onMouseMove={handleMove}
            onMouseLeave={() => setHoverIdx(null)}
          />
        </svg>

        {hoverIdx != null && (() => {
          const idx = hoverIdx
          const cx = toX(idx)
          const leftPct = (cx / W) * 100
          const monthly = monthlyValues[idx]
          const cumul = cumulativeValues[idx]
          const primary = mode === 'mensal' ? monthly : cumul
          const secondary = mode === 'mensal' ? cumul : monthly
          const primaryLabel = mode === 'mensal' ? 'Mês' : 'Desde o início'
          const secondaryLabel = mode === 'mensal' ? 'Desde o início' : 'Mês'
          return (
            <div
              className="absolute pointer-events-none"
              style={{
                left: `${Math.min(Math.max(leftPct, 12), 88)}%`,
                top: 0,
                transform: 'translate(-50%, -100%)',
                background: dark ? '#ffffff' : '#0C0F2E',
                color: dark ? '#0C0F2E' : '#ffffff',
                borderRadius: 6,
                padding: '8px 12px',
                fontSize: 11,
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 20px rgba(7,2,34,0.25)',
              }}
            >
              <div style={{ opacity: 0.6, textTransform: 'capitalize', fontSize: 10 }}>{longMonth(data[idx].month)}</div>
              <div style={{ fontWeight: 700, color: '#F5A623', fontSize: 13 }}>{primaryLabel}: {fmtPct(primary)}</div>
              <div style={{ opacity: 0.6, fontSize: 10 }}>{secondaryLabel}: {fmtPct(secondary)}</div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
