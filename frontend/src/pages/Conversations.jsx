import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

function Conversations() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all, active, resolved, pending

  useEffect(() => {
    fetchConversations()
  }, [filter])

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${API_URL}/conversations?filter=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        setConversations(response.data.data || [])
      }
    } catch (err) {
      console.error('Error fetching conversations:', err)
      setError('Erro ao carregar conversas')
      // Simular dados para desenvolvimento
      setConversations([
        { id: 1, contact: 'João Silva', channel: 'WhatsApp', status: 'active', lastMessage: 'Olá, preciso de ajuda', time: '2 min atrás' },
        { id: 2, contact: 'Maria Santos', channel: 'Webchat', status: 'pending', lastMessage: 'Quando posso agendar?', time: '15 min atrás' },
        { id: 3, contact: 'Pedro Costa', channel: 'WhatsApp', status: 'resolved', lastMessage: 'Obrigado pela ajuda!', time: '1 hora atrás' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-slate-100 text-slate-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Ativa'
      case 'pending':
        return 'Pendente'
      case 'resolved':
        return 'Resolvida'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar showAuthButtons={true} variant="authenticated" />
      
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Conversas</h1>
          <p className="mt-2 text-slate-600">Gerencie todas as conversas com seus clientes</p>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'active' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Ativas
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'resolved' 
                ? 'bg-primary-600 text-white' 
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Resolvidas
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-600">Carregando conversas...</div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhuma conversa encontrada</h3>
            <p className="text-slate-600">Quando você tiver conversas, elas aparecerão aqui.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-200">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-6 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">{conversation.contact || 'Cliente'}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                          {getStatusLabel(conversation.status)}
                        </span>
                        <span className="text-xs text-slate-500">{conversation.channel || 'WhatsApp'}</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{conversation.lastMessage || 'Sem mensagens'}</p>
                      <p className="text-xs text-slate-500">{conversation.time || 'Agora'}</p>
                    </div>
                    <button className="px-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
                      Abrir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Conversations


