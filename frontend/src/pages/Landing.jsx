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
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar showAuthButtons={true} />

      {/* HERO */}
      <section className="relative hero-gradient overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Main Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-tight">
                  Atenda fácil.
                  <br />
                  <span className="text-primary-600">Atenda com IA</span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-xl">
                  Plataforma completa de atendimento com IA. Chat em tempo real, Kanban de leads, gestão de conversas e analytics detalhados — tudo em um só lugar.
                </p>
                <p className="mt-4 text-base text-neutral-500">
                  Use para <span className="font-semibold text-neutral-700">marketing</span>, <span className="font-semibold text-neutral-700">vendas</span> e <span className="font-semibold text-neutral-700">pós-vendas</span>.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Rápido</h3>
                    <p className="text-sm text-neutral-600">Atenda seus clientes 24 horas por dia, sem pausa.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Seguro</h3>
                    <p className="text-sm text-neutral-600">Criptografia de ponta e LGPD.</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://api.whatsapp.com/send/?phone=556198431746&text=Ol%C3%A1%2C%20quero%20ver%20a%20IA%20em%20a%C3%A7%C3%A3o%20da%20SWAY&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 text-base font-semibold flex items-center gap-2 group"
                  data-event="view_demo"
                  id="cta-view-demo"
                >
                  Integre ao seu negócio
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="/#como-funciona"
                  className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
                >
                  Por que usar?
                </a>
              </div>
            </div>

            {/* Right Side - Dashboard Preview */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Desktop Dashboard Preview */}
                <div className="card shadow-soft-xl bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                  <img 
                    src="/assets/img/FeatureChat.png" 
                    alt="Interface SWAY - Chat em tempo real com gestão de conversas" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTO */}
      <section id="produto" className="py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">Tudo que você precisa para atender com IA</h2>
              <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                Chat em tempo real, Kanban de leads, gestão de conversas, analytics detalhados e muito mais — tudo integrado em uma plataforma única.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              <div className="card p-8 card-hover">
                <h3 className="text-lg font-semibold text-neutral-900">Chat em Tempo Real</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Interface familiar tipo WhatsApp Web. Assuma conversas em 1 clique, pause a IA quando precisar e continue de onde parou.
                </p>
              </div>
              <div className="card p-8 card-hover">
                <h3 className="text-lg font-semibold text-neutral-900">Kanban de Leads</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Organize leads por temperatura (Quente, Morno, Frio). Visualize score, origem e última interação. Mude a temperatura com um clique.
                </p>
              </div>
              <div className="card p-8 card-hover">
                <h3 className="text-lg font-semibold text-neutral-900">Gestão de Conversas</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Filtre conversas por status, busque por nome ou mensagem, veja histórico completo e assuma quando a IA precisar de ajuda.
                </p>
              </div>
              <div className="card p-8 card-hover">
                <h3 className="text-lg font-semibold text-neutral-900">Analytics Detalhados</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Veja total de conversas, mensagens enviadas, respostas da IA, média por conversa e gráficos de distribuição e evolução diária.
                </p>
              </div>
              <div className="card p-8 card-hover">
                <h3 className="text-lg font-semibold text-neutral-900">Contatos & CRM</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Gerencie todos os seus contatos, veja histórico de interações, origem do lead e informações completas em um só lugar.
                </p>
              </div>
              <div className="card p-8 card-hover">
                <h3 className="text-lg font-semibold text-neutral-900">Tarefas & Organização</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Crie e gerencie tarefas relacionadas às conversas. Organize seu fluxo de trabalho e nunca perca um follow-up.
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
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Como Funciona: Plataforma Completa de Atendimento</h2>
              <p className="mt-4 text-slate-600">
                Nossa IA atende seus clientes 24/7, qualifica leads automaticamente e organiza tudo em um Kanban visual. Quando precisar, assuma a conversa em 1 clique e continue de onde a IA parou.
              </p>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li>• <strong>Chat em tempo real:</strong> Interface familiar, busca rápida e filtros por status</li>
                <li>• <strong>Kanban de leads:</strong> Organize por temperatura (Quente, Morno, Frio) e acompanhe scores</li>
                <li>• <strong>Assumir conversas:</strong> Pause a IA quando precisar e continue o atendimento</li>
                <li>• <strong>Analytics completo:</strong> Veja métricas detalhadas, gráficos e relatórios por dia</li>
                <li>• <strong>Gestão de contatos:</strong> Histórico completo, origem do lead e informações centralizadas</li>
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
              <Link
                to="/plan-selection?plan=Start"
                className="cta-button mt-6 inline-block px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-center"
                data-event="select_plan"
                data-plan-name="Start"
              >
                Quero o Start
              </Link>
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
              <Link
                to="/plan-selection?plan=Pro"
                className="cta-button mt-6 inline-block px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-center"
                data-event="select_plan"
                data-plan-name="Pro"
              >
                Quero o Pro
              </Link>
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
              <Link
                to="/plan-selection?plan=Enterprise"
                className="cta-button mt-6 inline-block px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-center"
                data-event="select_plan"
                data-plan-name="Enterprise"
              >
                Quero o Enterprise
              </Link>
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
              <summary className="font-semibold cursor-pointer">Como funciona o Kanban de leads?</summary>
              <p className="mt-2 text-slate-600">O Kanban organiza seus leads em três colunas: Quente (alta prioridade), Morno (média prioridade) e Frio (baixa prioridade). Cada lead mostra score, origem, última interação e você pode mover entre colunas ou abrir o chat diretamente.</p>
            </details>
            <details className="group bg-white border rounded-xl p-5 shadow-soft">
              <summary className="font-semibold cursor-pointer">Posso assumir uma conversa e pausar a IA?</summary>
              <p className="mt-2 text-slate-600">Sim! Com um clique você pode assumir qualquer conversa e pausar a IA. Quando assumir, você continua de onde a IA parou, vendo todo o histórico de mensagens. A IA só volta quando você quiser.</p>
            </details>
            <details className="group bg-white border rounded-xl p-5 shadow-soft">
              <summary className="font-semibold cursor-pointer">O que são os scores dos leads?</summary>
              <p className="mt-2 text-slate-600">O score indica o nível de interesse e engajamento do lead. Quanto maior o score, mais quente o lead. A IA calcula automaticamente baseado nas interações, perguntas feitas e comportamento do cliente.</p>
            </details>
            <details className="group bg-white border rounded-xl p-5 shadow-soft">
              <summary className="font-semibold cursor-pointer">Como funcionam os filtros de conversas?</summary>
              <p className="mt-2 text-slate-600">Você pode filtrar conversas por temperatura (Quente, Morno, Frio), buscar por nome ou número, e ver todas as conversas em uma lista organizada. Cada conversa mostra status, última mensagem e horário.</p>
            </details>
            <details className="group bg-white border rounded-xl p-5 shadow-soft">
              <summary className="font-semibold cursor-pointer">Quais métricas posso ver no analytics?</summary>
              <p className="mt-2 text-slate-600">Você vê total de conversas, mensagens totais, quantas você enviou vs quantas a IA respondeu, média de mensagens por conversa, gráficos de distribuição e evolução diária, além de tabelas detalhadas por data.</p>
            </details>
            <details className="group bg-white border rounded-xl p-5 shadow-soft">
              <summary className="font-semibold cursor-pointer">Posso gerenciar tarefas relacionadas às conversas?</summary>
              <p className="mt-2 text-slate-600">Sim! A plataforma inclui gestão de tarefas onde você pode criar, organizar e acompanhar tarefas relacionadas às suas conversas e leads, garantindo que nenhum follow-up seja esquecido.</p>
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
          className="cta-button flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-2xl transition-all hover:scale-110"
          data-event="whatsapp_click"
          data-context="fixed_button"
          aria-label="Falar no WhatsApp"
        >
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default Landing
