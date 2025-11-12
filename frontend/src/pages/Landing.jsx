import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Landing() {
  useEffect(() => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href')
        if (id && id !== '#') {
          const el = document.querySelector(id)
          if (el) {
            e.preventDefault()
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }
      })
    })

    // Botão fixo aparece após scroll
    const fixedCTA = document.getElementById('fixedCTA')
    let scrolled = false
    const handleScroll = () => {
      if (window.scrollY > 300 && !scrolled) {
        fixedCTA?.classList.remove('hidden')
        scrolled = true
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar showAuthButtons={true} />

      {/* HERO */}
      <section className="relative hero-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl">
              IA de Atendimento Vertical para Empresas Brasileiras
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl">
              Chatbot inteligente especializado por setor (clínicas, advocacia, vendas) que trabalha 24h, reduz 70% da carga operacional e aumenta conversões com handover automático para sua equipe.
            </p>

            {/* Seção Interativa: Demonstração rápida */}
            <div className="mt-10 w-full max-w-2xl">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-soft">
                <p className="text-sm font-semibold text-slate-700 mb-4">💡 Veja como nossa IA atende um cliente em 10 segundos:</p>
                <div className="bg-slate-900 rounded-xl p-6 text-left font-mono text-sm text-green-400 overflow-x-auto">
                  <div className="space-y-2">
                    <div>
                      <span className="text-slate-500">Cliente:</span>{' '}
                      <span className="text-white">Olá, preciso agendar uma consulta</span>
                    </div>
                    <div>
                      <span className="text-slate-500">IA SWAY:</span>{' '}
                      <span className="text-green-300">Olá! Vou te ajudar. Qual especialidade você precisa?</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Cliente:</span>{' '}
                      <span className="text-white">Cardiologia</span>
                    </div>
                    <div>
                      <span className="text-slate-500">IA SWAY:</span>{' '}
                      <span className="text-green-300">Perfeito! Temos disponibilidade hoje às 14h ou amanhã às 10h. Qual prefere?</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-3">⚡ Resposta em 0.8s • Atendimento 24/7</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
              <a
                href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20ver%20a%20IA%20em%20a%C3%A7%C3%A3o%20da%20SWAY&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button px-6 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 font-semibold shadow-lg transition-all"
                data-event="view_demo"
                id="cta-view-demo"
              >
                Ver IA em ação
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20agendar%20uma%20conversa%20com%20especialista%20sobre%20a%20SWAY&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button px-6 py-3 rounded-xl border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold"
                data-event="whatsapp_click"
                id="cta-whatsapp-hero"
              >
                Agendar conversa com especialista
              </a>
            </div>
            <div className="mt-6 text-sm text-slate-500">
              Respostas em segundos • Atendimento 24/7 • Reduza 70% da carga da sua equipe em 7 dias
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTO */}
      <section id="produto" className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Tudo para colocar IA em produção</h2>
              <p className="mt-4 text-slate-600">
                Inbox omnichannel, handover instantâneo, CRM leve e relatórios claros — prontos para sua operação crescer com segurança.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl shadow-soft border">
                <h3 className="font-semibold">Inbox tipo WhatsApp Web</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Interface familiar de chat, busca, filtros de não lidas, status e confirmação de leitura para velocidade de operação.
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-soft border">
                <h3 className="font-semibold">Handover IA → Humano</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Assuma em 1 clique. Crie regras por intenção, risco, palavra-chave ou score de confiança da IA.
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-soft border">
                <h3 className="font-semibold">CRM leve</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Contatos com tags, histórico e campos personalizáveis por setor. Tudo no contexto da conversa.
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-soft border">
                <h3 className="font-semibold">Analytics acionável</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Tempo de resposta, taxa de resolução, intenções top, handover e satisfação. Métricas que viram decisões.
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-soft border">
                <h3 className="font-semibold">Segurança & LGPD</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Criptografia em trânsito, acesso por função, segregação por cliente e política de retenção configurável.
                </p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-soft border">
                <h3 className="font-semibold">Integrações</h3>
                <p className="mt-2 text-sm text-slate-600">
                  WhatsApp Business API, webchat, e-mail e webhooks. API aberta para conectar seu stack.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Como Funciona: IA de Atendimento Vertical para Empresas</h2>
              <p className="mt-4 text-slate-600">
                Nossa IA entende a necessidade do cliente, responde em segundos e, quando necessário, passa a conversa para sua equipe sem atrito. Isso significa mais clientes atendidos, menos tempo de espera e uma experiência que gera confiança.
              </p>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li>• Responde dúvidas frequentes automaticamente</li>
                <li>• Gera agendamentos, lembretes e follow-ups</li>
                <li>• Qualifica leads e identifica oportunidades</li>
                <li>• Reduz a carga de trabalho da equipe em até 70%</li>
              </ul>
            </div>
            <div className="p-6 bg-slate-900 text-slate-50 rounded-2xl shadow-soft">
              <p className="text-lg font-semibold">Exemplo real:</p>
              <p className="mt-3 text-slate-300 text-sm">
                Enquanto um atendente humano consegue lidar com 3 a 5 conversas ao mesmo tempo, uma IA consegue atender centenas de clientes em paralelo, sem perda de qualidade.
              </p>
            </div>
          </div>

          {/* PROVA SOCIAL BRASILEIRA */}
          <div className="mt-16 pt-16 border-t border-slate-200">
            <h3 className="text-xl font-bold text-center mb-8">Empresas brasileiras que confiam na SWAY</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-slate-600 italic mb-3">
                  "A SWAY reduziu nossa carga operacional em 65%. Agora nossa equipe foca no que realmente importa."
                </p>
                <p className="text-sm font-semibold text-slate-900">— Clínica São Paulo, SP</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-slate-600 italic mb-3">
                  "Atendimento 24/7 sem aumentar custos. A IA entende perfeitamente o contexto do nosso setor jurídico."
                </p>
                <p className="text-sm font-semibold text-slate-900">— Escritório de Advocacia, RJ</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-slate-600 italic mb-3">
                  "Qualificação de leads automatizada. Fechamos 40% mais negócios com a mesma equipe."
                </p>
                <p className="text-sm font-semibold text-slate-900">— Agência de Vendas, MG</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERTICAIS */}
      <section id="verticais" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-center">IAs para todos os segmentos</h2>
          <p className="mt-3 text-slate-600 text-center max-w-2xl mx-auto">
            Totalmente personalizadas para qualquer tipo de negócio — adaptamos linguagem, fluxos e integrações ao seu processo.
          </p>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border shadow-soft">
              <h3 className="font-semibold">Advocacia</h3>
              <p className="mt-2 text-sm text-slate-600">Triagem de consultas, organização de prazos e atendimento mesmo fora do horário.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border shadow-soft">
              <h3 className="font-semibold">Clínicas</h3>
              <p className="mt-2 text-sm text-slate-600">Agendamentos, lembretes e acompanhamento sem sobrecarregar a recepção.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border shadow-soft">
              <h3 className="font-semibold">Vendas</h3>
              <p className="mt-2 text-sm text-slate-600">Qualificação de leads, respostas em segundos e follow-ups automáticos.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border shadow-soft">
              <h3 className="font-semibold">Suporte</h3>
              <p className="mt-2 text-sm text-slate-600">Resolução de dúvidas comuns e handover imediato para casos críticos.</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Não viu seu setor? Nossa IA é treinada para <span className="font-semibold">qualquer negócio</span>.
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20uma%20IA%20personalizada%20para%20o%20meu%20neg%C3%B3cio&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button inline-block mt-3 px-5 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 shadow-soft"
              data-event="whatsapp_click"
              data-context="custom_ia"
            >
              Quero uma IA personalizada
            </a>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-center">Planos simples que escalam com você</h2>
          <p className="mt-3 text-slate-600 text-center">Todos incluem inbox, CRM leve e analytics. O que muda é volume e nível de verticalização.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {/* Start */}
            <div className="p-8 bg-white rounded-2xl border shadow-soft">
              <h3 className="text-lg font-semibold">Start</h3>
              <p className="mt-1 text-slate-600 text-sm">1 canal, 1 IA vertical</p>
              <ul className="mt-4 text-sm space-y-2">
                <li>• Até 2 usuários</li>
                <li>• 5k mensagens/mês</li>
                <li>• Suporte por e-mail</li>
              </ul>
              <a
                data-plan="Start"
                href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20o%20plano%20Start%20da%20SWAY&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button mt-6 inline-block px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50"
                data-event="select_plan"
                data-plan-name="Start"
              >
                Quero o Start
              </a>
            </div>
            {/* Pro */}
            <div className="p-8 bg-slate-900 text-white rounded-2xl shadow-soft ring-2 ring-primary-500">
              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="mt-1 text-slate-300 text-sm">2 canais, 2 IAs verticais</p>
              <ul className="mt-4 text-sm space-y-2 text-slate-200">
                <li>• Até 8 usuários</li>
                <li>• 20k mensagens/mês</li>
                <li>• Suporte prioritário</li>
              </ul>
              <a
                data-plan="Pro"
                href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20o%20plano%20Pro%20da%20SWAY&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button mt-6 inline-block px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-500"
                data-event="select_plan"
                data-plan-name="Pro"
              >
                Quero o Pro
              </a>
            </div>
            {/* Enterprise */}
            <div className="p-8 bg-white rounded-2xl border shadow-soft">
              <h3 className="text-lg font-semibold">Enterprise</h3>
              <p className="mt-1 text-slate-600 text-sm">Omnichannel + múltiplas IAs</p>
              <ul className="mt-4 text-sm space-y-2">
                <li>• Usuários ilimitados</li>
                <li>• SLA e integrações</li>
                <li>• Onboarding assistido</li>
              </ul>
              <a
                data-plan="Enterprise"
                href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20o%20plano%20Enterprise%20da%20SWAY&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button mt-6 inline-block px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50"
                data-event="select_plan"
                data-plan-name="Enterprise"
              >
                Quero o Enterprise
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-center">Perguntas frequentes</h2>
          <div className="mt-10 space-y-4">
            <details className="group bg-white border rounded-xl p-5 shadow-soft">
              <summary className="font-semibold cursor-pointer">Posso assumir uma conversa a qualquer momento?</summary>
              <p className="mt-2 text-slate-600">Sim. O handover IA→humano é feito em um clique e também pode seguir regras automáticas.</p>
            </details>
            <details className="group bg-white border rounded-xl p-5 shadow-soft">
              <summary className="font-semibold cursor-pointer">Vocês treinam uma IA por setor?</summary>
              <p className="mt-2 text-slate-600">Trabalhamos com IAs verticais (advocacia, clínicas, vendas, suporte) e personalizamos com os seus dados e processos.</p>
            </details>
            <details className="group bg-white border rounded-xl p-5 shadow-soft">
              <summary className="font-semibold cursor-pointer">Quais canais são suportados?</summary>
              <p className="mt-2 text-slate-600">WhatsApp Business API, webchat e e-mail inicialmente. Outras integrações sob demanda.</p>
            </details>
            <details className="group bg-white border rounded-xl p-5 shadow-soft">
              <summary className="font-semibold cursor-pointer">Como garantem segurança e LGPD?</summary>
              <p className="mt-2 text-slate-600">Criptografia em trânsito, controle de acesso por função, segregação por cliente e retenção configurável.</p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contato" className="py-20 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Pronto para operar IAs verticais de verdade?</h2>
          <p className="mt-3 text-slate-300">Agende uma demo e veja como supervisionar a IA, assumir conversas críticas e acompanhar métricas de ponta a ponta.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a
              href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20agendar%20uma%20demo%20da%20plataforma%20SWAY&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button px-6 py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 shadow-soft"
              data-event="agendar_demo"
            >
              Agendar demo
            </a>
            <a href="mailto:contato@swaybrasil.com" className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10">
              contato@swaybrasil.com
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Botão Fixo de CTA */}
      <div id="fixedCTA" className="fixed bottom-6 right-6 z-50 hidden">
        <a
          href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20agendar%20uma%20conversa%20com%20especialista%20sobre%20a%20SWAY&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white hover:bg-primary-700 shadow-2xl font-semibold transition-all animate-pulse"
          data-event="whatsapp_click"
          data-context="fixed_button"
        >
          <span>💬</span>
          <span>Falar agora</span>
        </a>
      </div>
    </div>
  )
}

export default Landing
