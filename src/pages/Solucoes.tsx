import PageHero from '../components/PageHero'
import CTABand from '../components/CTABand'
import usePageTitle from '../hooks/usePageTitle'
import { withBase } from '../lib/assetUrl'

const services = [
  {
    label: 'Crédito Estruturado',
    title: 'Capital de giro, antecipação e estruturas próprias.',
    body: 'Capital de giro, antecipação de contratos, cadeia de fornecedores, recebíveis de cartão, consignado privado e gestão de fluxos. A Solar estrutura a operação a partir do ativo que a empresa já possui.',
  },
  {
    label: 'Estruturação de FIDC',
    title: 'Do desenho à gestão de um fundo próprio.',
    body: 'Para empresas com escala e recorrência de originação, o FIDC próprio é a evolução natural. A Solar atua desde o diagnóstico, passando pelo regulamento e constituição, até a gestão contínua do veículo.',
  },
  {
    label: 'Antecipação de Recebíveis',
    title: 'Operações pontuais para necessidades específicas de caixa.',
    body: 'Para necessidades mais simples e pontuais, a Solar estrutura a operação de antecipação de forma eficiente, sem a complexidade de um veículo permanente.',
  },
]

const comparison = [
  {
    attribute: 'Como analisamos o risco',
    banco: 'Score genérico, sem olhar a operação.',
    fintech: 'Modelo automatizado por dados de conta — rápido, raso.',
    solar: 'Análise individual: recebíveis, garantias e capacidade de pagamento.',
  },
  {
    attribute: 'Estruturação da operação',
    banco: 'Produto de prateleira, mesma linha para qualquer empresa.',
    fintech: 'Produto digital padronizado, pouca margem de customização.',
    solar: 'Estrutura sob medida — FIDC próprio quando a escala justifica.',
  },
  {
    attribute: 'Governança para o investidor',
    banco: 'Não se aplica — crédito fica no balanço do banco.',
    fintech: 'Baixa transparência, sem custódia ou rating independente.',
    solar: 'Custódia, rating e data-base publicados em cada fundo.',
  },
  {
    attribute: 'Velocidade de decisão',
    banco: 'Lenta — passa por comitê e alçadas internas.',
    fintech: 'Rápida, mas descolada do fôlego real da empresa.',
    solar: 'Rápida porque a originação já nasce estruturada.',
  },
]

const process = [
  {
    n: '01',
    title: 'Originação',
    body: 'Identificação de empresas, ativos e oportunidades de crédito. Entendimento da dinâmica operacional e financeira.',
  },
  {
    n: '02',
    title: 'Análise',
    body: 'Avaliação financeira, operacional e das fontes de pagamento. Análise individual de recebíveis, garantias e concentração.',
  },
  {
    n: '03',
    title: 'Estruturação',
    body: 'Instrumento, prazo, garantias, covenants e mecanismos de proteção definidos a partir do negócio — não de um modelo genérico.',
  },
  {
    n: '04',
    title: 'Funding',
    body: 'Conexão da operação às fontes de capital compatíveis. Investidores selecionados com base na estratégia do fundo.',
  },
  {
    n: '05',
    title: 'Gestão',
    body: 'Monitoramento contínuo da carteira, das garantias e do desempenho. Relatórios, assembleias e acompanhamento de covenants.',
  },
]

const useCases = [
  'Empresa com volume de recebíveis recorrentes precisa de capital sem depender de crédito bancário',
  'Grupo empresarial quer criar uma plataforma de crédito para sua cadeia de fornecedores',
  'Empresa de médio porte precisa de funding para escalar originação sem comprometer o balanço',
  'Operação de consignado privado para colaboradores de empresas parceiras',
  'Empresa em crescimento quer acessar investidores institucionais sem abrir capital',
  'Negócio com ativos imobiliários ou agrícolas busca monetizar seu portfólio de recebíveis',
]

