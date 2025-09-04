// Track button clicks
document.addEventListener('DOMContentLoaded', () => {
    const whatsappButtons = document.querySelectorAll('.cta-button');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Track click event
            analytics.logEvent('whatsapp_click', {
                button_id: e.target.id,
                button_text: e.target.textContent,
                timestamp: new Date().toISOString()
            });
        });
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll >= 25 && maxScroll < 50) {
                analytics.logEvent('scroll_depth', { depth: '25%' });
            } else if (maxScroll >= 50 && maxScroll < 75) {
                analytics.logEvent('scroll_depth', { depth: '50%' });
            } else if (maxScroll >= 75 && maxScroll < 100) {
                analytics.logEvent('scroll_depth', { depth: '75%' });
            } else if (maxScroll >= 100) {
                analytics.logEvent('scroll_depth', { depth: '100%' });
            }
        }
    });

    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        analytics.logEvent('time_spent', {
            seconds: timeSpent
        });
    });
}); 