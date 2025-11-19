import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const orderId = searchParams.get('orderId')
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }

    if (orderId) {
      fetchOrder()
    } else {
      setLoading(false)
    }
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${API_URL}/checkout/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setOrder(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching order:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated()) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
        <Navbar showAuthButtons={true} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-slate-600">Carregando...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar showAuthButtons={true} />
      
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Compra Confirmada!</h1>
            <p className="text-slate-600">
              Sua assinatura foi ativada com sucesso
            </p>
          </div>

          {order && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Plano</span>
                  <span className="font-semibold text-slate-900">{order.plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Valor</span>
                  <span className="font-semibold text-slate-900">
                    R$ {parseFloat(order.amount).toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {order.status === 'paid' ? 'Pago' : 'Pendente'}
                  </span>
                </div>
                {order.paymentMethod && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Método de Pagamento</span>
                    <span className="font-semibold text-slate-900 capitalize">
                      {order.paymentMethod === 'credit_card' ? 'Cartão de Crédito' : 
                       order.paymentMethod === 'pix' ? 'PIX' : 
                       order.paymentMethod === 'boleto' ? 'Boleto' : order.paymentMethod}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-slate-600">Número do Pedido</span>
                  <span className="font-mono text-sm text-slate-900">#{order.id}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Link
              to="/home"
              className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold text-lg shadow-lg"
            >
              Acessar Dashboard →
            </Link>
            <div>
              <Link
                to="/"
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                Voltar para a página inicial
              </Link>
            </div>
          </div>

          {/* Onboarding Steps */}
          <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Próximos Passos</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium text-slate-900">Verifique seu e-mail</p>
                  <p className="text-sm text-slate-600">Enviamos as credenciais de acesso e instruções de configuração</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium text-slate-900">Configure sua IA</p>
                  <p className="text-sm text-slate-600">Personalize a IA com dados do seu negócio e processos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium text-slate-900">Conecte seus canais</p>
                  <p className="text-sm text-slate-600">Integre WhatsApp, webchat ou e-mail em minutos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-semibold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium text-slate-900">Comece a atender</p>
                  <p className="text-sm text-slate-600">Sua IA está pronta para trabalhar 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Precisa de ajuda?</strong> Nossa equipe está pronta para te ajudar no onboarding. Entre em contato pelo{' '}
              <a href="https://api.whatsapp.com/send/?phone=556198431746" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                WhatsApp
              </a>
              {' '}ou{' '}
              <a href="mailto:contato@swaybrasil.com" className="underline font-semibold">
                e-mail
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CheckoutSuccess

