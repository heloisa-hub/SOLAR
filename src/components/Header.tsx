import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { SolarWordmark } from './SolarLogo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/solucoes', label: 'Soluções para Empresas' },
  { to: '/fundos', label: 'Fundos' },
  { to: '/sobre', label: 'Sobre a Solar' },
]

export default function Header() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (to: string) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to)

  // Quanto mais rola pra baixo, mais transparente o cabeçalho fica.
  const scrollProgress = Math.min(scrollY / 360, 1)
  const bgOpacity = 0.94 - scrollProgress * 0.62

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: `rgba(12, 15, 46, ${bgOpacity})`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="site-container">
        <div className="flex items-center justify-between" style={{ height: '90px' }}>
          <Link to="/" aria-label="Solar Capital — Início" className="flex-shrink-0">
            <SolarWordmark symbolColor="#F5A623" textColor="#ffffff" size="md" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-10 mx-auto">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                aria-current={isActive(to) ? 'page' : undefined}
                className="relative text-sm font-medium whitespace-nowrap transition-colors duration-200"
                style={{
                  color: isActive(to) ? '#F5A623' : 'rgba(255,255,255,0.75)',
                }}
              >
                {label}
                {isActive(to) && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: '#F5A623' }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/contato"
              className="hidden xl:inline-flex items-center px-6 py-2.5 text-sm font-semibold uppercase tracking-wider rounded transition-all duration-200"
              style={{
                background: '#F5A623',
                color: '#0C0F2E',
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.background = '#CF8A1A')}
              onMouseLeave={e => ((e.target as HTMLElement).style.background = '#F5A623')}
            >
              Fale com a Solar
            </Link>

            {/* Mobile menu button */}
            <button
              className="xl:hidden p-2 text-white"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span
                  className="block h-px bg-white transition-all duration-200"
                  style={{ transform: mobileOpen ? 'rotate(45deg) translate(2px, 9px)' : 'none', width: '100%' }}
                />
                <span
                  className="block h-px bg-white transition-all duration-200"
                  style={{ opacity: mobileOpen ? 0 : 1, width: '100%' }}
                />
                <span
                  className="block h-px bg-white transition-all duration-200"
                  style={{ transform: mobileOpen ? 'rotate(-45deg) translate(2px, -9px)' : 'none', width: '100%' }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="xl:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? '400px' : '0',
          background: 'rgba(12, 15, 46, 0.98)',
          borderTop: mobileOpen ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <div className="site-container py-6 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-base font-medium py-1"
              style={{ color: isActive(to) ? '#F5A623' : 'rgba(255,255,255,0.8)' }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contato"
            className="mt-2 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded"
            style={{ background: '#F5A623', color: '#0C0F2E' }}
          >
            Fale com a Solar
          </Link>
        </div>
      </div>
    </header>
  )
}
