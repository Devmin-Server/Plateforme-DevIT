// Application data
const servicesData = [
    {
        title: "Create Launchpad Plus",
        description: "Solution conviviale conçue pour faciliter le lancement et la gestion transparents des offres initiales de pièces (ICO), accepter les paiements USDT, USDC, USDX, FDUSD et BNB.",
        icon: "🚀",
        category: "launchpad"
    },
    {
        title: "Create Token Airdrop", 
        description: "Obtenez un site web d'airdrop complet, notre plateforme pour des réclamations d'airdrop sans effort et obtenez des frais ! Notre interface conviviale vous permet de réclamer rapidement et en toute sécurité des tokens gratuits.",
        icon: "🎁",
        category: "airdrop"
    },
    {
        title: "Create Launchpad",
        description: "Obtenez un site web de launchpad complet, créez votre launchpad de token ou site web de vente de token et commencez à vendre votre token super facilement, vos utilisateurs peuvent payer en utilisant le portefeuille MetaMask ou envoyer directement des BNB.",
        icon: "💎",
        category: "launchpad"
    },
    {
        title: "Create Token",
        description: "Créez un token BEP20 avec liquidité et frais de taxe sur le réseau binance smart chain en moins d'une minute, 100% de propriété du token.",
        icon: "🪙",
        category: "token"
    },
    {
        title: "Fork PancakeSwap",
        description: "Obtenez votre propre échange décentralisé (DEX) entièrement opérationnel sur binance smart chain et ethereum, comme pancake swap.",
        icon: "🥞",
        category: "dex"
    },
    {
        title: "0x-Swap",
        description: "0xSwap est une plateforme qui vous permet de créer un site web de swap personnalisé pour votre propre token, offrant une intégration transparente avec les échanges décentralisés sans codage requis.",
        icon: "🔄",
        category: "swap"
    },
    {
        title: "Digital Marketplace",
        description: "0xStore est un script conçu pour vous aider à créer un marché pour les produits numériques. Il permet d'accepter les paiements en cryptomonnaie, offrant une plateforme sécurisée et efficace pour l'économie numérique.",
        icon: "🏪",
        category: "marketplace"
    },
    {
        title: "Crypto Payment",
        description: "Vendez vos produits numériques ou services et acceptez les paiements par cryptomonnaies comme votre token, USDT, USDC, USDX et BNB, c'est gratuit et facile à utiliser dapp de paiement.",
        icon: "💳",
        category: "payment"
    },
    {
        title: "Crypto Donation",
        description: "Notre script de don crypto fournit une plateforme sécurisée et efficace pour accepter les dons en cryptomonnaie. Conçu pour les œuvres de charité, les organisations à but non lucratif et les collectes de fonds individuelles.",
        icon: "💝",
        category: "donation"
    }
];

const toolsData = [
    "Convertisseur USDT",
    "Achat Facile",
    "Token Affiliate", 
    "Achat Auto",
    "Achat et Brûlage",
    "Carte Crypto",
    "Cours Blockchain",
    "Cours Arabe",
    "Convertisseur Wei",
    "Ajouter Chaînes",
    "Hébergement Web",
    "Robinet BNB"
];

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navbarMenu = document.getElementById('navbarMenu');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebarClose');
const servicesGrid = document.getElementById('servicesGrid');
const toolsGrid = document.getElementById('toolsGrid');
const connectWalletBtn = document.querySelector('.connect-wallet-btn');
const loadingOverlay = document.getElementById('loadingOverlay');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeServices();
    initializeTools();
    setupEventListeners();
    addScrollEffects();
    addParallaxEffect();
});

