import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`)
      setUser(response.data.data.user)
    } catch (error) {
      console.error('Error fetching user:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (cpfCnpj, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        cpfCnpj,
        password,
      })
      
      const { token: newToken, user: userData } = response.data.data
      
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setToken(newToken)
      setUser(userData)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao fazer login',
      }
    }
  }

  const register = async (name, cpfCnpj, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        cpfCnpj,
        email: email || null,
        password,
      })
      
      const { token: newToken, user: userData } = response.data.data
      
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setToken(newToken)
      setUser(userData)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao cadastrar',
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  const isAuthenticated = () => {
    return !!token && !!user
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token,
        setToken,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

