import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="py-12 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-white font-semibold mb-3">SWAY Brasil</h4>
            <p className="text-sm text-slate-400">Soluções de atendimento com IA vertical para empresas brasileiras.</p>
            <p className="text-sm text-slate-500 mt-2">CNPJ: 62.557.381/0001-61</p>
            <p className="text-sm text-slate-500">Brasil • Brasília, DF</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contato</h4>
            <p className="text-sm">
              <a href="mailto:contato@swaybrasil.com" className="hover:text-white">contato@swaybrasil.com</a>
            </p>
            <p className="text-sm mt-2">
              <a href="https://api.whatsapp.com/send/?phone=556198431746" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                +55 (61) 98431-7466
              </a>
            </p>
            <p className="text-sm mt-2">
              <a href="https://www.instagram.com/sway_brasil/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram: @sway_brasil
              </a>
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/termos" className="hover:text-white">Termos de Uso</Link>
              <Link to="/privacidade" className="hover:text-white">Política de Privacidade</Link>
              <Link to="/privacidade#7" className="hover:text-white">LGPD</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} SWAY Brasil. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="https://www.instagram.com/sway_brasil/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

