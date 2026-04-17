const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
const slideInterval = 4000;
let carouselTimer;
let isTransitioning = false;

function showSlide(n) {
    if (isTransitioning) return;
    isTransitioning = true;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    setTimeout(() => { isTransitioning = false; }, 1500);
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

function startCarousel() { carouselTimer = setInterval(nextSlide, slideInterval); }
function stopCarousel() { clearInterval(carouselTimer); }
function restartCarousel() { stopCarousel(); startCarousel(); }

startCarousel();

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { showSlide(index); restartCarousel(); });
});

const carousel = document.querySelector('.hero-carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);
}

const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); restartCarousel(); });
if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); restartCarousel(); });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('fade-in-up');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.sector-card').forEach(card => observer.observe(card));

window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    header.style.boxShadow = window.scrollY > 100
        ? '0 4px 20px rgba(0,0,0,0.15)'
        : '0 2px 10px rgba(0,0,0,0.1)';
});

function preloadCarouselImages() {
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        const bg = slide.style.backgroundImage;
        if (bg) {
            const url = bg.match(/url\(['"]?([^'"]*)['"]?\)/)[1];
            new Image().src = url;
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCarouselImages);
} else {
    preloadCarouselImages();
}

const imageObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        obs.unobserve(img);
    });
});
document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('catalogModal');
    const openBtn = document.getElementById('openCatalogModal');
    const closeBtn = document.getElementById('closeCatalogModal');

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', e => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

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