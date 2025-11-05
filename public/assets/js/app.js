// ============================================
// SWAY - Eventos de Conversão e Analytics
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 1. RASTREAMENTO DE CLICKS EM CTAs
    // ============================================
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const eventType = button.getAttribute('data-event');
            const context = button.getAttribute('data-context') || '';
            const planName = button.getAttribute('data-plan-name') || '';
            
            // Evento Google Analytics
            try {
                if (eventType === 'whatsapp_click') {
                    gtag('event', 'conversion_whatsapp', {
                        'event_category': 'engagement',
                        'event_label': context || 'general',
                        'value': 1
                    });
                } else if (eventType === 'view_demo') {
                    gtag('event', 'view_demo', {
                        'event_category': 'engagement',
                        'event_label': 'demo_view'
                    });
                } else if (eventType === 'agendar_demo') {
                    gtag('event', 'agendar_demo', {
                        'event_category': 'conversion',
                        'event_label': 'demo_agendamento',
                        'value': 1
                    });
                } else if (eventType === 'select_plan') {
                    gtag('event', 'select_plan', {
                        'event_category': 'conversion',
                        'event_label': planName,
                        'value': 1
                    });
                }
            } catch (err) {
                console.log('Analytics error:', err);
            }
        });
    });

    // ============================================
    // 2. RASTREAMENTO DE PROFUNDIDADE DE SCROLL
    // ============================================
    let maxScroll = 0;
    const scrollThresholds = [25, 50, 75, 100];
    const trackedThresholds = new Set();

    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
            ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Rastrear cada threshold apenas uma vez
            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    
                    try {
                        gtag('event', 'scroll_depth', {
                            'event_category': 'engagement',
                            'event_label': `${threshold}%`,
                            'value': threshold
                        });
                    } catch (err) {
                        console.log('Analytics error:', err);
                    }

                    // Marcar como usuário engajado após 75% de scroll
                    if (threshold >= 75) {
                        try {
                            gtag('event', 'engaged_user', {
                                'event_category': 'engagement',
                                'event_label': 'high_engagement',
                                'value': 1
                            });
                        } catch (err) {
                            console.log('Analytics error:', err);
                        }
                    }
                }
            });
        }
    }, { passive: true });

    // ============================================
    // 3. RASTREAMENTO DE TEMPO NA PÁGINA
    // ============================================
    let startTime = Date.now();
    let timeTracked = false;

    // Marcar usuário engajado após 30 segundos
    setTimeout(() => {
        if (!timeTracked) {
            try {
                gtag('event', 'engaged_user', {
                    'event_category': 'engagement',
                    'event_label': 'time_30s',
                    'value': 1
                });
            } catch (err) {
                console.log('Analytics error:', err);
            }
        }
    }, 30000);

    // Rastrear tempo total ao sair
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        
        if (timeSpent > 10) { // Só rastrear se ficou mais de 10s
            try {
                gtag('event', 'time_spent', {
                    'event_category': 'engagement',
                    'event_label': 'page_time',
                    'value': timeSpent
                });
            } catch (err) {
                console.log('Analytics error:', err);
            }
        }
    });

    // ============================================
    // 4. RASTREAMENTO DE VISUALIZAÇÃO DE SEÇÕES
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // 30% da seção visível
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                try {
                    gtag('event', 'section_view', {
                        'event_category': 'engagement',
                        'event_label': sectionId,
                        'value': 1
                    });
                } catch (err) {
                    console.log('Analytics error:', err);
                }
                
                // Parar de observar após primeira visualização
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ============================================
    // 5. RASTREAMENTO DE INTERAÇÕES ESPECÍFICAS
    // ============================================
    
    // FAQ expandido
    const faqDetails = document.querySelectorAll('details');
    faqDetails.forEach(detail => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                try {
                    gtag('event', 'faq_expand', {
                        'event_category': 'engagement',
                        'event_label': detail.querySelector('summary')?.textContent || 'faq',
                        'value': 1
                    });
                } catch (err) {
                    console.log('Analytics error:', err);
                }
            }
        });
    });

    console.log('✅ SWAY Analytics inicializado');
});
