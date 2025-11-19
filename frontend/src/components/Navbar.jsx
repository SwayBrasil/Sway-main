import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useEffect } from 'react'

function Navbar({ showAuthButtons = true, variant = 'public' }) {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

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

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Se estiver autenticado e variant for 'authenticated', mostrar navbar de dashboard
  const isAuthenticatedNav = variant === 'authenticated' || (isAuthenticated() && location.pathname.startsWith('/home'))

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={isAuthenticatedNav ? "/home" : "/"} className="flex items-center gap-2 flex-shrink-0 group">
            <span className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-primary-600 transition-colors">SWAY</span>
          </Link>
          
          {/* Navigation Links - Centralizado */}
          {isAuthenticatedNav ? (
            <nav className="hidden md:flex items-center gap-1 text-sm flex-1 justify-center">
              <Link 
                to="/home" 
                className={`px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200 ${
                  location.pathname === '/home' ? 'text-primary-600 bg-primary-50 font-medium' : ''
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/home/conversations" 
                className={`px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200 ${
                  location.pathname === '/home/conversations' ? 'text-primary-600 bg-primary-50 font-medium' : ''
                }`}
              >
                Conversas
              </Link>
              <Link 
                to="/home/analytics" 
                className={`px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200 ${
                  location.pathname === '/home/analytics' ? 'text-primary-600 bg-primary-50 font-medium' : ''
                }`}
              >
                Analytics
              </Link>
              <Link 
                to="/home/settings" 
                className={`px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200 ${
                  location.pathname === '/home/settings' ? 'text-primary-600 bg-primary-50 font-medium' : ''
                }`}
              >
                Configurações
              </Link>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center gap-1 text-sm flex-1 justify-center">
              <a 
                href="/#produto" 
                onClick={(e) => handleNavClick(e, '#produto')} 
                className="px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
              >
                Produto
              </a>
              <a 
                href="/#como-funciona" 
                onClick={(e) => handleNavClick(e, '#como-funciona')} 
                className="px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
              >
                Como funciona
              </a>
              <a 
                href="/#verticais" 
                onClick={(e) => handleNavClick(e, '#verticais')} 
                className="px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
              >
                Setores
              </a>
              <a 
                href="/#planos" 
                onClick={(e) => handleNavClick(e, '#planos')} 
                className="px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
              >
                Planos
              </a>
              <a 
                href="/#faq" 
                onClick={(e) => handleNavClick(e, '#faq')} 
                className="px-3 py-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
              >
                FAQ
              </a>
            </nav>
          )}
          
          {/* Right Side - Botões e Menu Mobile */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {isAuthenticatedNav ? (
              <>
                {/* User Menu */}
                <div className="hidden md:flex items-center gap-2">
                  <Link 
                    to="/home/profile" 
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold group-hover:bg-primary-700 transition-colors">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">{user?.name || 'Usuário'}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 text-sm font-medium"
                  >
                    Sair
                  </button>
                </div>
              </>
            ) : (
              showAuthButtons && (
                <>
                  {isAuthenticated() ? (
                    <Link to="/home" className="btn-primary text-sm">
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link to="/login" className="btn-primary text-sm">
                        Entrar
                      </Link>
                      <Link to="/register" className="hidden md:block btn-secondary text-sm">
                        Cadastrar
                      </Link>
                    </>
                  )}
                </>
              )
            )}
            <button id="btnMenu" className="md:hidden p-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-all duration-200" aria-label="Abrir menu">
              <svg className="w-5 h-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div id="mobileMenu" className="md:hidden hidden border-t border-neutral-200 bg-white animate-slide-up">
        <nav className="px-4 py-3 flex flex-col gap-1 text-sm">
          {isAuthenticatedNav ? (
            <>
              <Link 
                to="/home" 
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/home' 
                    ? 'text-primary-600 bg-primary-50 font-medium' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/home/conversations" 
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/home/conversations' 
                    ? 'text-primary-600 bg-primary-50 font-medium' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                Conversas
              </Link>
              <Link 
                to="/home/analytics" 
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/home/analytics' 
                    ? 'text-primary-600 bg-primary-50 font-medium' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                Analytics
              </Link>
              <Link 
                to="/home/settings" 
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/home/settings' 
                    ? 'text-primary-600 bg-primary-50 font-medium' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                Configurações
              </Link>
              <div className="pt-3 mt-3 border-t border-neutral-200">
                <Link 
                  to="/home/profile" 
                  className="flex items-center gap-2.5 mb-3 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-neutral-700">{user?.name || 'Usuário'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 text-sm font-medium transition-all duration-200"
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <>
              <a href="/#produto" onClick={(e) => handleNavClick(e, '#produto')} className="text-slate-700 hover:text-primary-700 transition-colors">Produto</a>
              <a href="/#como-funciona" onClick={(e) => handleNavClick(e, '#como-funciona')} className="text-slate-700 hover:text-primary-700 transition-colors">Como funciona</a>
              <a href="/#verticais" onClick={(e) => handleNavClick(e, '#verticais')} className="text-slate-700 hover:text-primary-700 transition-colors">Setores</a>
              <a href="/#planos" onClick={(e) => handleNavClick(e, '#planos')} className="text-slate-700 hover:text-primary-700 transition-colors">Planos</a>
              <a href="/#faq" onClick={(e) => handleNavClick(e, '#faq')} className="text-slate-700 hover:text-primary-700 transition-colors">FAQ</a>
              {showAuthButtons && (
                <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar

