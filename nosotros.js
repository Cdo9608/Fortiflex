document.addEventListener('DOMContentLoaded', function() {
    initAnimateNumbers();
    initModals();
    initScrollAnimations();
    initParallax();
    initSmoothScroll();
    initTeamCarousel();
});

function initAnimateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target'));
            if (isNaN(target)) return;

            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const tick = () => {
                current += increment;
                if (current < target) {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = target;
                }
            };

            tick();
            observer.unobserve(el);
        });
    }, { threshold: 0.3 });

    statNumbers.forEach(n => observer.observe(n));
}

function initModals() {
    const modalButtons = document.querySelectorAll('.btn-politica');
    const certCards = document.querySelectorAll('.cert-card[data-cert]');
    const modals = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.modal-close');

    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(document.getElementById(`modal-${this.getAttribute('data-modal')}`));
        });
    });

    certCards.forEach(card => {
        card.addEventListener('click', function() {
            openModal(document.getElementById(`modal-cert-${this.getAttribute('data-cert')}`));
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.closest('.modal-overlay'));
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal(modal);
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        modals.forEach(modal => {
            if (modal.classList.contains('active')) closeModal(modal);
        });
    });

    initPDFDownloads();
}

function initPDFDownloads() {
    document.querySelectorAll('.btn-download-pdf-large').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            const fileName = this.getAttribute('download');

            fetch(url)
                .then(r => r.blob())
                .then(blob => {
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = window.URL.createObjectURL(blob);
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(a.href);
                    document.body.removeChild(a);
                })
                .catch(() => window.open(url, '_blank'));
        });
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.animate-fade-up, .animate-fade-right, .animate-fade-left, .animate-scale, .animate-float'
    );
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

function initParallax() {
    // Video removido del hero — parallax deshabilitado
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - 100,
                behavior: 'smooth'
            });
        });
    });
}

function initTeamCarousel() {
    const slides = document.querySelectorAll('.team-slide');
    const dots = document.querySelectorAll('.team-carousel-dot');
    const prevBtn = document.querySelector('.team-carousel-prev');
    const nextBtn = document.querySelector('.team-carousel-next');
    const container = document.querySelector('.team-carousel-container');

    if (!slides.length) return;

    let current = 0;
    let timer;

    const showSlide = (n) => {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current]?.classList.add('active');
    };

    const next = () => showSlide(current + 1);
    const prev = () => showSlide(current - 1);
    const start = () => { timer = setInterval(next, 5000); };
    const stop = () => clearInterval(timer);
    const reset = () => { stop(); start(); };

    start();

    prevBtn?.addEventListener('click', () => { prev(); reset(); });
    nextBtn?.addEventListener('click', () => { next(); reset(); });

    dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); reset(); }));

    if (container) {
        container.addEventListener('mouseenter', stop);
        container.addEventListener('mouseleave', start);

        let touchStartX = 0;
        container.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
        container.addEventListener('touchend', e => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) > 50) { diff < 0 ? next() : prev(); reset(); }
        });
    }
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.removeAttribute('autoplay');
        video.setAttribute('poster', 'images/video-poster.jpg');
    }
}