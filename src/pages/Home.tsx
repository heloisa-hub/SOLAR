import { Link } from 'react-router'
import { SolarMark } from '../components/SolarLogo'
import CTABand from '../components/CTABand'
import { useEffect, useRef, useState } from 'react'
import { funds } from '../data/funds'
import usePageTitle from '../hooks/usePageTitle'
import { withBase } from '../lib/assetUrl'
import { ShieldCheck, Handshake, Eye, Layers } from 'lucide-react'

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// Números institucionais da casa (todos os veículos, não só os 4 FIDCs
// públicos listados no site — mesma fonte usada no Brand Book e no Figma).
const kpis = [
  { value: 'R$ 850mi', label: 'Patrimônio sob gestão' },
  { value: '8', label: 'FIDCs em operação' },
  { value: '8 anos', label: 'De atuação' },
  { value: '85', label: 'Cedentes ativos' },
  { value: '4.500', label: 'Sacados ativos' },
]

const fidcBenefits = [
  {
    title: 'Segregação patrimonial',
    body: 'O patrimônio do fundo não se confunde com o da empresa originadora.',
  },
  {
    title: 'Governança própria',
    body: 'Administrador fiduciário, custodiante e auditoria independentes.',
  },
  {
    title: 'Funding recorrente',
    body: 'Uma fonte de capital que escala junto com a originação.',
  },
  {
    title: 'Política de crédito',
    body: 'Critérios de elegibilidade e limites de concentração formalizados.',
  },
  {
    title: 'Acesso a investidores',
    body: 'Captação direta no mercado, sem intermediário bancário.',
  },
  {
    title: 'Monitoramento contínuo',
    body: 'Carteira acompanhada mês a mês, com data-base publicada.',
  },
]

const nossaAtuacao = [
  { icon: ShieldCheck, title: 'Disciplina de crédito', body: 'Análise individual de recebíveis, garantias e capacidade de pagamento em cada operação.' },
  { icon: Handshake, title: 'Alinhamento de interesses', body: 'A Solar estrutura e acompanha o mesmo veículo em que o investidor está exposto.' },
  { icon: Eye, title: 'Transparência radical', body: 'Custódia independente, rating de agência e data-base publicados em cada fundo.' },
  { icon: Layers, title: 'Estruturação proprietária', body: 'Veículos desenhados a partir do negócio real, não de um modelo de prateleira.' },
]

const teseOperacao = [
  { n: '01', title: 'Originação', body: 'Identificação de empresas, ativos e oportunidades de crédito. Entendimento da dinâmica operacional e financeira.' },
  { n: '02', title: 'Análise', body: 'Avaliação financeira, operacional e das fontes de pagamento. Análise individual de recebíveis, garantias e concentração.' },
  { n: '03', title: 'Estruturação', body: 'Instrumento, prazo, garantias, covenants e mecanismos de proteção definidos a partir do negócio — não de um modelo genérico.' },
  { n: '04', title: 'Funding', body: 'Conexão da operação às fontes de capital compatíveis. Investidores selecionados com base na estratégia do fundo.' },
  { n: '05', title: 'Gestão', body: 'Monitoramento contínuo da carteira, das garantias e do desempenho. Relatórios, assembleias e acompanhamento de covenants.' },
]

