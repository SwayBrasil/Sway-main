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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar showAuthButtons={true} />
      
      {/* User info bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <span className="text-sm text-slate-600">Olá, <span className="font-semibold text-slate-900">{user?.name || 'Usuário'}</span></span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-2 text-slate-600">Bem-vindo, {user?.name || 'Usuário'}!</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {dashboardData && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-slate-600">Total de Conversas</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {dashboardData.stats?.totalConversations || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-slate-600">Conversas Ativas</h3>
              <p className="mt-2 text-3xl font-bold text-primary-600">
                {dashboardData.stats?.activeConversations || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-slate-600">Resolvidas Hoje</h3>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {dashboardData.stats?.resolvedToday || 0}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-slate-600">Pendentes</h3>
              <p className="mt-2 text-3xl font-bold text-yellow-600">
                {dashboardData.stats?.pendingHandovers || 0}
              </p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Atividades Recentes</h2>
            {dashboardData?.recentActivity?.length > 0 ? (
              <ul className="space-y-3">
                {dashboardData.recentActivity.map((activity, index) => (
                  <li key={index} className="text-sm text-slate-600">
                    <span className="font-medium">{activity.type}:</span> {activity.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">Nenhuma atividade recente</p>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Notificações</h2>
            {dashboardData?.notifications?.length > 0 ? (
              <ul className="space-y-3">
                {dashboardData.notifications.map((notif) => (
                  <li key={notif.id} className="text-sm text-slate-600">
                    {notif.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">Nenhuma notificação</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home

