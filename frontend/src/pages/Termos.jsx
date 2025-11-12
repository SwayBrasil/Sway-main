import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Termos() {
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Termos de Uso</h1>
          <p className="text-slate-600 mb-8">
            Última atualização: <span id="lastUpdate"></span>
          </p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
              <p className="text-slate-700 leading-relaxed">
                Ao acessar e utilizar a plataforma SWAY, você concorda em cumprir e estar vinculado a estes Termos de Uso.
                Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>
              <p className="text-slate-700 leading-relaxed">
                A SWAY fornece uma plataforma de atendimento com inteligência artificial vertical, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Inbox omnichannel para gerenciamento de conversas</li>
                <li>IA especializada por setor (advocacia, clínicas, vendas, suporte)</li>
                <li>CRM leve integrado</li>
                <li>Analytics e relatórios de desempenho</li>
                <li>Handover automático e manual entre IA e humanos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Conta de Usuário</h2>
              <p className="text-slate-700 leading-relaxed">
                Para utilizar nossos serviços, você precisa criar uma conta. Você é responsável por:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Manter a confidencialidade de suas credenciais de acesso</li>
                <li>Todas as atividades que ocorrem em sua conta</li>
                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                <li>Fornecer informações precisas e atualizadas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Uso Aceitável</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Você concorda em não utilizar a plataforma SWAY para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
                <li>Qualquer atividade ilegal ou não autorizada</li>
                <li>Violar direitos de propriedade intelectual</li>
                <li>Transmitir vírus, malware ou código malicioso</li>
                <li>Interferir ou interromper o funcionamento dos serviços</li>
                <li>Realizar engenharia reversa ou tentar acessar código-fonte não autorizado</li>
                <li>Usar a plataforma para spam, phishing ou atividades fraudulentas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Propriedade Intelectual</h2>
              <p className="text-slate-700 leading-relaxed">
                Todo o conteúdo da plataforma SWAY, incluindo software, design, textos, gráficos, logos e marcas,
                é propriedade da SWAY Brasil ou de seus licenciadores e está protegido por leis de propriedade intelectual.
                Você não tem direito de copiar, modificar, distribuir ou criar obras derivadas sem autorização prévia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Dados do Cliente</h2>
              <p className="text-slate-700 leading-relaxed">
                Você mantém todos os direitos sobre os dados e informações de seus clientes inseridos na plataforma.
                A SWAY atua como processadora de dados em conformidade com a LGPD.
                Não vendemos, compartilhamos ou utilizamos seus dados para fins que não sejam a prestação do serviço contratado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Pagamento e Faturamento</h2>
              <p className="text-slate-700 leading-relaxed">
                Os planos são faturados conforme o contrato escolhido. O não pagamento pode resultar em suspensão
                ou cancelamento do serviço. Reembolsos seguem a política específica de cada plano.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Disponibilidade do Serviço</h2>
              <p className="text-slate-700 leading-relaxed">
                Embora nos esforcemos para manter a plataforma disponível 24/7, não garantimos disponibilidade
                ininterrupta. Podemos realizar manutenções programadas ou de emergência, com aviso prévio quando possível.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Limitação de Responsabilidade</h2>
              <p className="text-slate-700 leading-relaxed">
                A SWAY não se responsabiliza por perdas indiretas, lucros cessantes ou danos consequenciais
                decorrentes do uso ou impossibilidade de uso dos serviços. Nossa responsabilidade total está
                limitada ao valor pago pelos serviços no período de 12 meses anteriores ao evento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Modificações dos Termos</h2>
              <p className="text-slate-700 leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas
                serão comunicadas com antecedência. O uso continuado dos serviços após as alterações constitui
                aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Lei Aplicável e Foro</h2>
              <p className="text-slate-700 leading-relaxed">
                Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da
                comarca de Brasília, Distrito Federal, renunciando as partes a qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contato</h2>
              <p className="text-slate-700 leading-relaxed">
                Para questões sobre estes Termos de Uso, entre em contato:
              </p>
              <ul className="list-none space-y-2 text-slate-700 mt-4">
                <li><strong>E-mail:</strong> <a href="mailto:contato@swaybrasil.com" className="text-primary-600 hover:underline">contato@swaybrasil.com</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://api.whatsapp.com/send/?phone=556198431746" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">+55 (61) 98431-7466</a></li>
                <li><strong>CNPJ:</strong> 62.557.381/0001-61</li>
                <li><strong>Localização:</strong> Brasília, DF - Brasil</li>
              </ul>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Termos