export default function Home() {
  usePageTitle('Crédito Estruturado para a Economia Real')
  const { ref: kpiRef, inView: kpiInView } = useInView(0.2)

  return (
    <>
      {/* ── Hero (video + slogan + KPI strip, tudo na primeira tela) ── */}
      <section className="relative overflow-hidden flex flex-col" style={{ minHeight: '100svh' }}>
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.48)' }}
        >
          <source src={withBase('/video/hero-solar-web.mp4')} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgb(var(--ink-rgb) / 0.92) 0%, rgb(var(--ink-rgb) / 0.65) 30%, rgb(var(--ink-rgb) / 0.35) 46%, rgb(var(--ink-rgb) / 0.08) 62%, rgb(var(--ink-rgb) / 0.05) 100%)' }}
        />
        <div
          className="absolute pointer-events-none"
          style={{ right: '-3%', bottom: '2%', width: 'clamp(360px, 52vw, 820px)', opacity: 0.07 }}
        >
          <SolarMark className="w-full h-full" />
        </div>

        {/* Bloco de texto ocupa o espaço flexível entre o header e a
            faixa de KPIs, que fica sempre ancorada no fim do flex — assim
            os indicadores nunca ficam "empurrados" pra fora da primeira
            tela em telas mais baixas (o padding-bottom fixo antigo não
            escalava com a altura real do viewport). */}
        <div
          className="relative z-10 site-container flex flex-col justify-center flex-1"
          style={{ paddingTop: '124px', paddingBottom: '2.5rem' }}
        >
          <div style={{ maxWidth: 'clamp(500px, 46vw, 820px)' }}>
            <p className="font-semibold uppercase tracking-[0.3em] mb-5" style={{ color: 'var(--color-brand)', fontSize: 'var(--text-label-size)' }}>
              Solar Capital
            </p>
            <h1
              className="font-bold leading-[1.1] mb-6 text-white"
              style={{ fontSize: 'var(--text-display-size)', lineHeight: 'var(--text-display-leading)', letterSpacing: '-0.02em' }}
            >
              Crédito estruturado
              <br />
              <span style={{ color: 'var(--color-brand)' }}>para a economia real.</span>
            </h1>
            <p
              className="mb-10 font-light leading-relaxed"
              style={{ color: 'rgb(var(--paper-rgb) / 0.65)', fontSize: 'var(--text-body-size)', lineHeight: 'var(--text-body-leading)', maxWidth: '520px' }}
            >
              Originamos, estruturamos e gerimos operações de crédito desenvolvidas a partir das necessidades reais de empresas e investidores.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/solucoes"
                className="inline-flex items-center px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded transition-all duration-200 hover:opacity-90"
                style={{ background: 'var(--color-brand)', color: 'var(--color-text-on-light)' }}
              >
                Soluções para Empresas
              </Link>
              <Link
                to="/fundos"
                className="inline-flex items-center px-8 py-4 text-sm font-semibold uppercase tracking-widest border rounded transition-all duration-200 hover:bg-white/10"
                style={{ borderColor: 'rgb(var(--paper-rgb) / 0.4)', color: 'var(--color-text-on-dark)' }}
              >
                Nossos Fundos
              </Link>
            </div>
          </div>
        </div>

        {/* KPI strip — sobreposta ao rodapé do vídeo: começa transparente
            (vídeo visível sob a mesma máscara azul-marinho do hero) e vira
            cor sólida bem atrás dos números, pra garantir legibilidade. */}
        <div
          ref={kpiRef}
          className="relative z-10"
          style={{ background: 'linear-gradient(to bottom, rgb(var(--ink-rgb) / 0) 0%, rgb(var(--ink-rgb) / 0.55) 60%, var(--color-surface-dark) 82%)' }}
        >
          <div
            className="overflow-x-auto"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
            }}
          >
            <div className="flex min-w-max site-container" style={{ paddingTop: '3rem', paddingBottom: '2.25rem' }}>
              {kpis.map((k, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center flex-1 min-w-[128px]"
                  style={{
                    padding: '0 1.25rem',
                    opacity: kpiInView ? 1 : 0,
                    transform: kpiInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                  }}
                >
                  <span
                    className="font-bold leading-none mb-2 text-center"
                    style={{
                      color: 'var(--color-brand)',
                      fontSize: 'clamp(1.2rem, 2.1vw, 1.9rem)',
                      whiteSpace: 'nowrap',
                      textShadow: kpiInView ? '0 0 48px rgb(var(--brand-rgb) / 0.45)' : 'none',
                      transition: `text-shadow 1s ease ${i * 0.1 + 0.4}s`,
                    }}
                  >
                    {k.value}
                  </span>
                  <span
                    className="text-xs font-medium uppercase tracking-widest whitespace-nowrap text-center"
                    style={{ color: 'rgb(var(--paper-rgb) / 0.4)' }}
                  >
                    {k.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifesto: O que nos move + O que a estrutura entrega ── */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="py-20 lg:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <div className="flex flex-col h-full">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: 'rgb(var(--ink-rgb) / 0.55)' }}>
                  O que nos move
                </p>
                <h2
                  className="font-bold leading-[1.1] mb-8"
                  style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em' }}
                >
                  Capital não resolve nada sozinho.
                  <br />
                  Estrutura resolve.
                </h2>
                <div className="space-y-5 mb-10">
                  <p className="text-base leading-loose" style={{ color: 'rgb(var(--ink-rgb) / 0.7)' }}>
                    Toda empresa tem uma dinâmica própria de caixa, de ativos e de risco. Por isso não partimos de um produto de prateleira: partimos do negócio que existe por trás da operação.
                  </p>
                  <p className="text-base leading-loose" style={{ color: 'rgb(var(--ink-rgb) / 0.7)' }}>
                    Estruturamos crédito para que boas empresas continuem crescendo — e para que o investidor acesse a economia real com disciplina, garantia e governança.
                  </p>
                </div>
              </div>
              <Link
                to="/sobre"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest rounded-full px-6 py-3 transition-all duration-200 hover:opacity-80 self-start mt-auto"
                style={{ background: 'var(--color-text-on-light)', color: 'var(--color-brand)' }}
              >
                Conheça a Solar <span>→</span>
              </Link>
            </div>

            <div className="h-full flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: 'rgb(var(--ink-rgb) / 0.55)' }}>
                O que a estrutura entrega
              </p>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 auto-rows-fr gap-px" style={{ background: 'rgb(var(--ink-rgb) / 0.10)' }}>
                {fidcBenefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-5 flex flex-col justify-center border-t-2"
                    style={{ background: 'var(--color-surface-cream)', borderColor: 'var(--color-brand)' }}
                  >
                    <h3 className="font-semibold text-sm leading-snug mb-1.5" style={{ color: 'var(--color-text-on-light)' }}>
                      {b.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.6)' }}>
                      {b.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nossa Atuação (diferenciais + timeline vertical) ── */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="py-24 lg:py-28">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-6 lg:mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
                Nossa Atuação
              </p>
              <div className="w-8 h-px mb-8" style={{ background: 'var(--color-brand)' }} />
              <h2
                className="font-bold leading-[1.1]"
                style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em', maxWidth: '600px' }}
              >
                Cada operação começa pelo entendimento do negócio.
              </h2>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--color-brand)' }}>
              Processo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* 4 cards escuros — altura conforme o conteúdo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nossaAtuacao.map((v, i) => (
                <div
                  key={i}
                  className="group p-6 flex flex-col gap-4 border transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: 'var(--color-text-on-light)', borderColor: 'rgb(var(--paper-rgb) / 0.08)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-brand)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgb(var(--paper-rgb) / 0.08)')}
                >
                  <v.icon size={24} strokeWidth={1.5} style={{ color: 'var(--color-brand)' }} />
                  <div>
                    <h3
                      className="font-semibold mb-2 text-white"
                      style={{ fontSize: 'var(--text-h3-size)', lineHeight: 'var(--text-h3-leading)' }}
                    >
                      {v.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: 'rgb(var(--paper-rgb) / 0.55)' }}>
                      {v.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline vertical */}
            <div>
              <div className="relative pl-6">
                <div
                  className="absolute top-1 bottom-1 w-px"
                  style={{ left: '4px', background: 'rgb(var(--brand-rgb) / 0.3)' }}
                />
                <div className="space-y-8">
                  {teseOperacao.map((p, i) => (
                    <div key={i} className="relative">
                      <span
                        className="absolute rounded-full"
                        style={{ left: '-24px', top: '5px', width: 9, height: 9, background: 'var(--color-brand)' }}
                      />
                      <span className="text-xs font-bold mr-2" style={{ color: 'var(--color-brand)' }}>
                        {p.n}
                      </span>
                      <h3 className="font-bold text-sm inline" style={{ color: 'var(--color-text-on-light)' }}>
                        {p.title}
                      </h3>
                      <p className="text-xs leading-relaxed mt-1" style={{ color: 'rgb(var(--ink-rgb) / 0.55)' }}>
                        {p.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <p
                className="text-sm leading-relaxed mt-10 pt-6 border-t"
                style={{ color: 'rgb(var(--ink-rgb) / 0.5)', borderColor: 'rgb(var(--ink-rgb) / 0.1)' }}
              >
                A mesma disciplina se aplica a uma operação isolada e à gestão contínua de um fundo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Track record (painel de texto + foto sangrada) ── */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="flex flex-col justify-center py-16 lg:py-24"
          style={{ paddingLeft: 'clamp(1.5rem, 5vw, 8rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
            Sobre a Solar
          </p>
          <div className="w-8 h-px mb-10" style={{ background: 'var(--color-brand)' }} />
          <h2
            className="font-bold leading-[1.06] mb-6"
            style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em', maxWidth: '560px' }}
          >
            Experiência em crédito.
            <br />
            Visão de longo prazo.
          </h2>
          <p className="text-base leading-loose mb-8 font-light" style={{ color: 'rgb(var(--ink-rgb) / 0.65)', maxWidth: '560px' }}>
            Desde 2018, desenvolvemos soluções de crédito para empresas e gerimos veículos de investimento ligados à economia real.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 pt-8 border-t" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.1)', maxWidth: '560px' }}>
            {[
              { value: 'R$ 7,4bi', label: 'Operado desde 2018' },
              { value: 'R$ 6,2bi', label: 'Liquidados' },
              { value: 'R$ 55mi', label: 'Capital próprio' },
            ].map(({ value, label }) => (
              <div key={label}>
                <span
                  className="block font-bold leading-none mb-1.5"
                  style={{ color: 'var(--color-brand)', fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)' }}
                >
                  {value}
                </span>
                <span className="text-xs uppercase tracking-wider" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest self-start transition-opacity hover:opacity-60 py-3 -my-3"
            style={{ color: 'var(--color-text-on-light)' }}
          >
            Conheça a Solar <span style={{ color: 'var(--color-brand)' }}>→</span>
          </Link>
        </div>
        <div style={{ minHeight: 'clamp(220px, 40vw, 340px)' }}>
          <img
            src={withBase('/img/sobre-solar-ceu.jpg')}
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
        </div>
      </section>

      {/* ── Fundos em destaque ── */}
      <section style={{ background: 'var(--color-surface-cream)' }} className="py-24 lg:py-32">
        <div className="site-container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
                Fundos
              </p>
              <h2
                className="font-bold leading-[1.06] mb-2"
                style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em' }}
              >
                Estratégias de crédito estruturado
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.55)', maxWidth: '480px' }}>
                Gerimos FIDCs com estratégias construídas a partir de direitos creditórios, com acompanhamento contínuo da carteira e dos indicadores de risco.
              </p>
            </div>
            <Link
              to="/fundos"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest flex-shrink-0 transition-opacity hover:opacity-60 py-3 -my-3"
              style={{ color: 'var(--color-text-on-light)' }}
            >
              Ver todos os fundos <span style={{ color: 'var(--color-brand)' }}>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {funds.map((f, i) => (
              <Link
                key={i}
                to={`/fundos/${f.slug}`}
                className="group flex flex-col border transition-all duration-200 hover:border-solar-amber"
                style={{ background: 'var(--color-surface-offwhite)', borderColor: 'rgb(var(--ink-rgb) / 0.10)' }}
              >
                <div className="p-6 flex flex-col justify-between" style={{ minHeight: '190px' }}>
                  <div>
                    <p
                      className="font-bold uppercase tracking-widest mb-3"
                      style={{ color: 'var(--color-brand)', fontSize: 'var(--text-label-size)' }}
                    >
                      {f.strategyLabel}
                    </p>
                    <h3 className="font-semibold text-sm leading-snug" style={{ color: 'var(--color-text-on-light)' }}>{f.name}</h3>
                  </div>
                  <div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-5 mt-5 border-t"
                    style={{ borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}
                  >
                    {[
                      ['Em operação desde', f.startDate.match(/\d{4}/)?.[0] ?? f.startDate],
                      ['Rent. LTM', f.returns.twelveMonths == null ? '—' : `${f.returns.twelveMonths.toFixed(2).replace('.', ',')}%`],
                      ['PL', f.aumShort],
                      ['Retorno-alvo', f.targetReturn],
                    ].map(([label, value]) => (
                      <div key={label as string}>
                        <p
                          className="font-semibold uppercase tracking-wider mb-1.5"
                          style={{ color: 'rgb(var(--ink-rgb) / 0.35)', fontSize: 'var(--text-label-size)' }}
                        >
                          {label}
                        </p>
                        <p
                          className="font-bold leading-snug whitespace-nowrap"
                          style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h3-size)' }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Pronto para estruturar sua próxima operação?"
        body="Fale com a Solar. Entendemos o negócio antes de propor uma estrutura."
        primaryButton={{ label: 'Fale com a Solar', to: '/contato' }}
        secondaryButton={{ label: 'Ver Fundos', to: '/fundos' }}
      />
    </>
  )
}
