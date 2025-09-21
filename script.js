// Translation object
const translations = {
    tr: {
        'loading-text': 'Yükleniyor...',
        'logo': 'dosulu.com',
        'hero-title': 'Hoş Geldiniz',
        'hero-subtitle': 'Modern ve şık web deneyimi',
        'feature-1-title': 'Karanlık Tema',
        'feature-1-desc': 'Göz yormayan karanlık mod desteği',
        'feature-2-title': 'Mobil Uyumlu',
        'feature-2-desc': 'Tüm cihazlarda mükemmel görünüm',
        'feature-3-title': 'Hızlı Yükleme',
        'feature-3-desc': 'Optimize edilmiş performans'
    },
    en: {
        'loading-text': 'Loading...',
        'logo': 'dosulu.com',
        'hero-title': 'Welcome',
        'hero-subtitle': 'Modern and elegant web experience',
        'feature-1-title': 'Dark Theme',
        'feature-1-desc': 'Eye-friendly dark mode support',
        'feature-2-title': 'Mobile Responsive',
        'feature-2-desc': 'Perfect view on all devices',
        'feature-3-title': 'Fast Loading',
        'feature-3-desc': 'Optimized performance'
    }
};

// Language management
let currentLang = localStorage.getItem('language') || 'tr';

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update logo separately (it's in a different element)
    document.querySelector('.logo').textContent = translations[lang]['logo'];
    
    // Update language selector UI
    updateLanguageSelector();
}

function updateLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Add language selector to header
function addLanguageSelector() {
    const nav = document.querySelector('.nav');
    const langContainer = document.createElement('div');
    langContainer.className = 'lang-selector';
    langContainer.innerHTML = `
        <button class="lang-btn" data-lang="tr" title="Türkçe">TR</button>
        <button class="lang-btn" data-lang="en" title="English">EN</button>
    `;
    nav.insertBefore(langContainer, nav.firstChild);
    
    // Add event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.getAttribute('data-lang'));
        });
    });
    
    // Set initial language
    changeLanguage(currentLang);
}

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        loadingScreen.classList.add('hidden');
        mainContent.style.opacity = '1';
    }, 1000);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem('theme') || 'light-theme';
body.classList.add(currentTheme);

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
    }
});

// Clock and Date
function updateDateTime() {
    const now = new Date();
    
    // Time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    
    // Date
    const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
                    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    
    const dayName = dayNames[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    document.getElementById('day-name').textContent = dayName;
    document.getElementById('day').textContent = day;
    document.getElementById('month').textContent = month;
    document.getElementById('year').textContent = year;
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Add particle.js background after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    addLanguageSelector();
    
    // Add particles.js
    const particlesScript = document.createElement('script');
    particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    particlesScript.onload = () => {
        initParticles();
    };
    document.head.appendChild(particlesScript);
    
    // Add typing animation
    typeWriterEffect();
});

// Particles.js configuration
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#64b5f6' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#64b5f6',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Typewriter effect
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        heroTitle.textContent += originalText[i];
        i++;
        if (i === originalText.length) {
            clearInterval(typeInterval);
        }
    }, 100);
}