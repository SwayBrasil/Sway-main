import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function Profile() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess('')
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `${API_URL}/auth/profile`,
        {
          name: formData.name,
          email: formData.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setSuccess('Perfil atualizado com sucesso!')
        // Atualizar dados do usuário no contexto
        window.location.reload()
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (formData.newPassword !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (formData.newPassword.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `${API_URL}/auth/change-password`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setSuccess('Senha alterada com sucesso!')
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao alterar senha')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Navbar showAuthButtons={true} variant="authenticated" />
      
      <main className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">Meu Perfil</h1>
          <p className="mt-3 text-lg text-neutral-600">Gerencie suas informações pessoais e configurações de conta</p>
        </div>

        {error && (
          <div className="card p-4 mb-6 bg-red-50 border-red-200">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="card p-4 mb-6 bg-green-50 border-green-200">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Informações do Perfil */}
          <div className="card p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Informações Pessoais</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="spinner"></span>
                    Salvando...
                  </span>
                ) : 'Salvar Alterações'}
              </button>
            </form>
          </div>

          {/* Alterar Senha */}
          <div className="card p-8">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Alterar Senha</h2>
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Senha Atual
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  required
                  className="input"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Nova Senha
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  className="input"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-secondary w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="spinner"></span>
                    Alterando...
                  </span>
                ) : 'Alterar Senha'}
              </button>
            </form>
          </div>
        </div>

        {/* Informações da Conta */}
        <div className="mt-8 card p-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Informações da Conta</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b border-neutral-200">
              <span className="text-neutral-600">Tipo de Conta</span>
              <span className="font-medium text-neutral-900">
                {user?.provider === 'local' ? 'Email e Senha' : 
                 user?.provider === 'google' ? 'Google' :
                 user?.provider === 'facebook' ? 'Facebook' :
                 user?.provider === 'apple' ? 'Apple' : 'Email e Senha'}
              </span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-neutral-200">
              <span className="text-neutral-600">Membro desde</span>
              <span className="font-medium text-neutral-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-neutral-600">ID da Conta</span>
              <span className="font-mono text-sm text-neutral-500">#{user?.id || 'N/A'}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Profile

