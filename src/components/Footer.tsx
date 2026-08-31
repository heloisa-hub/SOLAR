import { Link } from 'react-router'
import { SolarWordmark } from './SolarLogo'

const fundLinks = [
  { to: '/fundos/solar-fidc-multissetorial', label: 'Solar FIDC Multissetorial' },
  { to: '/fundos/solar-puglia-fidc-rl', label: 'Solar Puglia FIDC' },
  { to: '/fundos/solar-vialoc-fidc', label: 'Solar Vialoc FIDC' },
  { to: '/fundos/solar-belmonte-fidc', label: 'Solar Belmonte FIDC' },
]

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/solucoes', label: 'Soluções para Empresas' },
  { to: '/fundos', label: 'Fundos' },
  { to: '/sobre', label: 'Sobre a Solar' },
  { to: '/contato', label: 'Fale com a Solar' },
]

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-surface-dark)' }}>
      <div className="site-container py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Logo + tagline + redes + copyright */}
          <div className="lg:col-span-1">
            <SolarWordmark size="md" align="start" className="mb-5" />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Crédito estruturado para a economia real. Originação, estruturação e gestão de operações de crédito.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.linkedin.com/company/solar-capital-adm/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center border border-white/20 text-white/60 hover:border-solar-amber hover:text-solar-amber transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
            <p className="text-white/30 text-xs mt-5">© 2026 Solar Capital. Todos os direitos reservados.</p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Navegação</p>
            <ul className="space-y-2.5">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Funds */}
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Nossos Fundos</p>
            <ul className="space-y-2.5">
              {fundLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Contato</p>
            <ul className="space-y-2.5 text-white/60 text-sm">
              <li>contato@solarcapital.com.br</li>
              <li>+55 11 3856-1545</li>
              <li className="leading-relaxed">
                Rua Dr. Eduardo de Souza Aranha, 153<br />
                6º andar · São Paulo/SP
              </li>
              <li className="text-white/40">Seg–Sex, 9h–18h</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer — nota de rodapé, discreta, ao longo de toda a largura */}
        <div className="mt-10 pt-5 border-t border-white/10">
          <p className="text-white/25 leading-relaxed" style={{ fontSize: 'var(--text-label-size)' }}>
            Fundos de investimento não contam com garantia do administrador do fundo, do gestor da carteira, de qualquer mecanismo de seguro ou do Fundo Garantidor de Créditos — FGC. A rentabilidade obtida no passado não representa garantia de rentabilidade futura. Ao investidor é recomendada a leitura cuidadosa do regulamento e da lâmina de informações essenciais antes de aplicar seus recursos. Investimentos em fundos de investimento em direitos creditórios são destinados a investidores qualificados ou profissionais, conforme o regulamento de cada fundo.
          </p>
        </div>
      </div>
    </footer>
  )
}
