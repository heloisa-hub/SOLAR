import { Link } from 'react-router'
import { SolarMark } from '../components/SolarLogo'
import usePageTitle from '../hooks/usePageTitle'

const team = [
  {
    name: 'Leonardo Ciasca',
    role: 'Fundador & Sócio Gestor',
    initials: 'LC',
    bio: '25+ anos no mercado financeiro em crédito, Middle Market e Corporate. Sócio na Goal Capital, Diretor na Global Capital e 7 anos no HSBC. MBA pela USP; Mestrado em Política & Estratégia.',
  },
  {
    name: 'Diego Moreno',
    role: 'Sócio',
    initials: 'DM',
    bio: '20+ anos em crédito, private equity e investment banking. CFO do BrSurgery, Head Healthcare LatAm na Fosun e VP de Equity Research no BofA Merrill Lynch. Administração e Finanças pela FEA-USP.',
  },
  {
    name: 'Luiz Simione',
    role: 'Sócio',
    initials: 'LS',
    bio: 'Décadas de experiência em finanças na Ásia e América Latina. MD e Global Head of Forfaiting no HSBC (18 anos), CEO Ásia no Bradesco, Managing Partner na Cambury International. MBA pelo IMD; programa de liderança no INSEAD.',
  },
]

const pillars = [
  {
    title: 'Originação próxima',
    body: 'Construímos relacionamentos diretos com empresas para entender o negócio, os ativos e a dinâmica de crédito antes de propor qualquer estrutura.',
  },
  {
    title: 'Estruturação',
    body: 'Do diagnóstico ao regulamento: desenhamos o veículo a partir das necessidades reais da operação, não de um modelo de prateleira.',
  },
  {
    title: 'Disciplina de crédito',
    body: 'Análise individual de recebíveis, garantias e capacidade de pagamento. Covenants e critérios de elegibilidade definidos desde o início.',
  },
  {
    title: 'Acompanhamento contínuo',
    body: 'Gestão ativa da carteira, monitoramento de inadimplência e governança com relatórios periódicos e prestadores independentes.',
  },
]

