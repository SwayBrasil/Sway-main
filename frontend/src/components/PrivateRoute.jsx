import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Carregando...</div>
      </div>
    )
  }

  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default PrivateRoute

