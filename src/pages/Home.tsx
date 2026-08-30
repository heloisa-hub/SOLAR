import { Link } from 'react-router'
import { SolarMark } from '../components/SolarLogo'
import { useEffect, useRef, useState } from 'react'
import { funds } from '../data/funds'
import usePageTitle from '../hooks/usePageTitle'

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
  { title: 'Disciplina de crédito', body: 'Análise individual de recebíveis, garantias e capacidade de pagamento em cada operação.' },
  { title: 'Alinhamento de interesses', body: 'A Solar estrutura e acompanha o mesmo veículo em que o investidor está exposto.' },
  { title: 'Transparência radical', body: 'Custódia independente, rating de agência e data-base publicados em cada fundo.' },
  { title: 'Estruturação proprietária', body: 'Veículos desenhados a partir do negócio real, não de um modelo de prateleira.' },
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
      <section className="relative overflow-hidden" style={{ minHeight: '100svh' }}>
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.48)' }}
        >
          <source src="/video/hero-solar-web.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(12,15,46,0.92) 0%, rgba(12,15,46,0.55) 60%, rgba(12,15,46,0.15) 100%)' }}
        />
        <div
          className="absolute pointer-events-none"
          style={{ right: '-3%', bottom: '2%', width: 'clamp(360px, 52vw, 820px)', opacity: 0.07 }}
        >
          <SolarMark color="#F5A623" className="w-full h-full" />
        </div>

        <div
          className="relative z-10 site-container flex flex-col justify-center"
          style={{ minHeight: '100svh', paddingTop: '124px', paddingBottom: '15.5rem' }}
        >
          <div style={{ maxWidth: 'clamp(500px, 66vw, 720px)' }}>
            <p className="font-semibold uppercase tracking-[0.3em] mb-5" style={{ color: '#F5A623', fontSize: '11px' }}>
              Solar Capital
            </p>
            <h1
              className="font-bold leading-[1.1] mb-6 text-white"
              style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3.4rem)', letterSpacing: '-0.02em' }}
            >
              Crédito estruturado
              <br />
              <span style={{ color: '#F5A623' }}>para a economia real.</span>
            </h1>
            <p
              className="mb-10 font-light leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', maxWidth: '520px' }}
            >
              Originamos, estruturamos e gerimos operações de crédito desenvolvidas a partir das necessidades reais de empresas e investidores.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/solucoes"
                className="inline-flex items-center px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded transition-all duration-200 hover:opacity-90"
                style={{ background: '#F5A623', color: '#0C0F2E' }}
              >
                Soluções para Empresas
              </Link>
              <Link
                to="/fundos"
                className="inline-flex items-center px-8 py-4 text-sm font-semibold uppercase tracking-widest border rounded transition-all duration-200 hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff' }}
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
          className="absolute left-0 right-0 bottom-0 z-10"
          style={{ background: 'linear-gradient(to bottom, rgba(12,15,46,0) 0%, rgba(12,15,46,0.55) 60%, #0C0F2E 82%)' }}
        >
          <div className="overflow-x-auto">
            <div className="flex min-w-max site-container" style={{ paddingTop: '7rem', paddingBottom: '2.25rem' }}>
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
                      color: '#F5A623',
                      fontSize: 'clamp(1.2rem, 2.1vw, 1.9rem)',
                      whiteSpace: 'nowrap',
                      textShadow: kpiInView ? '0 0 48px rgba(245,166,35,0.45)' : 'none',
                      transition: `text-shadow 1s ease ${i * 0.1 + 0.4}s`,
                    }}
                  >
                    {k.value}
                  </span>
                  <span
                    className="text-xs font-medium uppercase tracking-widest whitespace-nowrap text-center"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
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
      <section style={{ background: '#F5A623' }} className="py-20 lg:py-24">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: 'rgba(12,15,46,0.55)' }}>
                O que nos move
              </p>
              <h2
                className="font-bold leading-[1.1] mb-8"
                style={{ color: '#0C0F2E', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.02em' }}
              >
                Capital não resolve nada sozinho.
                <br />
                Estrutura resolve.
              </h2>
              <div className="space-y-5 mb-10">
                <p className="text-base leading-loose" style={{ color: 'rgba(12,15,46,0.7)' }}>
                  Toda empresa tem uma dinâmica própria de caixa, de ativos e de risco. Por isso não partimos de um produto de prateleira: partimos do negócio que existe por trás da operação.
                </p>
                <p className="text-base leading-loose" style={{ color: 'rgba(12,15,46,0.7)' }}>
                  Estruturamos crédito para que boas empresas continuem crescendo — e para que o investidor acesse a economia real com disciplina, garantia e governança.
                </p>
              </div>
              <Link
                to="/sobre"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest rounded-full px-6 py-3 transition-all duration-200 hover:opacity-80"
                style={{ background: '#0C0F2E', color: '#F5A623' }}
              >
                Conheça a Solar <span>→</span>
              </Link>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(12,15,46,0.55)' }}>
                O que a estrutura entrega
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: 'rgba(12,15,46,0.12)' }}>
                {fidcBenefits.map((b, i) => (
                  <div key={i} className="p-5" style={{ background: '#F5A623' }}>
                    <h3 className="font-semibold text-sm leading-snug mb-1.5" style={{ color: '#0C0F2E' }}>
                      {b.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(12,15,46,0.6)' }}>
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
      <section style={{ background: '#F7F2E6' }} className="py-24 lg:py-28">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: '#F5A623' }}>
            Nossa Atuação
          </p>
          <div className="w-8 h-px mb-8" style={{ background: '#F5A623' }} />
          <h2
            className="font-bold leading-[1.1] mb-16"
            style={{ color: '#0C0F2E', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', letterSpacing: '-0.02em', maxWidth: '600px' }}
          >
            Cada operação começa pelo entendimento do negócio.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* 4 cards escuros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nossaAtuacao.map((v, i) => (
                <div key={i} className="p-6" style={{ background: '#0C0F2E' }}>
                  <h3 className="font-semibold text-sm leading-snug mb-2 text-white">{v.title}</h3>
                  <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {v.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Timeline vertical */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-8" style={{ color: '#F5A623' }}>
                Processo
              </p>
              <div className="relative pl-6">
                <div
                  className="absolute top-1 bottom-1 w-px"
                  style={{ left: '4px', background: 'rgba(245,166,35,0.3)' }}
                />
                <div className="space-y-8">
                  {teseOperacao.map((p, i) => (
                    <div key={i} className="relative">
                      <span
                        className="absolute rounded-full"
                        style={{ left: '-27px', top: '5px', width: 9, height: 9, background: '#F5A623' }}
                      />
                      <span className="text-xs font-bold mr-2" style={{ color: '#F5A623' }}>
                        {p.n}
                      </span>
                      <h3 className="font-bold text-sm inline" style={{ color: '#0C0F2E' }}>
                        {p.title}
                      </h3>
                      <p className="text-xs leading-relaxed mt-1" style={{ color: 'rgba(12,15,46,0.55)' }}>
                        {p.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <p
                className="text-sm leading-relaxed mt-10 pt-6 border-t"
                style={{ color: 'rgba(12,15,46,0.5)', borderColor: 'rgba(12,15,46,0.1)' }}
              >
                A mesma disciplina se aplica a uma operação isolada e à gestão contínua de um fundo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Track record (painel de texto + foto sangrada) ── */}
      <section style={{ background: '#F7F2E6' }} className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="flex flex-col justify-center py-24 lg:py-0"
          style={{ paddingLeft: 'clamp(1.5rem, 5vw, 8rem)', paddingRight: 'clamp(1.5rem, 5vw, 4rem)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: '#F5A623' }}>
            Sobre a Solar
          </p>
          <div className="w-8 h-px mb-10" style={{ background: '#F5A623' }} />
          <h2
            className="font-bold leading-[1.06] mb-6"
            style={{ color: '#0C0F2E', fontSize: 'clamp(1.8rem, 2.8vw, 2.5rem)', letterSpacing: '-0.02em', maxWidth: '560px' }}
          >
            Experiência em crédito.
            <br />
            Visão de longo prazo.
          </h2>
          <p className="text-base leading-loose mb-8 font-light" style={{ color: 'rgba(12,15,46,0.65)', maxWidth: '560px' }}>
            Desde 2018, desenvolvemos soluções de crédito para empresas e gerimos veículos de investimento ligados à economia real.
          </p>
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-10 pt-8 border-t" style={{ borderColor: 'rgba(12,15,46,0.1)', maxWidth: '560px' }}>
            {[
              { value: 'R$ 7,4bi', label: 'Operado desde 2018' },
              { value: 'R$ 6,2bi', label: 'Liquidados' },
              { value: 'R$ 55mi', label: 'Capital próprio' },
            ].map(({ value, label }) => (
              <div key={label}>
                <span
                  className="block font-bold leading-none mb-1.5"
                  style={{ color: '#F5A623', fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)' }}
                >
                  {value}
                </span>
                <span className="text-xs uppercase tracking-wider" style={{ color: 'rgba(12,15,46,0.45)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest self-start transition-opacity hover:opacity-60"
            style={{ color: '#0C0F2E' }}
          >
            Conheça a Solar <span style={{ color: '#F5A623' }}>→</span>
          </Link>
        </div>
        <div style={{ minHeight: '340px' }}>
          <img
            src="/img/sobre-solar-ceu.jpg"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
        </div>
      </section>

      {/* ── Fundos em destaque ── */}
      <section style={{ background: '#EDE6D3' }} className="py-24 lg:py-32">
        <div className="site-container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: '#F5A623' }}>
                Fundos
              </p>
              <h2
                className="font-bold leading-[1.06] mb-2"
                style={{ color: '#0C0F2E', fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', letterSpacing: '-0.02em' }}
              >
                Estratégias de crédito estruturado
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(12,15,46,0.55)', maxWidth: '480px' }}>
                Gerimos FIDCs com estratégias construídas a partir de direitos creditórios, com acompanhamento contínuo da carteira e dos indicadores de risco.
              </p>
            </div>
            <Link
              to="/fundos"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest flex-shrink-0 transition-opacity hover:opacity-60"
              style={{ color: '#0C0F2E' }}
            >
              Ver todos os fundos <span style={{ color: '#F5A623' }}>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {funds.map((f, i) => (
              <Link
                key={i}
                to={`/fundos/${f.slug}`}
                className="group flex flex-col border transition-all duration-200 hover:border-solar-amber"
                style={{ background: '#F7F2E6', borderColor: 'rgba(12,15,46,0.10)' }}
              >
                <div className="p-6 flex flex-col justify-between" style={{ minHeight: '190px' }}>
                  <div>
                    <p
                      className="font-bold uppercase tracking-widest mb-3"
                      style={{ color: '#F5A623', fontSize: '10px' }}
                    >
                      {f.strategyLabel}
                    </p>
                    <h3 className="font-semibold text-sm leading-snug" style={{ color: '#0C0F2E' }}>{f.name}</h3>
                  </div>
                  <div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-5 mt-5 border-t"
                    style={{ borderColor: 'rgba(12,15,46,0.08)' }}
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
                          style={{ color: 'rgba(12,15,46,0.35)', fontSize: '8px' }}
                        >
                          {label}
                        </p>
                        <p className="text-xs font-bold leading-snug" style={{ color: '#0C0F2E' }}>
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

      {/* ── CTA Band ── */}
      <section className="relative overflow-hidden py-14 lg:py-16" style={{ background: '#F5A623' }}>
        <div
          className="absolute pointer-events-none"
          style={{
            right: '3%', top: '50%', transform: 'translateY(-50%)',
            width: 'clamp(260px, 34vw, 480px)', opacity: 0.24,
          }}
        >
          <SolarMark color="#0C0F2E" className="w-full h-auto" />
        </div>
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <h2
              className="font-bold leading-[1.04]"
              style={{ color: '#0C0F2E', fontSize: 'clamp(1.7rem, 2.8vw, 2.6rem)', letterSpacing: '-0.02em' }}
            >
              Pronto para estruturar sua próxima operação?
            </h2>
            <div className="flex flex-col gap-6">
              <p className="text-base font-light" style={{ color: 'rgba(12,15,46,0.65)' }}>
                Fale com a Solar. Entendemos o negócio antes de propor uma estrutura.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contato"
                  className="inline-flex items-center px-8 py-4 text-sm font-semibold uppercase tracking-widest border-2 rounded transition-all duration-200 hover:bg-solar-navy hover:border-solar-navy hover:text-white"
                  style={{ borderColor: '#0C0F2E', color: '#0C0F2E' }}
                >
                  Fale com a Solar
                </Link>
                <Link
                  to="/fundos"
                  className="inline-flex items-center px-8 py-4 text-sm font-semibold uppercase tracking-widest rounded transition-all duration-200 hover:opacity-80"
                  style={{ background: '#0C0F2E', color: '#F5A623' }}
                >
                  Ver Fundos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