// Initialize services grid
function initializeServices() {
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = '';
    
    servicesData.forEach((service, index) => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.style.animationDelay = `${index * 0.1}s`;
        
        serviceCard.innerHTML = `
            <span class="service-icon">${service.icon}</span>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <button class="demo-btn" onclick="handleDemoClick('${service.category}')">
                Démo en Direct
            </button>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
}

// Initialize tools grid
function initializeTools() {
    if (!toolsGrid) return;
    
    toolsGrid.innerHTML = '';
    
    toolsData.forEach((tool, index) => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.style.animationDelay = `${index * 0.05}s`;
        
        toolCard.innerHTML = `
            <h4>${tool}</h4>
            <p>Outil disponible</p>
        `;
        
        toolCard.addEventListener('click', () => handleToolClick(tool));
        toolsGrid.appendChild(toolCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Sidebar close
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    // Connect wallet button
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', handleWalletConnection);
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            closeSidebar();
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Handle blockchain item clicks
    document.querySelectorAll('.blockchain-item').forEach(item => {
        item.addEventListener('click', function() {
            showNotification(`Blockchain ${this.textContent} sélectionnée`, 'info');
        });
    });
    
    // Handle tool item clicks in sidebar
    document.querySelectorAll('.tool-item').forEach(item => {
        item.addEventListener('click', function() {
            handleToolClick(this.textContent);
        });
    });
    
    // Handle resource item clicks
    document.querySelectorAll('.resource-item').forEach(item => {
        item.addEventListener('click', function() {
            showNotification(`Accès à ${this.textContent}`, 'info');
        });
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    if (navbarMenu) {
        navbarMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    }
}

// Toggle sidebar
function toggleSidebar() {
    if (sidebar) {
        sidebar.classList.toggle('active');
        
        // Add animation to toggle button
        sidebarToggle.style.transform = sidebar.classList.contains('active') 
            ? 'translateY(-50%) rotate(90deg)' 
            : 'translateY(-50%) rotate(0deg)';
    }
}

// Close sidebar
function closeSidebar() {
    if (sidebar) {
        sidebar.classList.remove('active');
        sidebarToggle.style.transform = 'translateY(-50%) rotate(0deg)';
    }
}

// Handle wallet connection
async function handleWalletConnection() {
    showLoading();
    
    try {
        // Simulate wallet connection process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful connection
        connectWalletBtn.textContent = '0x1234...5678';
        connectWalletBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        
        showNotification('Portefeuille connecté avec succès !', 'success');
        
    } catch (error) {
        showNotification('Erreur de connexion au portefeuille', 'error');
    } finally {
        hideLoading();
    }
}

// Handle demo button clicks
function handleDemoClick(category) {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showNotification(`Demo ${category} lancée ! (Simulation)`, 'success');
    }, 1500);
}

// Handle tool clicks
function handleToolClick(toolName) {
    showNotification(`Outil "${toolName}" activé (Simulation)`, 'info');
}

// Show loading overlay
function showLoading() {
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }
}

// Hide loading overlay
function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--card-bg);
        border: 1px solid var(--border-glow);
        border-radius: 12px;
        padding: 1rem;
        z-index: 10000;
        max-width: 400px;
        backdrop-filter: blur(20px);
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 8px 30px rgba(0, 212, 255, 0.2);
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: white;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: var(--neon-orange);
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Add scroll effects
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe service cards and feature cards
    document.querySelectorAll('.service-card, .feature-card, .tool-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
    
    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add parallax effect to hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        floatingCards.forEach((card, index) => {
            const speed = 0.2 + (index * 0.1);
            card.style.transform = `translateY(${parallax * speed}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

// Add glitch effect to logo on hover
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        logo.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }
    
    // Add glitch animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(style);
});

// Add typing effect to hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--neon-blue)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Initialize typing effect
setTimeout(addTypingEffect, 500);

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Code Konami activé ! Mode développeur débloqué !', 'success');
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        konamiCode = [];
    }
});

// Performance optimization - lazy load animations
const lazyAnimations = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
});

document.querySelectorAll('.service-card, .feature-card').forEach(el => {
    lazyAnimations.observe(el);
});

// Export functions for global access
window.handleDemoClick = handleDemoClick;
window.handleToolClick = handleToolClick;