import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';

/**
 * Portal de Gestão da Empresa
 * Acessado via swaybrasil.com (domínio principal)
 * Permite que empresas gerenciem:
 * - Conta da empresa
 * - Dados
 * - Pagamentos
 * - Configuração de acessos dos usuários
 */
const CompanyPortal = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('conta');
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: '',
    subdomain: '',
    cnpj: '',
    active: true
  });

  useEffect(() => {
    // Se já estiver logado, pode redirecionar ou mostrar dados
    // Por enquanto, apenas renderiza o portal
  }, [isAuthenticated]);

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      const response = await fetch(`${API_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Empresa criada com sucesso! Acesse via: ' + companyData.subdomain + '.swaybrasil.com');
        setCompanyData({
          name: '',
          subdomain: '',
          cnpj: '',
          active: true
        });
      } else {
        alert('Erro: ' + data.message);
      }
    } catch (error) {
      console.error('Error creating company:', error);
      alert('Erro ao criar empresa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">
              Portal de Gestão da Empresa
            </h1>
            <p className="mt-3 text-lg text-neutral-600">
              Gerencie sua conta, dados, pagamentos e configurações de acesso
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-neutral-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'conta', label: 'Conta' },
                { id: 'dados', label: 'Dados' },
                { id: 'pagamentos', label: 'Pagamentos' },
                { id: 'usuarios', label: 'Configuração de Acessos' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="card p-8">
            {activeTab === 'conta' && (
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Informações da Conta</h2>
                <form onSubmit={handleCreateCompany} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      value={companyData.name}
                      onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                      className="input w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Subdomínio
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={companyData.subdomain}
                        onChange={(e) => setCompanyData({ ...companyData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                        className="input flex-1"
                        placeholder="minhaempresa"
                        required
                        pattern="[a-z0-9-]+"
                      />
                      <span className="text-neutral-500">.swaybrasil.com</span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-500">
                      Seus usuários acessarão via: {companyData.subdomain || 'subdominio'}.swaybrasil.com
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      CNPJ (opcional)
                    </label>
                    <input
                      type="text"
                      value={companyData.cnpj}
                      onChange={(e) => setCompanyData({ ...companyData, cnpj: e.target.value })}
                      className="input w-full"
                      placeholder="12.345.678/0001-90"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? 'Criando...' : 'Criar Empresa'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'dados' && (
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Dados da Empresa</h2>
                <p className="text-neutral-600">
                  Visualize e gerencie os dados da sua empresa aqui.
                </p>
                {/* Implementar visualização de dados */}
              </div>
            )}

            {activeTab === 'pagamentos' && (
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Pagamentos</h2>
                <p className="text-neutral-600">
                  Gerencie planos, faturas e métodos de pagamento.
                </p>
                {/* Implementar gestão de pagamentos */}
              </div>
            )}

            {activeTab === 'usuarios' && (
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Configuração de Acessos</h2>
                <p className="text-neutral-600 mb-4">
                  Configure os acessos e permissões dos usuários da sua empresa.
                </p>
                <p className="text-sm text-neutral-500">
                  Os usuários devem fazer login através do subdomínio da empresa (ex: empresa.swaybrasil.com)
                </p>
                {/* Implementar gestão de usuários */}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyPortal;

