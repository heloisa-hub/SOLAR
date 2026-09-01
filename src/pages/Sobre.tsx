import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import usePageTitle from '../hooks/usePageTitle'
import { withBase } from '../lib/assetUrl'

const team = [
  {
    name: 'Leonardo Ciasca',
    initials: 'LC',
    bio: '25+ anos no mercado financeiro em crédito, Middle Market e Corporate. Sócio na Goal Capital, Diretor na Global Capital e 7 anos no HSBC. MBA pela USP; Mestrado em Política & Estratégia.',
  },
  {
    name: 'Diego Moreno',
    initials: 'DM',
    bio: '20+ anos em crédito, private equity e investment banking. CFO do BrSurgery, Head Healthcare LatAm na Fosun e VP de Equity Research no BofA Merrill Lynch. Administração e Finanças pela FEA-USP.',
  },
  {
    name: 'Luiz Simione',
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
      <PageHero
        image={withBase('/img/page-hero-sobre.jpg')}
        eyebrow="Sobre a Solar Capital"
        titleLine1="Entender o negócio antes"
        titleLine2="de estruturar o capital."
      />

      {/* Institutional content */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="py-24 lg:py-40">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            {/* Left — text */}
            <div className="lg:sticky lg:top-32">
              <h2
                className="font-bold leading-[1.06] mb-10"
                style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em' }}
              >
                Capital não resolve nada sozinho — estrutura resolve.
              </h2>
              <div className="space-y-5 font-light leading-loose" style={{ color: 'rgb(var(--ink-rgb) / 0.65)', fontSize: 'var(--text-body-size)' }}>
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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-2" style={{ color: 'rgb(var(--ink-rgb) / 0.4)' }}>
                Como atuamos
              </p>
              <div>
                {pillars.map((p, i) => (
                  <div
                    key={i}
                    className="flex gap-6 py-8 border-t"
                    style={{ borderColor: 'rgb(var(--ink-rgb) / 0.1)' }}
                  >
                    <span className="text-xs font-bold flex-shrink-0 mt-0.5 opacity-25" style={{ color: 'var(--color-text-on-light)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--color-text-on-light)' }}>
                        {p.title}
                      </h3>
                      <p className="text-sm font-light leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.55)' }}>
                        {p.body}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="border-t" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.1)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ background: 'var(--color-text-on-light)' }} className="py-24 lg:py-32">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--color-brand)' }}>
            Equipe
          </p>
          <div className="w-8 h-px mb-10" style={{ background: 'var(--color-brand)' }} />
          <h2
            className="font-bold leading-[1.06] mb-16 text-white"
            style={{ fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em' }}
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
                style={{ borderColor: 'rgb(var(--paper-rgb) / 0.08)' }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-6 font-bold text-sm flex-shrink-0"
                  style={{ background: 'rgb(var(--brand-rgb) / 0.12)', color: 'var(--color-brand)', border: '1px solid rgb(var(--brand-rgb) / 0.3)' }}
                >
                  {p.initials}
                </div>
                <h3 className="font-bold text-base mb-5 text-white">{p.name}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgb(var(--paper-rgb) / 0.5)' }}>
                  {p.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos marcos — trajetória em números */}
      <section style={{ background: 'var(--color-brand)' }} className="py-24 lg:py-40">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'rgb(var(--ink-rgb) / 0.55)' }}>
            Nossos marcos
          </p>
          <div className="w-8 h-px mb-10" style={{ background: 'var(--color-text-on-light)' }} />
          <h2
            className="font-bold leading-[1.06] mb-16"
            style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em' }}
          >
            Nossa trajetória em números
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgb(var(--ink-rgb) / 0.15)' }}>
            {[
              { value: '2018', label: 'Fundação', body: 'Início das operações focadas em originação estratégica de recebíveis.' },
              { value: '8+', label: 'FIDCs Ativos', body: 'Veículos estruturados sob gestão direta e rigoroso acompanhamento.' },
              { value: 'R$ 850M+', label: 'Sob Custódia', body: 'Volume total originado e gerido nos diversos setores econômicos atendidos.' },
              { value: '4.500+', label: 'Sacados Homologados', body: 'Capilaridade de risco descentralizado na cadeia de fornecedores.' },
            ].map((m, i) => (
              <div key={i} className="p-8" style={{ background: 'var(--color-brand)' }}>
                <span className="block font-bold leading-none mb-3" style={{ color: 'var(--color-text-on-light)', fontSize: 'clamp(1.8rem, 2.6vw, 2.2rem)' }}>
                  {m.value}
                </span>
                <span className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-text-on-light)' }}>{m.label}</span>
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.6)' }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governança institucional */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="py-24 lg:py-40">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-brand)' }}>
                Governança institucional
              </p>
              <div className="w-8 h-px mb-8" style={{ background: 'var(--color-brand)' }} />
              <h2
                className="font-bold leading-[1.1] mb-6"
                style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em' }}
              >
                Capital, ativos e governança em uma única estrutura.
              </h2>
              <p className="text-base leading-loose font-light" style={{ color: 'rgb(var(--ink-rgb) / 0.65)' }}>
                Nossa abordagem integrada une a agilidade na concessão do crédito com a rigidez de um compliance institucional. Homologamos e analisamos cada recebível eletronicamente antes de integrá-lo a um de nossos fundos, blindando o patrimônio dos cotistas e promovendo crescimento real na ponta de originação.
              </p>
            </div>
            <div className="p-8 border" style={{ background: 'var(--color-surface-cream)', borderColor: 'rgb(var(--ink-rgb) / 0.08)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-8" style={{ color: 'rgb(var(--ink-rgb) / 0.45)' }}>
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
                      style={{ background: 'var(--color-text-on-light)', color: 'var(--color-brand)' }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1.5" style={{ color: 'var(--color-text-on-light)' }}>{step.title}</h4>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.6)' }}>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Conheça como a Solar pode estruturar sua operação."
        primaryButton={{ label: 'Fale com a Solar', to: '/contato' }}
      />
    </>
  )
}
