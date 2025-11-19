import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Conversations from './pages/Conversations'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import PlanSelection from './pages/PlanSelection'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import CheckoutPending from './pages/CheckoutPending'
import AuthCallback from './pages/AuthCallback'
import Termos from './pages/Termos'
import Privacidade from './pages/Privacidade'
import CompanyPortal from './pages/CompanyPortal'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/home/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/home/conversations" 
            element={
              <PrivateRoute>
                <Conversations />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/home/analytics" 
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/home/settings" 
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/plan-selection" 
            element={
              <PrivateRoute>
                <PlanSelection />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/checkout/success" 
            element={
              <PrivateRoute>
                <CheckoutSuccess />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/checkout/pending" 
            element={
              <PrivateRoute>
                <CheckoutPending />
              </PrivateRoute>
            } 
          />
          <Route path="/auth/callback/:provider" element={<AuthCallback />} />
          <Route path="/empresa" element={<CompanyPortal />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

