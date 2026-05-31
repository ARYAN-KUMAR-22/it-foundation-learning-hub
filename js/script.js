/* ===================================
   IT FOUNDATION LEARNING HUB - SCRIPTS
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ===== DOM Elements =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const scrollTopBtn = document.getElementById('scrollTop');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const logoBtn = document.getElementById('logo');

    // ===== Page Load Animation =====
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        
        // Staggered card fade-in on load
        const cards = document.querySelectorAll('.topic-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 40);
        });
    });

    // ===== Dynamic Tab Controller =====
    // High-performance event delegation listens for clicks on tab buttons globally
    document.body.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.tab-btn');
        if (!tabBtn) return;

        const card = tabBtn.closest('.topic-card');
        if (!card) return;

        // Get target tab category
        const targetTab = tabBtn.getAttribute('data-tab');

        // Deactivate all tab buttons inside this specific card
        const buttons = card.querySelectorAll('.tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        // Deactivate all tab contents inside this specific card
        const contents = card.querySelectorAll('.tab-content');
        contents.forEach(content => content.classList.remove('active'));

        // Activate selected tab button & content block
        tabBtn.classList.add('active');
        const targetContent = card.querySelector(`.tab-content[data-tab="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Track tab selection activity
        trackEvent('tabChange', {
            cardId: card.id || 'anonymous-card',
            selectedTab: targetTab
        });
    });

    // ===== Mobile Hamburger Navigation Menu =====
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });

        // Close menu when clicking outside of the navbar
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }

    // ===== Scroll to Top Button =====
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Active Navigation Link Highlighting on Scroll =====
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const sections = document.querySelectorAll('.topic-section');
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Trigger highlight offset slightly early for better responsiveness
            if (scrollPosition >= (sectionTop - 160)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').slice(1);
            if (href === currentSectionId) {
                link.classList.add('active');
            }
        });
    });

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            
            if (targetSection) {
                const headerOffset = 90;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Logo returns to top
    if (logoBtn) {
        logoBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Keyboard Navigation Access =====
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile navbar menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });

    // ===== Event Tracker Analytics Placeholder =====
    function trackEvent(eventName, eventData = {}) {
        console.log(`[Analytics] Tracked: ${eventName}`, eventData);
    }

    // Log load readiness
    trackEvent('pageView', {
        title: 'IT Foundation Learning Hub',
        timestamp: new Date().toISOString()
    });

    console.log('✅ IT Foundation Learning Hub Upgraded successfully.');
});
