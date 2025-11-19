import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function Home() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(`${API_URL}/home`)
      setDashboardData(response.data.data)
    } catch (error) {
      console.error('Error fetching dashboard:', error)
      setError('Erro ao carregar dados do dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
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
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Navbar showAuthButtons={true} variant="authenticated" />

      {/* Dashboard Content */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">Dashboard</h1>
          <p className="mt-3 text-lg text-neutral-600">Bem-vindo, {user?.name || 'Usuário'}!</p>
        </div>

        {error && (
          <div className="card p-4 mb-8 bg-red-50 border-red-200">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {dashboardData && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="card p-8">
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">Total de Conversas</h3>
              <p className="text-4xl font-bold text-neutral-900 mt-4">
                {dashboardData.stats?.totalConversations || 0}
              </p>
            </div>
            <div className="card p-8">
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">Conversas Ativas</h3>
              <p className="text-4xl font-bold text-primary-600 mt-4">
                {dashboardData.stats?.activeConversations || 0}
              </p>
            </div>
            <div className="card p-8">
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">Resolvidas Hoje</h3>
              <p className="text-4xl font-bold text-green-600 mt-4">
                {dashboardData.stats?.resolvedToday || 0}
              </p>
            </div>
            <div className="card p-8">
              <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">Pendentes</h3>
              <p className="text-4xl font-bold text-yellow-600 mt-4">
                {dashboardData.stats?.pendingHandovers || 0}
              </p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="card p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Atividades Recentes</h2>
            {dashboardData?.recentActivity?.length > 0 ? (
              <ul className="space-y-4">
                {dashboardData.recentActivity.map((activity, index) => (
                  <li key={index} className="text-sm text-neutral-600 border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                    <span className="font-medium text-neutral-900">{activity.type}:</span> {activity.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-500">Nenhuma atividade recente</p>
            )}
          </div>

          {/* Notifications */}
          <div className="card p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Notificações</h2>
            {dashboardData?.notifications?.length > 0 ? (
              <ul className="space-y-4">
                {dashboardData.notifications.map((notif) => (
                  <li key={notif.id} className="text-sm text-neutral-600 border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                    {notif.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-500">Nenhuma notificação</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home

