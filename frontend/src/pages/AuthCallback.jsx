import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setToken } = useAuth()
  const token = searchParams.get('token')
  const success = searchParams.get('success')
  const error = searchParams.get('error')

  useEffect(() => {
    const handleAuth = async () => {
      if (success === 'true' && token) {
        // Salvar token
        localStorage.setItem('token', token)
        setToken(token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        // Buscar dados do usuário
        try {
          const response = await axios.get(`${API_URL}/auth/me`)
          localStorage.setItem('user', JSON.stringify(response.data.data.user))
        } catch (err) {
          console.error('Error fetching user:', err)
        }
        
        // Redirecionar
        navigate('/home')
      } else if (success === 'false' || error) {
        // Erro na autenticação
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        // Sem parâmetros válidos
        navigate('/login')
      }
    }
    
    handleAuth()
  }, [token, success, error, navigate, setToken])

  if (success === 'true' && token) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
        <Navbar showAuthButtons={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Autenticando...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar showAuthButtons={false} />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md">
          {error ? (
            <>
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Erro na autenticação</h2>
              <p className="text-slate-600 mb-4">{error}</p>
            </>
          ) : (
            <>
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Autenticação inválida</h2>
              <p className="text-slate-600 mb-4">Redirecionando para o login...</p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AuthCallback

