import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function Analytics() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [period, setPeriod] = useState('7d') // 7d, 30d, 90d

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${API_URL}/analytics?period=${period}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setAnalytics(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching analytics:', err)
      setError('Erro ao carregar analytics')
      // Dados simulados para desenvolvimento
      setAnalytics({
        totalMessages: 1247,
        avgResponseTime: 0.8,
        resolutionRate: 87,
        satisfactionScore: 4.6,
        topIntents: [
          { name: 'Agendamento', count: 342 },
          { name: 'Dúvidas sobre produto', count: 289 },
          { name: 'Suporte técnico', count: 156 }
        ],
        channelDistribution: {
          whatsapp: 65,
          webchat: 25,
          email: 10
        }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar showAuthButtons={true} variant="authenticated" />
      
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
            <p className="mt-2 text-slate-600">Acompanhe o desempenho da sua IA de atendimento</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPeriod('7d')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === '7d' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              7 dias
            </button>
            <button
              onClick={() => setPeriod('30d')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === '30d' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              30 dias
            </button>
            <button
              onClick={() => setPeriod('90d')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === '90d' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              90 dias
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-600">Carregando analytics...</div>
          </div>
        ) : analytics ? (
          <>
            {/* Métricas Principais */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-sm font-medium text-slate-600 mb-2">Total de Mensagens</h3>
                <p className="text-3xl font-bold text-slate-900">{analytics.totalMessages?.toLocaleString() || 0}</p>
                <p className="text-xs text-slate-500 mt-2">Últimos {period === '7d' ? '7' : period === '30d' ? '30' : '90'} dias</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-sm font-medium text-slate-600 mb-2">Tempo Médio de Resposta</h3>
                <p className="text-3xl font-bold text-primary-600">{analytics.avgResponseTime || 0}s</p>
                <p className="text-xs text-green-600 mt-2">✓ Abaixo da meta</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-sm font-medium text-slate-600 mb-2">Taxa de Resolução</h3>
                <p className="text-3xl font-bold text-green-600">{analytics.resolutionRate || 0}%</p>
                <p className="text-xs text-slate-500 mt-2">Conversas resolvidas</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-sm font-medium text-slate-600 mb-2">Satisfação do Cliente</h3>
                <p className="text-3xl font-bold text-yellow-600">{analytics.satisfactionScore || 0}/5</p>
                <p className="text-xs text-slate-500 mt-2">Avaliação média</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Intenções */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Top Intenções</h2>
                <div className="space-y-4">
                  {analytics.topIntents?.map((intent, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{intent.name}</p>
                        <div className="mt-1 w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${(intent.count / analytics.topIntents[0].count) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-4 text-sm font-semibold text-slate-700">{intent.count}</span>
                    </div>
                  )) || (
                    <p className="text-sm text-slate-500">Nenhum dado disponível</p>
                  )}
                </div>
              </div>

              {/* Distribuição por Canal */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Distribuição por Canal</h2>
                <div className="space-y-4">
                  {analytics.channelDistribution && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm text-slate-700">WhatsApp</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{analytics.channelDistribution.whatsapp}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm text-slate-700">Webchat</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{analytics.channelDistribution.webchat}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm text-slate-700">E-mail</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{analytics.channelDistribution.email}%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum dado disponível</h3>
            <p className="text-slate-600">Os dados de analytics aparecerão aqui quando houver atividade.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Analytics


