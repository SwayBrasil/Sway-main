import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function Settings() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState('general')

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    preferences: {
      language: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      theme: 'light'
    },
    integrations: {
      whatsapp: false,
      webchat: false,
      email: false
    }
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${API_URL}/settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setSettings(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching settings:', err)
      // Usar settings padrão
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `${API_URL}/settings`,
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setSuccess('Configurações salvas com sucesso!')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar configurações')
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (category, key) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: !settings[category][key]
      }
    })
  }

  const handleSelectChange = (category, key, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar showAuthButtons={true} variant="authenticated" />
      
      <main className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
          <p className="mt-2 text-slate-600">Personalize sua experiência na plataforma</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 border-b border-slate-200">
          <nav className="flex gap-6">
            <button
              onClick={() => setActiveTab('general')}
              className={`pb-4 px-1 text-sm font-medium transition-colors ${
                activeTab === 'general'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Geral
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`pb-4 px-1 text-sm font-medium transition-colors ${
                activeTab === 'notifications'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Notificações
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`pb-4 px-1 text-sm font-medium transition-colors ${
                activeTab === 'integrations'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Integrações
            </button>
          </nav>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Configurações Gerais</h2>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Idioma
                </label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handleSelectChange('preferences', 'language', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fuso Horário
                </label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handleSelectChange('preferences', 'timezone', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="America/Sao_Paulo">America/São Paulo (GMT-3)</option>
                  <option value="America/Manaus">America/Manaus (GMT-4)</option>
                  <option value="America/Rio_Branco">America/Rio Branco (GMT-5)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tema
                </label>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) => handleSelectChange('preferences', 'theme', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Notificações</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <div>
                    <h3 className="font-medium text-slate-900">Notificações por E-mail</h3>
                    <p className="text-sm text-slate-600">Receba atualizações importantes por e-mail</p>
                  </div>
                  <button
                    onClick={() => handleToggle('notifications', 'email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications.email ? 'bg-primary-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-slate-200">
                  <div>
                    <h3 className="font-medium text-slate-900">Notificações Push</h3>
                    <p className="text-sm text-slate-600">Receba notificações no navegador</p>
                  </div>
                  <button
                    onClick={() => handleToggle('notifications', 'push')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications.push ? 'bg-primary-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="font-medium text-slate-900">Notificações por SMS</h3>
                    <p className="text-sm text-slate-600">Receba alertas críticos por SMS</p>
                  </div>
                  <button
                    onClick={() => handleToggle('notifications', 'sms')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notifications.sms ? 'bg-primary-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">Integrações</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <span className="text-xl">💬</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">WhatsApp Business API</h3>
                      <p className="text-sm text-slate-600">Conecte sua conta do WhatsApp</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('integrations', 'whatsapp')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.integrations.whatsapp ? 'bg-primary-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.integrations.whatsapp ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-xl">🌐</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Webchat</h3>
                      <p className="text-sm text-slate-600">Adicione chat ao seu site</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('integrations', 'webchat')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.integrations.webchat ? 'bg-primary-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.integrations.webchat ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">E-mail</h3>
                      <p className="text-sm text-slate-600">Conecte sua conta de e-mail</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle('integrations', 'email')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.integrations.email ? 'bg-primary-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.integrations.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Salvar Configurações'}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Settings


