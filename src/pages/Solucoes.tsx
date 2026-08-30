import { Link } from 'react-router'
import { SolarMark } from '../components/SolarLogo'
import usePageTitle from '../hooks/usePageTitle'

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
      {/* Hero */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ background: 'linear-gradient(135deg, #080A20 0%, #0C0F2E 100%)', minHeight: '52vh', paddingTop: '118px' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{ right: '-8%', top: '50%', transform: 'translateY(-50%)', width: '50vw', opacity: 0.06 }}
        >
          <SolarMark color="#F5A623" className="w-full h-full" />
        </div>
        <div className="site-container pb-16 relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: '#F5A623' }}>
            Soluções para empresas
          </p>
          <div className="w-8 h-px mb-6" style={{ background: '#F5A623' }} />
          <h1
            className="font-bold leading-[1.06] text-white max-w-3xl"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
          >
            Cada operação começa pelo entendimento do negócio.
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: '#F7F2E6' }} className="py-20 lg:py-28">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="text-xl font-semibold mb-6 leading-snug" style={{ color: '#0C0F2E' }}>
              Não partimos de uma estrutura pronta.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(12,15,46,0.65)' }}>
              Analisamos a empresa, seus recebíveis, garantias e necessidade de capital antes de propor uma solução. O instrumento certo nasce do diagnóstico — não o contrário. Por isso as estruturas que construímos são mais robustas, mais eficientes e mais adequadas à realidade de quem as contrata.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ background: '#EDE6D3' }} className="py-24 lg:py-32">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: '#F5A623' }}>
            O que fazemos
          </p>
          <div className="w-8 h-px mb-12" style={{ background: '#F5A623' }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="p-8 border"
                style={{ background: '#F7F2E6', borderColor: 'rgba(12,15,46,0.10)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: '#F5A623' }}>
                  {s.label}
                </p>
                <h3 className="font-bold text-base mb-4 leading-snug" style={{ color: '#0C0F2E' }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(12,15,46,0.6)' }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section style={{ background: '#0C0F2E' }} className="py-24 lg:py-40">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: '#F5A623' }}>
            Comparativo
          </p>
          <div className="w-8 h-px mb-8" style={{ background: '#F5A623' }} />
          <h2
            className="font-bold leading-[1.04] mb-4 text-white"
            style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)', letterSpacing: '-0.02em' }}
          >
            O mesmo problema, respostas distintas
          </h2>
          <p className="text-base mb-14 max-w-3xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Crédito para uma empresa que não cabe no produto de prateleira. A estrutura é o que muda.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr>
                  <th className="text-left py-3 pr-6 w-[22%]" />
                  <th className="text-left py-3 pr-6 w-[26%]">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Banco Tradicional
                    </span>
                  </th>
                  <th className="text-left py-3 pr-6 w-[26%]">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Fintech de Crédito
                    </span>
                  </th>
                  <th className="text-left py-3 w-[26%]">
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#F5A623' }}>
                      Solar Capital
                    </span>
                    <div className="h-px mt-2" style={{ background: '#F5A623' }} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <td className="py-6 pr-6 align-top">
                      <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {row.attribute}
                      </span>
                    </td>
                    <td className="py-6 pr-6 align-top">
                      <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {row.banco}
                      </span>
                    </td>
                    <td className="py-6 pr-6 align-top">
                      <span className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        {row.fintech}
                      </span>
                    </td>
                    <td className="py-6 align-top">
                      <span className="text-sm font-semibold leading-relaxed text-white">
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
      <section style={{ background: '#131737' }} className="py-24 lg:py-32">
        <div className="site-container">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: '#F5A623' }}>
            Casos de uso
          </p>
          <div className="w-8 h-px mb-8" style={{ background: '#F5A623' }} />
          <h2
            className="font-bold leading-[1.1] mb-12 text-white"
            style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}
          >
            A sua situação se encaixa aqui?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 border border-white/10"
                style={{ background: '#131737' }}
              >
                <span className="text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: '#F5A623' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {uc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — timeline horizontal */}
      <section style={{ background: '#F7F2E6' }} className="py-24 lg:py-28">
        <div className="site-container">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: '#F5A623' }}>
                Como atuamos
              </p>
              <div className="w-8 h-px mb-6" style={{ background: '#F5A623' }} />
              <h2
                className="font-bold leading-[1.1]"
                style={{ color: '#0C0F2E', fontSize: 'clamp(1.4rem, 2.2vw, 2rem)' }}
              >
                Do diagnóstico à gestão contínua.
              </h2>
            </div>
            <p
              className="text-sm leading-relaxed lg:text-right lg:pt-1"
              style={{ color: 'rgba(12,15,46,0.5)', maxWidth: '320px' }}
            >
              A mesma disciplina se aplica a uma operação isolada e à gestão contínua de um fundo.
            </p>
          </div>

          <div className="relative">
            <div
              className="hidden sm:block absolute h-px"
              style={{ top: '5px', left: '10%', right: '10%', background: 'rgba(245,166,35,0.3)' }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-y-10 gap-x-4">
              {process.map((p, i) => (
                <div key={i}>
                  <span
                    className="block mb-5 sm:mx-auto"
                    style={{ width: 11, height: 11, borderRadius: '50%', background: '#F5A623' }}
                  />
                  <span className="block text-xs font-bold mb-2" style={{ color: '#F5A623' }}>
                    {p.n}
                  </span>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: '#0C0F2E' }}>
                    {p.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(12,15,46,0.55)' }}>
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16" style={{ background: '#F5A623' }}>
        <div
          className="absolute pointer-events-none"
          style={{ right: '-4%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(180px, 24vw, 360px)', opacity: 0.12 }}
        >
          <SolarMark color="#0C0F2E" className="w-full h-auto" />
        </div>
        <div className="site-container relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-bold text-xl mb-1" style={{ color: '#0C0F2E' }}>
              Vamos falar sobre a sua operação?
            </h2>
            <p className="text-sm" style={{ color: 'rgba(12,15,46,0.6)' }}>
              Empresas, investidores e parceiros — encontramos a estrutura certa para cada necessidade.
            </p>
          </div>
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
