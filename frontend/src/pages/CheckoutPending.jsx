import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function CheckoutPending() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const orderId = searchParams.get('orderId')
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [checkingPayment, setCheckingPayment] = useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }

    if (orderId) {
      fetchOrder()
      // Verificar pagamento a cada 5 segundos
      const interval = setInterval(() => {
        checkPaymentStatus()
      }, 5000)
      
      return () => clearInterval(interval)
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
        
        // Se já foi pago, redirecionar
        if (response.data.data.status === 'paid') {
          navigate(`/checkout/success?orderId=${orderId}`)
        }
      }
    } catch (err) {
      console.error('Error fetching order:', err)
    } finally {
      setLoading(false)
    }
  }

  const checkPaymentStatus = async () => {
    if (checkingPayment) return
    
    setCheckingPayment(true)
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

      if (response.data.success && response.data.data.status === 'paid') {
        navigate(`/checkout/success?orderId=${orderId}`)
      }
    } catch (err) {
      console.error('Error checking payment:', err)
    } finally {
      setCheckingPayment(false)
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

  const isPix = order?.paymentMethod === 'pix'
  const isBoleto = order?.paymentMethod === 'boleto'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar showAuthButtons={true} />
      
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {isPix ? 'Aguardando Pagamento PIX' : 'Aguardando Pagamento do Boleto'}
            </h1>
            <p className="text-slate-600">
              {isPix 
                ? 'Complete o pagamento para ativar sua assinatura'
                : 'Após o pagamento, sua assinatura será ativada em até 2 dias úteis'}
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
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    Aguardando Pagamento
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="text-slate-600">Número do Pedido</span>
                  <span className="font-mono text-sm text-slate-900">#{order.id}</span>
                </div>
              </div>
            </div>
          )}

          {isPix && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">QR Code PIX</h3>
              <div className="bg-slate-100 rounded-lg p-8 flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-slate-400 text-sm">QR Code PIX</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Escaneie com o app do seu banco
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Código PIX (Copiar e Colar)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value="00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000520400005303986540529.905802BR5925SWAY BRASIL LTDA6009BRASILIA62070503***6304ABCD"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-xs font-mono"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000520400005303986540529.905802BR5925SWAY BRASIL LTDA6009BRASILIA62070503***6304ABCD")
                      alert('Código PIX copiado!')
                    }}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
                  >
                    Copiar
                  </button>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Importante:</strong> O pagamento é confirmado automaticamente em até 1 minuto após a transferência.
                </p>
              </div>
            </div>
          )}

          {isBoleto && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">Boleto Bancário</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Código de Barras
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value="34191.79001 01043.510047 91020.150008 1 84460000029900"
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-sm font-mono"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("34191.79001 01043.510047 91020.150008 1 84460000029900")
                        alert('Código copiado!')
                      }}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
                    >
                      Copiar
                    </button>
                  </div>
                </div>
                <a
                  href="#"
                  className="block w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center font-medium"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Download do boleto iniciado')
                  }}
                >
                  Baixar Boleto PDF
                </a>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Atenção:</strong> O boleto vence em 3 dias. Após o pagamento, a confirmação pode levar até 2 dias úteis.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-slate-700">
                <p className="font-semibold mb-1">Verificação Automática</p>
                <p>Estamos verificando o pagamento automaticamente. Você será redirecionado assim que a confirmação chegar.</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Link
              to="/home"
              className="inline-block px-6 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
            >
              Voltar para Dashboard
            </Link>
            <div>
              <Link
                to="/"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Voltar para a página inicial
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CheckoutPending


