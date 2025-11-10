import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Landing() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/assets/img/logo-sway.png" alt="SWAY" className="h-8" />
              <span className="text-xl font-bold text-slate-900">SWAY</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#produto" className="hover:text-primary-700">Produto</a>
              <a href="#como-funciona" className="hover:text-primary-700">Como funciona</a>
              <a href="#verticais" className="hover:text-primary-700">Setores</a>
              <a href="#planos" className="hover:text-primary-700">Planos</a>
              <a href="#faq" className="hover:text-primary-700">FAQ</a>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20ver%20a%20IA%20em%20a%C3%A7%C3%A3o%20da%20SWAY"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
              >
                Ver IA em ação
              </a>
              {isAuthenticated() ? (
                <Link to="/home" className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">
                    Entrar
                  </Link>
                  <Link to="/register" className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
                    Cadastrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl">
              IA de Atendimento Vertical para Empresas Brasileiras
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl">
              Chatbot inteligente especializado por setor (clínicas, advocacia, vendas) que trabalha 24h, reduz 70% da carga operacional e aumenta conversões com handover automático para sua equipe.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
              <a
                href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20ver%20a%20IA%20em%20a%C3%A7%C3%A3o%20da%20SWAY"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 font-semibold shadow-lg transition-all"
              >
                Ver IA em ação
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20agendar%20uma%20conversa%20com%20especialista%20sobre%20a%20SWAY"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold"
              >
                Agendar conversa com especialista
              </a>
            </div>
            <div className="mt-6 text-sm text-slate-500">
              Respostas em segundos • Atendimento 24/7 • Reduza 70% da carga da sua equipe em 7 dias
            </div>
          </div>
        </div>
      </section>

      {/* Resto do conteúdo da landing page pode ser adicionado aqui */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">SWAY Brasil</h3>
              <p className="text-sm text-slate-400">
                IA de atendimento vertical para empresas brasileiras.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/termos" className="hover:text-white">Termos de Uso</Link></li>
                <li><Link to="/privacidade" className="hover:text-white">Política de Privacidade</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <p className="text-sm text-slate-400">Brasília, DF</p>
              <p className="text-sm text-slate-400">CNPJ: 62.557.381/0001-61</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <a
                href="https://www.instagram.com/sway_brasil/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-white"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing

