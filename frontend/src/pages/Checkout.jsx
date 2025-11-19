import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function Checkout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const planName = searchParams.get('plan') || 'Start'
  
  const [plan, setPlan] = useState(null)
  const [step, setStep] = useState(1) // 1: Dados, 2: Pagamento, 3: Revisão
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form data
  const [companyData, setCompanyData] = useState({
    companyName: '',
    cnpj: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(`/login?redirect=/checkout?plan=${planName}`)
      return
    }

    fetchPlan()
  }, [planName])

  const fetchPlan = async () => {
    try {
      const response = await axios.get(`${API_URL}/checkout/plan/${planName}`)
      if (response.data.success) {
        setPlan(response.data.data)
      }
    } catch (err) {
      setError('Erro ao carregar informações do plano')
    }
  }

  const handleNext = () => {
    if (step === 1) {
      // Validar dados da empresa
      if (!companyData.companyName || !companyData.cnpj || !companyData.phone) {
        setError('Preencha todos os campos obrigatórios')
        return
      }
      setStep(2)
    } else if (step === 2) {
      // Validar método de pagamento
      if (paymentMethod === 'credit_card') {
        if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
          setError('Preencha todos os dados do cartão')
          return
        }
      }
      setStep(3)
    }
    setError('')
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      setError('')
    }
  }

  const handleCheckout = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${API_URL}/checkout/order`,
        { 
          planName, 
          paymentMethod,
          companyData,
          cardData: paymentMethod === 'credit_card' ? cardData : null
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        // Simular pagamento bem-sucedido após 2 segundos
        if (paymentMethod === 'credit_card') {
          setTimeout(async () => {
            try {
              await axios.post(`${API_URL}/checkout/payment/confirm`, {
                orderId: response.data.data.orderId,
                paymentId: `pay_${Date.now()}`,
                status: 'paid'
              })
              
              navigate(`/checkout/success?orderId=${response.data.data.orderId}`)
            } catch (err) {
              setError('Erro ao processar pagamento')
              setLoading(false)
            }
          }, 2000)
        } else {
          // Para PIX ou Boleto, mostrar QR code ou código
          navigate(`/checkout/pending?orderId=${response.data.data.orderId}`)
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao processar pedido')
      setLoading(false)
    }
  }

  if (!isAuthenticated()) {
    return null
  }

  if (!plan) {
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
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1 ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {step > 1 ? '✓' : '1'}
                </div>
                <span className={`ml-2 font-medium ${step >= 1 ? 'text-primary-600' : 'text-slate-600'}`}>
                  Dados da Empresa
                </span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary-600' : 'bg-slate-200'}`}></div>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2 ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {step > 2 ? '✓' : '2'}
                </div>
                <span className={`ml-2 font-medium ${step >= 2 ? 'text-primary-600' : 'text-slate-600'}`}>
                  Pagamento
                </span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-primary-600' : 'bg-slate-200'}`}></div>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 3 ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  3
                </div>
                <span className={`ml-2 font-medium ${step >= 3 ? 'text-primary-600' : 'text-slate-600'}`}>
                  Revisão
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {/* Step 1: Company Data */}
              {step === 1 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-2xl font-semibold mb-6">Dados da Empresa</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Razão Social <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Nome da sua empresa"
                        value={companyData.companyName}
                        onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CNPJ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="00.000.000/0000-00"
                          value={companyData.cnpj}
                          onChange={(e) => setCompanyData({...companyData, cnpj: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Telefone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="(00) 00000-0000"
                          value={companyData.phone}
                          onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Endereço
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Rua, número, complemento"
                        value={companyData.address}
                        onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Cidade
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Cidade"
                          value={companyData.city}
                          onChange={(e) => setCompanyData({...companyData, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Estado
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="UF"
                          value={companyData.state}
                          onChange={(e) => setCompanyData({...companyData, state: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CEP
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="00000-000"
                          value={companyData.zipCode}
                          onChange={(e) => setCompanyData({...companyData, zipCode: e.target.value})}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-2xl font-semibold mb-6">Método de Pagamento</h2>
                  
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center p-4 border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={paymentMethod === 'credit_card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-slate-900">Cartão de Crédito</span>
                        <p className="text-xs text-slate-600">Aprovação imediata</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs">Visa</span>
                        <span className="text-xs">Master</span>
                        <span className="text-xs">Elo</span>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pix"
                        checked={paymentMethod === 'pix'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-slate-900">PIX</span>
                        <p className="text-xs text-slate-600">Aprovação em até 1 minuto</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border-2 border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="boleto"
                        checked={paymentMethod === 'boleto'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-slate-900">Boleto Bancário</span>
                        <p className="text-xs text-slate-600">Aprovação em até 2 dias úteis</p>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'credit_card' && (
                    <div className="space-y-4 border-t border-slate-200 pt-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="0000 0000 0000 0000"
                          value={cardData.number}
                          onChange={(e) => setCardData({...cardData, number: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Nome no Cartão
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Nome como está no cartão"
                          value={cardData.name}
                          onChange={(e) => setCardData({...cardData, name: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Validade
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="MM/AA"
                            value={cardData.expiry}
                            onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="000"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Seus dados estão seguros e criptografados
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h2 className="text-2xl font-semibold mb-6">Revisar Pedido</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Plano Selecionado</h3>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-slate-900">{plan.name}</p>
                            <p className="text-sm text-slate-600">{plan.description}</p>
                          </div>
                          <p className="text-xl font-bold text-slate-900">
                            R$ {plan.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Dados da Empresa</h3>
                      <div className="bg-slate-50 rounded-lg p-4 space-y-1 text-sm">
                        <p><strong>Razão Social:</strong> {companyData.companyName}</p>
                        <p><strong>CNPJ:</strong> {companyData.cnpj}</p>
                        <p><strong>Telefone:</strong> {companyData.phone}</p>
                        {companyData.address && <p><strong>Endereço:</strong> {companyData.address}</p>}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Pagamento</h3>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm">
                          <strong>Método:</strong> {
                            paymentMethod === 'credit_card' ? 'Cartão de Crédito' :
                            paymentMethod === 'pix' ? 'PIX' :
                            'Boleto Bancário'
                          }
                        </p>
                        {paymentMethod === 'credit_card' && (
                          <p className="text-xs text-slate-600 mt-1">
                            Cartão terminado em {cardData.number.slice(-4)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600">Subtotal</span>
                        <span className="font-semibold">R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600">Desconto (14 dias grátis)</span>
                        <span className="text-green-600 font-semibold">-R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                        <span className="text-lg font-semibold text-slate-900">Total hoje</span>
                        <span className="text-2xl font-bold text-slate-900">R$ 0,00</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Após 14 dias: R$ {plan.price.toFixed(2).replace('.', ',')}/mês
                      </p>
                    </div>

                    <form onSubmit={handleCheckout}>
                      <div className="flex items-start gap-2 text-xs text-slate-600 mb-4">
                        <input type="checkbox" required className="mt-1" />
                        <label>
                          Concordo com os{' '}
                          <Link to="/termos" className="text-primary-600 hover:underline" target="_blank">
                            Termos de Uso
                          </Link>
                          {' '}e{' '}
                          <Link to="/privacidade" className="text-primary-600 hover:underline" target="_blank">
                            Política de Privacidade
                          </Link>
                        </label>
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                      >
                        {loading ? 'Processando...' : 'Confirmar e Finalizar Compra'}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {step < 3 && (
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 1}
                    className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                  >
                    Continuar →
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
                <h3 className="font-semibold text-slate-900 mb-4">Resumo do Pedido</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{plan.name}</p>
                    <p className="text-xs text-slate-600">{plan.description}</p>
                  </div>
                  <div className="border-t border-slate-200 pt-4 space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start text-sm">
                        <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600">Valor mensal</span>
                      <span className="font-semibold text-slate-900">
                        R$ {plan.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-green-600">14 dias grátis</span>
                      <span className="text-sm text-green-600 font-semibold">-R$ {plan.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                      <span className="font-semibold text-slate-900">Total hoje</span>
                      <span className="text-xl font-bold text-slate-900">R$ 0,00</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Após 14 dias: R$ {plan.price.toFixed(2).replace('.', ',')}/mês
                    </p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>14 dias grátis • Cancele quando quiser</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>LGPD compliant • Dados seguros</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span>Suporte em português</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Checkout
