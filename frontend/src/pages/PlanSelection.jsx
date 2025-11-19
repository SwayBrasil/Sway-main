import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const PLANS = {
  Start: {
    name: 'Start',
    price: 299.00,
    monthlyPrice: 299.00,
    description: '1 canal, 1 IA vertical',
    features: ['Até 2 usuários', '5k mensagens/mês', 'Suporte por e-mail'],
    popular: false
  },
  Pro: {
    name: 'Pro',
    price: 799.00,
    monthlyPrice: 799.00,
    description: '2 canais, 2 IAs verticais',
    features: ['Até 8 usuários', '20k mensagens/mês', 'Suporte prioritário'],
    popular: true
  },
  Enterprise: {
    name: 'Enterprise',
    price: 1999.00,
    monthlyPrice: 1999.00,
    description: 'Omnichannel + múltiplas IAs',
    features: ['Usuários ilimitados', 'SLA e integrações', 'Onboarding assistido'],
    popular: false
  }
}

function PlanSelection() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const selectedPlan = searchParams.get('plan') || 'Pro'
  const [plan, setPlan] = useState(PLANS[selectedPlan] || PLANS.Pro)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(`/login?redirect=/plan-selection?plan=${selectedPlan}`)
      return
    }
  }, [selectedPlan, isAuthenticated, navigate])

  const handleSelectPlan = (planName) => {
    setPlan(PLANS[planName])
  }

  const handleContinue = () => {
    navigate(`/checkout?plan=${plan.name}`)
  }

  if (!isAuthenticated()) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar showAuthButtons={true} />
      
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Escolha o plano ideal para você
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Todos os planos incluem teste gratuito de 14 dias. Cancele quando quiser, sem compromisso.
            </p>
          </div>

          {/* Planos */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(PLANS).map(([key, planData]) => (
              <div
                key={key}
                className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
                  plan.name === planData.name
                    ? 'bg-primary-50 border-primary-500 shadow-lg scale-105'
                    : 'bg-white border-slate-200 hover:border-primary-300 hover:shadow-md'
                } ${planData.popular ? 'ring-2 ring-primary-500' : ''}`}
                onClick={() => handleSelectPlan(key)}
              >
                {planData.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">{planData.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{planData.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-slate-900">
                      R$ {planData.monthlyPrice.toFixed(0)}
                    </span>
                    <span className="text-slate-600 ml-2">/mês</span>
                  </div>
                  <p className="text-xs text-slate-500 text-center mt-1">
                    Teste grátis por 14 dias
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {planData.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={`w-full py-2 px-4 rounded-lg text-center font-medium transition-colors ${
                  plan.name === planData.name
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {plan.name === planData.name ? '✓ Selecionado' : 'Selecionar'}
                </div>
              </div>
            ))}
          </div>

          {/* Comparação de Planos */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Comparação de Recursos</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Recurso</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900">Start</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900">Pro</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 text-slate-700">Usuários</td>
                    <td className="text-center py-3 px-4">Até 2</td>
                    <td className="text-center py-3 px-4">Até 8</td>
                    <td className="text-center py-3 px-4">Ilimitados</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 text-slate-700">Mensagens/mês</td>
                    <td className="text-center py-3 px-4">5.000</td>
                    <td className="text-center py-3 px-4">20.000</td>
                    <td className="text-center py-3 px-4">Ilimitadas</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 text-slate-700">Canais</td>
                    <td className="text-center py-3 px-4">1</td>
                    <td className="text-center py-3 px-4">2</td>
                    <td className="text-center py-3 px-4">Ilimitados</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 text-slate-700">IAs Verticais</td>
                    <td className="text-center py-3 px-4">1</td>
                    <td className="text-center py-3 px-4">2</td>
                    <td className="text-center py-3 px-4">Ilimitadas</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 text-slate-700">Suporte</td>
                    <td className="text-center py-3 px-4">E-mail</td>
                    <td className="text-center py-3 px-4">Prioritário</td>
                    <td className="text-center py-3 px-4">Dedicado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Garantias e Selos */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h4 className="font-semibold text-slate-900 mb-1">Seguro e Confiável</h4>
              <p className="text-xs text-slate-600">LGPD compliant • Criptografia SSL</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
              <div className="text-3xl mb-2">↩️</div>
              <h4 className="font-semibold text-slate-900 mb-1">Cancele Quando Quiser</h4>
              <p className="text-xs text-slate-600">Sem multa • Sem burocracia</p>
            </div>
            <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
              <div className="text-3xl mb-2">✅</div>
              <h4 className="font-semibold text-slate-900 mb-1">14 Dias Grátis</h4>
              <p className="text-xs text-slate-600">Teste completo • Sem cartão</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">
              Plano {plan.name} selecionado
            </h3>
            <p className="text-primary-100 mb-6">
              R$ {plan.monthlyPrice.toFixed(2).replace('.', ',')}/mês • Teste grátis por 14 dias
            </p>
            <button
              onClick={handleContinue}
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors shadow-lg"
            >
              Continuar para Checkout →
            </button>
            <p className="text-xs text-primary-100 mt-4">
              Você só será cobrado após o período de teste
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PlanSelection


