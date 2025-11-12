import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Privacidade() {
  useEffect(() => {
    // Atualizar data de última atualização
    const lastUpdateEl = document.getElementById('lastUpdate')
    if (lastUpdateEl) {
      lastUpdateEl.textContent = new Date().toLocaleDateString('pt-BR')
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Navbar showAuthButtons={true} />

      {/* CONTEÚDO */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Política de Privacidade</h1>
          <p className="text-slate-600 mb-8">
            Última atualização: <span id="lastUpdate"></span>
          </p>
          <p className="text-slate-700 bg-primary-50 border border-primary-200 rounded-lg p-4 mb-8">
            <strong>SWAY Brasil</strong> está comprometida com a proteção de dados pessoais e em total conformidade
            com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>.
          </p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Informações que Coletamos</h2>
              <h3 className="text-xl font-semibold mb-3 mt-4">1.1 Dados de Conta</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Nome completo</li>
                <li>E-mail corporativo</li>
                <li>Telefone</li>
                <li>CNPJ/CPF</li>
                <li>Endereço empresarial</li>
                <li>Dados de pagamento (processados por processadores de pagamento seguros)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">1.2 Dados de Uso</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Logs de acesso e atividade na plataforma</li>
                <li>Interações com a IA e conversas</li>
                <li>Métricas de desempenho e analytics</li>
                <li>Configurações e preferências do usuário</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">1.3 Dados de Clientes (Processamento)</h3>
              <p className="text-slate-700 leading-relaxed">
                Quando você utiliza nossa plataforma para atender seus clientes, processamos os dados que você
                inserir na plataforma. <strong>Você é o controlador destes dados</strong> e a SWAY atua como
                <strong>operadora/processadora</strong> em conformidade com a LGPD.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Como Utilizamos os Dados</h2>
              <p className="text-slate-700 leading-relaxed mb-4">Utilizamos seus dados pessoais para:</p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Prestar e melhorar nossos serviços de atendimento com IA</li>
                <li>Processar pagamentos e gerenciar sua conta</li>
                <li>Comunicar-nos com você sobre o serviço, atualizações e suporte</li>
                <li>Garantir segurança e prevenir fraudes</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Analisar uso da plataforma para melhorias (dados agregados e anonimizados)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Base Legal para Processamento (LGPD)</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Processamos seus dados pessoais com base nas seguintes bases legais:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li><strong>Execução de contrato:</strong> Para prestar os serviços contratados</li>
                <li><strong>Consentimento:</strong> Quando você nos fornece consentimento explícito</li>
                <li><strong>Legítimo interesse:</strong> Para melhorar serviços, segurança e comunicação</li>
                <li><strong>Obrigação legal:</strong> Para cumprir leis e regulamentações aplicáveis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Dados</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Não vendemos seus dados pessoais. Compartilhamos dados apenas nas seguintes situações:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li><strong>Prestadores de serviço:</strong> Processadores de pagamento, hospedagem em nuvem e serviços técnicos (todos sob contrato de proteção de dados)</li>
                <li><strong>Obrigação legal:</strong> Quando exigido por lei, ordem judicial ou autoridade competente</li>
                <li><strong>Com seu consentimento:</strong> Em outras situações, apenas com seu consentimento explícito</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Segurança dos Dados</h2>
              <p className="text-slate-700 leading-relaxed">
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Criptografia em trânsito (TLS/SSL) e em repouso</li>
                <li>Controle de acesso baseado em função</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Backups regulares e planos de recuperação</li>
                <li>Treinamento de equipe em proteção de dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Retenção de Dados</h2>
              <p className="text-slate-700 leading-relaxed">
                Mantemos seus dados pessoais pelo tempo necessário para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Prestar os serviços contratados</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Resolver disputas e fazer cumprir nossos acordos</li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-4">
                Após o término do contrato, dados podem ser mantidos por período determinado legalmente ou
                excluídos conforme sua solicitação e políticas de retenção.
              </p>
            </section>

            <section id="7">
              <h2 className="text-2xl font-semibold mb-4">7. Seus Direitos (LGPD)</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Você tem os seguintes direitos sobre seus dados pessoais:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li><strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
                <li><strong>Correção:</strong> Solicitar correção de dados incompletos ou desatualizados</li>
                <li><strong>Anonimização, bloqueio ou eliminação:</strong> Solicitar remoção de dados desnecessários</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li><strong>Eliminação:</strong> Solicitar exclusão de dados tratados com consentimento</li>
                <li><strong>Revogação de consentimento:</strong> Retirar consentimento quando aplicável</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento em casos legítimos</li>
                <li><strong>Revisão de decisões automatizadas:</strong> Solicitar revisão de decisões tomadas apenas por IA</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Cookies e Tecnologias Similares</h2>
              <p className="text-slate-700 leading-relaxed">
                Utilizamos cookies e tecnologias similares para melhorar a experiência, analisar uso e personalizar conteúdo.
                Você pode gerenciar preferências de cookies através das configurações do navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Privacidade de Menores</h2>
              <p className="text-slate-700 leading-relaxed">
                Nossos serviços são destinados a empresas e profissionais. Não coletamos intencionalmente dados de menores de 18 anos.
                Se tomarmos conhecimento de que coletamos dados de menores, tomaremos medidas para excluí-los imediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Alterações nesta Política</h2>
              <p className="text-slate-700 leading-relaxed">
                Podemos atualizar esta Política de Privacidade periodicamente. Alterações significativas serão comunicadas
                por e-mail ou através de avisos na plataforma. A data de "Última atualização" indica quando a política foi
                revisada pela última vez.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Encarregado de Proteção de Dados (DPO)</h2>
              <p className="text-slate-700 leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre proteção de dados, entre em contato com nosso
                Encarregado de Proteção de Dados:
              </p>
              <ul className="list-none space-y-2 text-slate-700 mt-4">
                <li><strong>E-mail:</strong> <a href="mailto:privacidade@swaybrasil.com" className="text-primary-600 hover:underline">privacidade@swaybrasil.com</a></li>
                <li><strong>E-mail geral:</strong> <a href="mailto:contato@swaybrasil.com" className="text-primary-600 hover:underline">contato@swaybrasil.com</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://api.whatsapp.com/send/?phone=556198431746" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">+55 (61) 98431-7466</a></li>
                <li><strong>CNPJ:</strong> 62.557.381/0001-61</li>
                <li><strong>Localização:</strong> Brasília, DF - Brasil</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Autoridade Supervisora</h2>
              <p className="text-slate-700 leading-relaxed">
                Você tem o direito de apresentar uma reclamação à <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong>
                se acreditar que o processamento de seus dados pessoais viola a LGPD.
              </p>
              <p className="text-slate-700 leading-relaxed mt-4">
                <strong>ANPD:</strong> <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.gov.br/anpd</a>
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Privacidade
