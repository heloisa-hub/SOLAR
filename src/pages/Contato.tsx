import { useState } from 'react'
import { SolarMark } from '../components/SolarLogo'
import usePageTitle from '../hooks/usePageTitle'
import { withBase } from '../lib/assetUrl'

const subjects = [
  'Operações de crédito / FIDC',
  'Investimentos / Fundos',
  'Parcerias e prestadores',
  'Outros',
]

export default function Contato() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: subjects[0],
    mensagem: '',
  })
  const [sent, setSent] = useState(false)
  usePageTitle('Contato')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Contato pelo site — ${form.assunto} — ${form.nome}`
    const body = `Nome: ${form.nome}\nE-mail: ${form.email}\nTelefone: ${form.telefone}\nAssunto: ${form.assunto}\n\nMensagem:\n${form.mensagem}`
    window.location.href = `mailto:contato@solarcapital.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const inputClass = "w-full bg-transparent border-b py-3 text-sm outline-none transition-colors duration-200 placeholder-transparent focus:border-solar-amber"
  const inputStyle = { borderColor: 'rgb(var(--ink-rgb) / 0.2)', color: 'var(--color-text-on-light)' }
  const labelStyle = { color: 'rgb(var(--ink-rgb) / 0.5)', fontSize: 'var(--text-label-size)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontWeight: 600 }

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ minHeight: '44vh', paddingTop: '118px' }}
      >
        <img
          src={withBase('/img/page-hero-contato.jpg')}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgb(var(--ink-rgb) / 0.88) 0%, rgb(var(--ink-rgb) / 0.88) 42%, rgb(var(--ink-rgb) / 0.6) 72%, rgb(var(--ink-rgb) / 0.38) 100%)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{ right: '-4%', top: '50%', transform: 'translateY(-50%)', width: '32vw', opacity: 0.2 }}
        >
          <SolarMark className="w-full h-full" />
        </div>
        <div className="site-container pb-16 relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--color-brand)' }}>
            Contato
          </p>
          <div className="w-8 h-px mb-6" style={{ background: 'var(--color-brand)' }} />
          <h1
            className="font-bold leading-[1.06] text-white max-w-xl"
            style={{ fontSize: 'var(--text-h1-size)', lineHeight: 'var(--text-h1-leading)' }}
          >
            Fale com a Solar.
          </h1>
          <p className="mt-4 text-base max-w-lg" style={{ color: 'rgb(var(--paper-rgb) / 0.55)' }}>
            Empresas, investidores e parceiros — estamos disponíveis para falar sobre estruturas, fundos e oportunidades.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ background: 'var(--color-surface-offwhite)' }} className="py-24 lg:py-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

            {/* Left — Form */}
            <div>
              <h2 className="font-bold text-xl mb-8" style={{ color: 'var(--color-text-on-light)' }}>Envie uma mensagem</h2>

              {sent ? (
                <div
                  className="p-8 border text-center"
                  style={{ background: 'var(--color-surface-cream)', borderColor: 'rgb(var(--ink-rgb) / 0.10)' }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--color-brand)' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4 10l4.5 4.5L16 6" stroke="var(--color-text-on-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--color-text-on-light)' }}>Mensagem enviada.</h3>
                  <p className="text-sm" style={{ color: 'rgb(var(--ink-rgb) / 0.6)' }}>
                    Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-6">
                    {/* Nome */}
                    <div>
                      <label className="block mb-2" style={labelStyle}>Nome</label>
                      <input
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        required
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    {/* E-mail */}
                    <div>
                      <label className="block mb-2" style={labelStyle}>E-mail</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        required
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    {/* Telefone */}
                    <div>
                      <label className="block mb-2" style={labelStyle}>Telefone</label>
                      <input
                        type="tel"
                        name="telefone"
                        value={form.telefone}
                        onChange={handleChange}
                        placeholder="+55 11 00000-0000"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    {/* Assunto */}
                    <div>
                      <label className="block mb-2" style={labelStyle}>Assunto</label>
                      <select
                        name="assunto"
                        value={form.assunto}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b py-3 text-sm outline-none appearance-none"
                        style={{ ...inputStyle, borderColor: 'rgb(var(--ink-rgb) / 0.2)' }}
                      >
                        {subjects.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Mensagem */}
                    <div>
                      <label className="block mb-2" style={labelStyle}>Mensagem</label>
                      <textarea
                        name="mensagem"
                        value={form.mensagem}
                        onChange={handleChange}
                        placeholder="Descreva brevemente sua necessidade ou dúvida..."
                        rows={4}
                        required
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded transition-all duration-200 hover:opacity-90"
                    style={{ background: 'var(--color-text-on-light)', color: 'var(--color-brand)' }}
                  >
                    Enviar mensagem
                  </button>
                </form>
              )}
            </div>

            {/* Right — contact info */}
            <div>
              <h2 className="font-bold text-xl mb-8" style={{ color: 'var(--color-text-on-light)' }}>Canais diretos</h2>

              <div className="space-y-8">
                <div className="pt-6 border-t" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.12)' }}>
                  <p style={labelStyle} className="mb-3">E-mail</p>
                  <a
                    href="mailto:contato@solarcapital.com.br"
                    className="text-base font-medium hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--color-text-on-light)' }}
                  >
                    contato@solarcapital.com.br
                  </a>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.12)' }}>
                  <p style={labelStyle} className="mb-3">Telefone</p>
                  <a
                    href="tel:+551138561545"
                    className="text-base font-medium hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--color-text-on-light)' }}
                  >
                    +55 11 3856-1545
                  </a>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.12)' }}>
                  <p style={labelStyle} className="mb-3">Endereço</p>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-on-light)' }}>
                    Rua Dr. Eduardo de Souza Aranha, 153<br />
                    6º andar · São Paulo/SP
                  </p>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.12)' }}>
                  <p style={labelStyle} className="mb-3">Horário de atendimento</p>
                  <p className="text-base" style={{ color: 'var(--color-text-on-light)' }}>
                    Segunda a sexta, 9h–18h
                  </p>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: 'rgb(var(--ink-rgb) / 0.12)' }}>
                  <p style={labelStyle} className="mb-4">Redes sociais</p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.linkedin.com/company/solar-capital-adm/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--color-text-on-light)' }}
                    >
                      LinkedIn →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