export default function Solucoes() {
  usePageTitle('Soluções para Empresas')
  return (
    <>
      <PageHero
        image={withBase('/img/page-hero-sol.jpg')}
        eyebrow="Soluções para empresas"
        titleLine1="Cada operação começa pelo"
        titleLine2="entendimento do negócio."
      />

      {/* Intro */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="py-20 lg:py-28">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-brand)' }}>
            Como pensamos
          </p>
          <div className="w-8 h-px mb-10" style={{ background: 'var(--color-brand)' }} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            <h2
              className="font-bold leading-[1.1]"
              style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em' }}
            >
              Não partimos de uma estrutura pronta.
            </h2>
            <p className="text-base leading-loose" style={{ color: 'rgb(var(--ink-rgb) / 0.7)' }}>
              Analisamos a empresa, seus recebíveis, garantias e necessidade de capital antes de propor uma solução. O instrumento certo nasce do diagnóstico — não o contrário. Por isso as estruturas que construímos são mais robustas, mais eficientes e mais adequadas à realidade de quem as contrata.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ background: 'rgb(var(--ink-rgb) / 0.10)' }}>
            {[
              { title: 'Diagnóstico primeiro', body: 'Entendemos o negócio antes de propor qualquer instrumento.' },
              { title: 'Estrutura sob medida', body: 'Nada de produto de prateleira — cada operação nasce do que a empresa já possui.' },
              { title: 'Disciplina de crédito', body: 'Garantias, covenants e capacidade de pagamento analisados caso a caso.' },
            ].map((c, i) => (
              <div key={i} className="p-6" style={{ background: 'var(--color-surface-cream)' }}>
                <h3 className="font-semibold text-sm leading-snug mb-1.5" style={{ color: 'var(--color-text-on-light)' }}>
                  {c.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.6)' }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ background: 'var(--color-surface-cream)' }} className="py-24 lg:py-32">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-brand)' }}>
            O que fazemos
          </p>
          <div className="w-8 h-px mb-12" style={{ background: 'var(--color-brand)' }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="p-8 border"
                style={{ background: 'var(--color-surface-offwhite)', borderColor: 'rgb(var(--ink-rgb) / 0.10)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-brand)' }}>
                  {s.label}
                </p>
                <h3 className="font-bold text-base mb-4 leading-snug" style={{ color: 'var(--color-text-on-light)' }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.6)' }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="py-24 lg:py-40">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-brand)' }}>
            Comparativo
          </p>
          <div className="w-8 h-px mb-8" style={{ background: 'var(--color-brand)' }} />
          <h2
            className="font-bold leading-[1.04] mb-4"
            style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)', letterSpacing: '-0.02em' }}
          >
            O mesmo problema, respostas distintas
          </h2>
          <p className="text-base mb-14 max-w-3xl" style={{ color: 'rgb(var(--ink-rgb) / 0.7)' }}>
            Crédito para uma empresa que não cabe no produto de prateleira. A estrutura é o que muda.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr>
                  <th className="text-left py-3 pr-6 w-[22%]" />
                  <th className="text-left py-3 pr-6 w-[26%]">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgb(var(--ink-rgb) / 0.5)' }}>
                      Banco Tradicional
                    </span>
                  </th>
                  <th className="text-left py-3 pr-6 w-[26%]">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgb(var(--ink-rgb) / 0.5)' }}>
                      Fintech de Crédito
                    </span>
                  </th>
                  <th className="text-left py-3 pr-6 w-[26%]" style={{ borderTop: '2px solid var(--color-brand)' }}>
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-brand)' }}>
                      Solar Capital
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.1)' }}>
                    <td className="py-6 pr-6 align-top">
                      <span className="text-sm font-semibold" style={{ color: 'rgb(var(--ink-rgb) / 0.7)' }}>
                        {row.attribute}
                      </span>
                    </td>
                    <td className="py-6 pr-6 align-top">
                      <span className="text-sm leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.6)' }}>
                        {row.banco}
                      </span>
                    </td>
                    <td className="py-6 pr-6 align-top">
                      <span className="text-sm leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.6)' }}>
                        {row.fintech}
                      </span>
                    </td>
                    <td className="py-6 pr-6 align-top" style={{ background: 'rgb(var(--brand-rgb) / 0.08)' }}>
                      <span className="text-sm font-semibold leading-relaxed" style={{ color: 'var(--color-text-on-light)' }}>
                        {row.solar}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section style={{ background: 'var(--color-surface-dark-elevated)' }} className="py-24 lg:py-32">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-brand)' }}>
            Casos de uso
          </p>
          <div className="w-8 h-px mb-8" style={{ background: 'var(--color-brand)' }} />
          <h2
            className="font-bold leading-[1.1] mb-12 text-white"
            style={{ fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)' }}
          >
            A sua situação se encaixa aqui?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 border border-white/10"
                style={{ background: 'var(--color-surface-dark-elevated)' }}
              >
                <span className="text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: 'var(--color-brand)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--paper-rgb) / 0.7)' }}>
                  {uc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — timeline horizontal */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="py-24 lg:py-28">
        <div className="site-container">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-brand)' }}>
                Como atuamos
              </p>
              <div className="w-8 h-px mb-6" style={{ background: 'var(--color-brand)' }} />
              <h2
                className="font-bold leading-[1.1]"
                style={{ color: 'var(--color-text-on-light)', fontSize: 'var(--text-h2-size)', lineHeight: 'var(--text-h2-leading)' }}
              >
                Do diagnóstico à gestão contínua.
              </h2>
            </div>
            <p
              className="text-sm leading-relaxed lg:text-right lg:pt-1"
              style={{ color: 'rgb(var(--ink-rgb) / 0.5)', maxWidth: '320px' }}
            >
              A mesma disciplina se aplica a uma operação isolada e à gestão contínua de um fundo.
            </p>
          </div>

          <div className="relative">
            {/* A linha passa exatamente pelo centro dos 5 pontinhos, que
                ficam alinhados à esquerda de cada coluna de 20% (0/20/40/
                60/80%) — não centralizados, então a linha vai de 0% a 80%,
                não de 10% a 90%. */}
            <div
              className="hidden sm:block absolute h-px"
              style={{ top: '5.5px', left: '5.5px', right: 'calc(20% - 5.5px)', background: 'rgb(var(--brand-rgb) / 0.3)' }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-y-10 gap-x-4">
              {process.map((p, i) => (
                <div key={i}>
                  <span
                    className="block mb-5"
                    style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--color-brand)' }}
                  />
                  <span className="block text-xs font-bold mb-2" style={{ color: 'var(--color-brand)' }}>
                    {p.n}
                  </span>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--color-text-on-light)' }}>
                    {p.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgb(var(--ink-rgb) / 0.55)' }}>
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Vamos falar sobre a sua operação?"
        body="Empresas, investidores e parceiros — encontramos a estrutura certa para cada necessidade."
        primaryButton={{ label: 'Fale com a Solar', to: '/contato' }}
      />
    </>
  )
}
