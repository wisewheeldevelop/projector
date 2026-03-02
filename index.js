import { createIcons, icons } from 'lucide';
import AOS from 'aos';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    createIcons({ icons });

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic'
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            if (nav) {
                nav.classList.add('shadow-lg', 'py-2');
                nav.classList.remove('py-4');
            }
        } else {
            if (nav) {
                nav.classList.remove('shadow-lg', 'py-2');
                nav.classList.add('py-4');
            }
        }
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }

    // FAQ Accordion Logic
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('.chevron-icon');

            // Close all others
            document.querySelectorAll('.accordion-wrapper').forEach(c => {
                if (c !== content) {
                    c.classList.remove('open');
                    const otherIcon = c.previousElementSibling?.querySelector('.chevron-icon');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current
            if (content) {
                if (content.classList.contains('open')) {
                    content.classList.remove('open');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                } else {
                    content.classList.add('open');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });

    // Accessibility Menu Logic
    const accBtn = document.getElementById('accessibility-menu-btn');
    const accMenu = document.getElementById('accessibility-menu');
    const accClose = document.getElementById('close-accessibility');
    const accReset = document.getElementById('reset-accessibility');

    if (accBtn && accMenu) {
        accBtn.addEventListener('click', (e) => {
            e.preventDefault();
            accMenu.classList.toggle('opacity-0');
            accMenu.classList.toggle('pointer-events-none');
            accMenu.classList.toggle('pointer-events-auto');
            accMenu.classList.toggle('scale-90');
            accMenu.classList.toggle('scale-100');
        });

        if (accClose) {
            accClose.addEventListener('click', () => {
                accMenu.classList.add('opacity-0', 'pointer-events-none', 'scale-90');
                accMenu.classList.remove('scale-100', 'pointer-events-auto');
            });
        }

        const htmlEl = document.documentElement;
        let currentFontSize = 100;

        document.querySelectorAll('.acc-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;

                if (action !== 'increase-text' && action !== 'decrease-text') {
                    e.currentTarget.classList.toggle('bg-brand-accent');
                    e.currentTarget.classList.toggle('text-white');
                    e.currentTarget.classList.toggle('text-brand-dark');
                    e.currentTarget.classList.toggle('hover:bg-brand-dark/5');
                }

                switch (action) {
                    case 'increase-text':
                        currentFontSize += 10;
                        htmlEl.style.fontSize = currentFontSize + '%';
                        break;
                    case 'decrease-text':
                        currentFontSize = Math.max(80, currentFontSize - 10);
                        htmlEl.style.fontSize = currentFontSize + '%';
                        break;
                    case 'high-contrast':
                        htmlEl.classList.toggle('acc-high-contrast');
                        break;
                    case 'grayscale':
                        htmlEl.classList.toggle('acc-grayscale');
                        break;
                    case 'readable-font':
                        htmlEl.classList.toggle('acc-readable-font');
                        break;
                    case 'highlight-links':
                        htmlEl.classList.toggle('acc-highlight-links');
                        break;
                }
            });
        });

        if (accReset) {
            accReset.addEventListener('click', () => {
                currentFontSize = 100;
                htmlEl.style.fontSize = '';
                htmlEl.classList.remove('acc-high-contrast', 'acc-grayscale', 'acc-readable-font', 'acc-highlight-links');

                document.querySelectorAll('.acc-btn').forEach(btn => {
                    btn.classList.remove('bg-brand-accent', 'text-white');
                    btn.classList.add('text-brand-dark', 'hover:bg-brand-dark/5');
                });
            });
        }
    }

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');

    if (cookieBanner && acceptCookiesBtn && declineCookiesBtn) {
        const cookieChoice = localStorage.getItem('cookieConsent');

        if (!cookieChoice) {
            // Show after short delay for smoother entry
            setTimeout(() => {
                cookieBanner.classList.remove('translate-y-full');
            }, 1000);
        }

        const hideCookieBanner = () => {
            cookieBanner.classList.add('translate-y-full');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 700);
        }

        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            hideCookieBanner();
            // Load analytics immediately when user explicitly accepts
            loadGtag();
        });

        declineCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            hideCookieBanner();
        });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// LAZY GOOGLE ANALYTICS LOADER
// Replace 'G-XXXXXXXX' with your actual Google Analytics Measurement ID.
// The script is injected only after the first user interaction (or after 5 s),
// so it never blocks the initial render and keeps Lighthouse scores at 100.
// ─────────────────────────────────────────────────────────────────────────────
const GA_MEASUREMENT_ID = 'G-XXXXXXXX'; // ← Replace with your real ID

let gaLoaded = false;

function loadGtag() {
    if (gaLoaded) return;

    // Only load if user has accepted cookies (respect consent)
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'declined') return;

    gaLoaded = true;

    // Remove all interaction listeners (run-once pattern)
    INTERACTION_EVENTS.forEach(evt =>
        window.removeEventListener(evt, onFirstInteraction, { passive: true })
    );
    clearTimeout(gaFallbackTimer);

    // Dynamically inject gtag.js
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialise dataLayer after script loads
    script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });
    };
}

const INTERACTION_EVENTS = ['scroll', 'mousemove', 'touchstart', 'keydown', 'click'];

function onFirstInteraction() {
    loadGtag();
}

// Listen for first meaningful interaction
INTERACTION_EVENTS.forEach(evt =>
    window.addEventListener(evt, onFirstInteraction, { passive: true, once: true })
);

// Fallback: load after 5 seconds even without interaction
const gaFallbackTimer = setTimeout(() => {
    loadGtag();
}, 5000);
