document.addEventListener('DOMContentLoaded', function() {
    initFilters();
    initScrollAnimations();
    initSmoothScroll();
    initCarousel();
});

function initCarousel() {
    const carousels = document.querySelectorAll('.producto-carousel');
    if (!carousels.length) return;

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');

        if (!slides.length) return;

        let current = 0;
        let autoplayInterval;
        const DELAY = 3000;

        const showSlide = (index) => {
            if (index >= slides.length) current = 0;
            else if (index < 0) current = slides.length - 1;
            else current = index;

            slides.forEach(s => s.classList.remove('active'));
            slides[current].classList.add('active');

            if (indicators.length) {
                indicators.forEach(ind => ind.classList.remove('active'));
                indicators[current]?.classList.add('active');
            }
        };

        const next = () => showSlide(current + 1);
        const prev = () => showSlide(current - 1);
        const stop = () => { clearInterval(autoplayInterval); autoplayInterval = null; };
        const start = () => { stop(); autoplayInterval = setInterval(next, DELAY); };

        nextBtn?.addEventListener('click', () => { next(); stop(); setTimeout(start, 8000); });
        prevBtn?.addEventListener('click', () => { prev(); stop(); setTimeout(start, 8000); });

        indicators.forEach((ind, i) => {
            ind.addEventListener('click', () => { showSlide(i); stop(); setTimeout(start, 8000); });
        });

        carousel.addEventListener('mouseenter', stop);
        carousel.addEventListener('mouseleave', start);

        let touchStartX = 0;
        carousel.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; stop(); }, { passive: true });
        carousel.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
            setTimeout(start, 8000);
        }, { passive: true });

        document.addEventListener('keydown', e => {
            if (!carousel.matches(':hover')) return;
            if (e.key === 'ArrowLeft') { prev(); stop(); setTimeout(start, 8000); }
            if (e.key === 'ArrowRight') { next(); stop(); setTimeout(start, 8000); }
        });

        document.addEventListener('visibilitychange', () => {
            document.hidden ? stop() : start();
        });

        showSlide(0);
        start();
    });
}

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;

    const productCards = document.querySelectorAll('.producto-card');
    const productCardsLarge = document.querySelectorAll('.producto-card-large');
    const categories = document.querySelectorAll('.productos-category');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (filter === 'all') {
                categories.forEach(cat => cat.style.display = 'block');
                [...productCards, ...productCardsLarge].forEach(card => {
                    card.classList.remove('hidden');
                    animateCard(card);
                });
            } else {
                categories.forEach(cat => {
                    cat.style.display = cat.getAttribute('id') === filter ? 'block' : 'none';
                });
                [...productCards, ...productCardsLarge].forEach(card => {
                    if (card.getAttribute('data-category') === filter) {
                        card.classList.remove('hidden');
                        animateCard(card);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }

            const section = document.querySelector('.productos-section');
            if (section) window.scrollTo({ top: section.offsetTop - 150, behavior: 'smooth' });
        });
    });
}

function animateCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.producto-card, .producto-card-large, .category-header');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
            }
        });
    });
}

function cotizarProducto(nombre) {
    window.location.href = `contacto.html?producto=${encodeURIComponent(nombre)}#asesores`;
}

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            obs.unobserve(img);
        });
    });

    images.forEach(img => observer.observe(img));
}

function createScrollToTopButton() {
    if (document.getElementById('scrollToTop')) return;

    const btn = document.createElement('button');
    btn.id = 'scrollToTop';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px;
        width: 50px; height: 50px; border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
        color: white; border: none; cursor: pointer;
        display: none; align-items: center; justify-content: center;
        font-size: 1.2rem; box-shadow: 0 4px 15px rgba(0,102,161,0.4);
        z-index: 1000; transition: all 0.3s ease;
    `;

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-5px)';
        btn.style.boxShadow = '0 6px 20px rgba(0,102,161,0.5)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 15px rgba(0,102,161,0.4)';
    });

    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
        btn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
    });
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('is-mobile');
} else {
    document.body.classList.add('is-desktop');
}

createScrollToTopButton();
initLazyLoading();
window.cotizarProducto = cotizarProducto;

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    if (!header || !nav) return;

    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.setAttribute('aria-label', 'Abrir menú');
    mobileToggle.innerHTML = '<span></span><span></span><span></span>';

    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);

    const logo = header.querySelector('div');
    logo ? logo.after(mobileToggle) : header.appendChild(mobileToggle);

    const openMenu = () => {
        nav.classList.add('active');
        overlay.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.classList.add('menu-open');
        mobileToggle.setAttribute('aria-label', 'Cerrar menú');
    };

    const closeMenu = () => {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileToggle.setAttribute('aria-label', 'Abrir menú');
    };

    mobileToggle.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        nav.classList.contains('active') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 968) setTimeout(closeMenu, 200);
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('active')) closeMenu();
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 968 && nav.classList.contains('active')) closeMenu();
        }, 250);
    });
});