export default function Sobre() {
  usePageTitle('Sobre a Solar')
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ background: 'linear-gradient(135deg, #080A20 0%, #0C0F2E 100%)', minHeight: '65vh', paddingTop: '118px' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{ right: '-4%', bottom: '-5%', width: 'clamp(280px, 45vw, 680px)', opacity: 0.07 }}
        >
          <SolarMark color="#F5A623" className="w-full h-full" />
        </div>
        <div className="site-container pb-20 relative z-10">
          <p className="font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: '#F5A623', fontSize: '11px' }}>
            Sobre a Solar Capital
          </p>
          <div className="w-8 h-px mb-10" style={{ background: '#F5A623' }} />
          <h1
            className="font-bold leading-[1.0] text-white"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)', letterSpacing: '-0.02em', maxWidth: '900px' }}
          >
            Entender o negócio
            <br />
            antes de estruturar
            <br />
            <span style={{ color: '#F5A623' }}>o capital.</span>
          </h1>
        </div>
      </section>

      {/* Institutional content */}
      <section style={{ background: '#F7F2E6' }} className="py-24 lg:py-40">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            {/* Left — text */}
            <div className="lg:sticky lg:top-32">
              <h2
                className="font-bold leading-[1.06] mb-10"
                style={{ color: '#0C0F2E', fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', letterSpacing: '-0.02em' }}
              >
                Capital não resolve nada sozinho — estrutura resolve.
              </h2>
              <div className="space-y-5 font-light leading-loose" style={{ color: 'rgba(12,15,46,0.65)', fontSize: '1rem' }}>
                <p>
                  Toda empresa tem uma dinâmica própria de caixa, de ativos e de risco. Por isso não partimos de um produto de prateleira: partimos do negócio que existe por trás da operação.
                </p>
                <p>
                  A Solar Capital nasceu em 2018 com foco em crédito para empresas. Hoje atuamos na originação, estruturação e gestão de operações de crédito, conectando empresas a diferentes fontes de capital e investidores a oportunidades da economia real.
                </p>
                <p>
                  Com R$ 100,6 milhões no Solar FIDC Multissetorial e mais de R$ 500 milhões somados entre os quatro FIDCs em operação, construímos um histórico de disciplina e resultado desde 2018.
                </p>
              </div>
            </div>

            {/* Right — four pillars */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-2" style={{ color: 'rgba(12,15,46,0.4)' }}>
                Como atuamos
              </p>
              <div>
                {pillars.map((p, i) => (
                  <div
                    key={i}
                    className="flex gap-6 py-8 border-t"
                    style={{ borderColor: 'rgba(12,15,46,0.1)' }}
                  >
                    <span className="text-xs font-bold flex-shrink-0 mt-0.5 opacity-25" style={{ color: '#0C0F2E' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-semibold text-sm mb-2" style={{ color: '#0C0F2E' }}>
                        {p.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(12,15,46,0.55)' }}>
                        {p.body}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t" style={{ borderColor: 'rgba(12,15,46,0.1)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ background: '#0C0F2E' }} className="py-24 lg:py-32">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: '#F5A623' }}>
            Equipe
          </p>
          <div className="w-8 h-px mb-10" style={{ background: '#F5A623' }} />
          <h2
            className="font-bold leading-[1.06] mb-16 text-white"
            style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.1rem)', letterSpacing: '-0.02em' }}
          >
            Liderança com experiência
            <br />
            nos maiores mercados.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {team.map((p, i) => (
              <div
                key={i}
                className="py-10 lg:py-0 lg:px-10 border-t lg:border-t-0 lg:border-l first:border-t-0 first:lg:border-l-0 first:lg:pl-0 last:lg:pr-0"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-6 font-bold text-sm flex-shrink-0"
                  style={{ background: 'rgba(245,166,35,0.12)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.3)' }}
                >
                  {p.initials}
                </div>
                <h3 className="font-bold text-base mb-1 text-white">{p.name}</h3>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-5"
                  style={{ color: '#F5A623' }}
                >
                  {p.role}
                </p>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {p.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos marcos — trajetória em números */}
      <section style={{ background: '#0C0F2E' }} className="py-24 lg:py-40">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: '#F5A623' }}>
            Nossos marcos
          </p>
          <div className="w-8 h-px mb-10" style={{ background: '#F5A623' }} />
          <h2
            className="font-bold leading-[1.06] mb-16 text-white"
            style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)', letterSpacing: '-0.02em' }}
          >
            Nossa trajetória em números
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
            {[
              { value: '2018', label: 'Fundação', body: 'Início das operações focadas em originação estratégica de recebíveis.' },
              { value: '8+', label: 'FIDCs Ativos', body: 'Veículos estruturados sob gestão direta e rigoroso acompanhamento.' },
              { value: 'R$ 850M+', label: 'Sob Custódia', body: 'Volume total originado e gerido nos diversos setores econômicos atendidos.' },
              { value: '4.500+', label: 'Sacados Homologados', body: 'Capilaridade de risco descentralizado na cadeia de fornecedores.' },
            ].map((m, i) => (
              <div key={i} className="p-8" style={{ background: '#0C0F2E' }}>
                <span className="block font-bold leading-none mb-3" style={{ color: '#F5A623', fontSize: 'clamp(1.8rem, 2.6vw, 2.2rem)' }}>
                  {m.value}
                </span>
                <span className="block text-sm font-semibold text-white mb-3">{m.label}</span>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governança institucional */}
      <section style={{ background: '#F7F2E6' }} className="py-24 lg:py-40">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: '#F5A623' }}>
                Governança institucional
              </p>
              <div className="w-8 h-px mb-8" style={{ background: '#F5A623' }} />
              <h2
                className="font-bold leading-[1.1] mb-6"
                style={{ color: '#0C0F2E', fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', letterSpacing: '-0.02em' }}
              >
                Capital, ativos e governança em uma única estrutura.
              </h2>
              <p className="text-base leading-loose font-light" style={{ color: 'rgba(12,15,46,0.65)' }}>
                Nossa abordagem integrada une a agilidade na concessão do crédito com a rigidez de um compliance institucional. Homologamos e analisamos cada recebível eletronicamente antes de integrá-lo a um de nossos fundos, blindando o patrimônio dos cotistas e promovendo crescimento real na ponta de originação.
              </p>
            </div>
            <div className="p-8 border" style={{ background: '#EDE6D3', borderColor: 'rgba(12,15,46,0.08)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-8" style={{ color: 'rgba(12,15,46,0.45)' }}>
                Fluxo da Estrutura de Crédito Solar Capital
              </p>
              <div className="space-y-6">
                {[
                  { n: '01', title: 'Originação & Auditoria', body: 'Mapeamento da cadeia produtiva e verificação antifraude de notas fiscais e contratos.' },
                  { n: '02', title: 'Filtro de Crédito Automatizado', body: 'Cruzamento de limites operacionais e verificação de saúde financeira dos sacados.' },
                  { n: '03', title: 'Admissão ao FIDC & Custódia', body: 'Cessão definitiva dos direitos creditórios e liquidação financeira sob custódia de terceiros independentes.' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div
                      className="w-9 h-9 flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ background: '#0C0F2E', color: '#F5A623' }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1.5" style={{ color: '#0C0F2E' }}>{step.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(12,15,46,0.6)' }}>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-14 lg:py-16" style={{ background: '#F5A623' }}>
        <div
          className="absolute pointer-events-none"
          style={{ right: '-4%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(220px, 30vw, 460px)', opacity: 0.12 }}
        >
          <SolarMark color="#0C0F2E" className="w-full h-auto" />
        </div>
        <div className="site-container relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <h2
            className="font-bold leading-[1.06]"
            style={{ color: '#0C0F2E', fontSize: 'clamp(1.6rem, 2.4vw, 2.3rem)', letterSpacing: '-0.02em' }}
          >
            Conheça como a Solar pode
            <br />
            estruturar sua operação.
          </h2>
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
