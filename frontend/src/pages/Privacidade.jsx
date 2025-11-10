import { Link } from 'react-router-dom'

function Privacidade() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="text-primary-600 hover:text-primary-700 mb-8 inline-block">
          ← Voltar
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Política de Privacidade</h1>
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600">
            Conteúdo da política de privacidade será adicionado aqui...
          </p>
        </div>
      </div>
    </div>
  )
}

export default Privacidade

