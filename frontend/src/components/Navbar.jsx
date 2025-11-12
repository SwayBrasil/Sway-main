import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'

function Navbar({ showAuthButtons = true }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  useEffect(() => {
    // Mobile menu toggle
    const btn = document.getElementById('btnMenu')
    const menu = document.getElementById('mobileMenu')
    if (btn && menu) {
      const handleClick = () => menu.classList.toggle('hidden')
      btn.addEventListener('click', handleClick)
      return () => btn.removeEventListener('click', handleClick)
    }
  }, [])

  const handleNavClick = (e, hash) => {
    if (location.pathname !== '/') {
      // Se não estiver na Landing, navegar para lá primeiro
      e.preventDefault()
      window.location.href = `/${hash}`
    }
    // Se já estiver na Landing, o smooth scroll será tratado pelo useEffect da Landing
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-extrabold tracking-tight">SWAY</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="/#produto" onClick={(e) => handleNavClick(e, '#produto')} className="hover:text-primary-700">Produto</a>
            <a href="/#como-funciona" onClick={(e) => handleNavClick(e, '#como-funciona')} className="hover:text-primary-700">Como funciona</a>
            <a href="/#verticais" onClick={(e) => handleNavClick(e, '#verticais')} className="hover:text-primary-700">Setores</a>
            <a href="/#planos" onClick={(e) => handleNavClick(e, '#planos')} className="hover:text-primary-700">Planos</a>
            <a href="/#faq" onClick={(e) => handleNavClick(e, '#faq')} className="hover:text-primary-700">FAQ</a>
          </nav>
          {showAuthButtons && (
            <div className="flex items-center gap-3">
              <a
                href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20ver%20a%20IA%20em%20a%C3%A7%C3%A3o%20da%20SWAY&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block cta-button px-4 py-2 rounded-lg border border-slate-300"
                data-event="view_demo"
              >
                Ver IA em ação
              </a>
              {isAuthenticated() ? (
                <Link to="/home" className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 text-sm font-medium">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 text-sm font-medium">
                    Entrar
                  </Link>
                  <Link to="/register" className="hidden md:block px-4 py-2 rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 text-sm font-medium">
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          )}
          <button id="btnMenu" className="md:hidden p-2 rounded-lg border border-slate-300" aria-label="Abrir menu">
            ☰
          </button>
        </div>
      </div>
      {/* mobile */}
      <div id="mobileMenu" className="md:hidden hidden border-t border-slate-200 bg-white">
        <nav className="px-4 py-3 flex flex-col gap-3 text-sm">
          <a href="/#produto" onClick={(e) => handleNavClick(e, '#produto')} className="hover:text-primary-700">Produto</a>
          <a href="/#como-funciona" onClick={(e) => handleNavClick(e, '#como-funciona')} className="hover:text-primary-700">Como funciona</a>
          <a href="/#verticais" onClick={(e) => handleNavClick(e, '#verticais')} className="hover:text-primary-700">Setores</a>
          <a href="/#planos" onClick={(e) => handleNavClick(e, '#planos')} className="hover:text-primary-700">Planos</a>
          <a href="/#faq" onClick={(e) => handleNavClick(e, '#faq')} className="hover:text-primary-700">FAQ</a>
          {showAuthButtons && (
            <>
              <a
                href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20ver%20a%20IA%20em%20a%C3%A7%C3%A3o%20da%20SWAY&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button px-4 py-2 rounded-lg border border-slate-300"
                data-event="view_demo"
              >
                Ver IA em ação
              </a>
              {isAuthenticated() ? (
                <Link to="/home" className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
                    Entrar
                  </Link>
                  <Link to="/register" className="px-4 py-2 rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50">
                    Cadastrar
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar

