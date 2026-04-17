(() => {
    'use strict';

    const DATA = {
        proyectos: [
            { img: 'galeria/proyectos/proyecto_1.jpg',  title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_2.jpg',  title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_3.jpg',  title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_4.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_5.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_6.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_7.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_8.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto1.jpeg',  title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto2.jpeg',  title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_a.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_b.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_c.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_d.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_e.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_f.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_g.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_h.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_i.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_j.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_k.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_l.jpeg', title: 'Proyecto' },
            { img: 'galeria/proyectos/proyecto_m.jpeg', title: 'Proyecto' }
        ],
        eventos: [
            { img: 'galeria/eventos/agriexpo2025/agriexpo2025.jpeg',   title: 'agriexpo' },
            { img: 'galeria/eventos/agriexpo2025/agriexpo2025_1.jpeg', title: 'agriexpo' },
            { img: 'galeria/eventos/agriexpo2025/agriexpo2025_2.jpeg', title: 'agriexpo' },
            { img: 'galeria/eventos/agriexpo2025/agriexpo2025_3.jpeg', title: 'agriexpo' },
            { img: 'galeria/eventos/agrofest2026/agrofest_2026_1.jpeg', title: 'agrofest' },
            { img: 'galeria/eventos/agrofest2026/agrofest_2026_2.jpeg', title: 'agrofest' },
            { img: 'galeria/eventos/agrofest2026/agrofest_2026_3.jpeg', title: 'agrofest' },
            { img: 'galeria/eventos/agrofest2026/agrofest_2026_4.jpeg', title: 'agrofest' },
            { img: 'galeria/eventos/agrofest2026/agrofest_2026_5.jpeg', title: 'agrofest' },
            { img: 'galeria/eventos/agrofest2026/agrofest_2026_6.jpeg', title: 'agrofest' },
            { img: 'galeria/eventos/expoagua2021/expoagua_2021.jpeg',  title: 'expoagua' }
        ],
        galeria: [
            { img: 'galeria/galeria/fortiflex_1.jpeg',  title: 'Foto 01' },
            { img: 'galeria/galeria/fortiflex_21.jpeg', title: 'Foto 21' },
            { img: 'galeria/galeria/fortiflex_4.jpeg',  title: 'Foto 04' },
            { img: 'galeria/galeria/fortiflex_5.jpeg',  title: 'Foto 05' },
            { img: 'galeria/galeria/fortiflex_6.jpeg',  title: 'Foto 06' },
            { img: 'galeria/galeria/fortiflex_7.jpeg',  title: 'Foto 07' },
            { img: 'galeria/galeria/fortiflex_8.jpeg',  title: 'Foto 08' },
            { img: 'galeria/galeria/fortiflex_9.jpeg',  title: 'Foto 09' },
            { img: 'galeria/galeria/fortiflex_2.jpeg',  title: 'Foto 02' },
            { img: 'galeria/galeria/fortiflex_10.jpeg', title: 'Foto 10' },
            { img: 'galeria/galeria/fortiflex_11.jpeg', title: 'Foto 11' },
            { img: 'galeria/galeria/fortiflex_12.jpeg', title: 'Foto 12' },
            { img: 'galeria/galeria/fortiflex_13.jpeg', title: 'Foto 13' },
            { img: 'galeria/galeria/fortiflex_14.jpeg', title: 'Foto 14' },
            { img: 'galeria/galeria/fortiflex_15.jpeg', title: 'Foto 15' },
            { img: 'galeria/galeria/fortiflex_16.jpeg', title: 'Foto 16' },
            { img: 'galeria/galeria/fortiflex_17.jpeg', title: 'Foto 17' },
            { img: 'galeria/galeria/fortiflex_18.jpeg', title: 'Foto 18' },
            { img: 'galeria/galeria/fortiflex_19.jpeg', title: 'Foto 19' },
            { img: 'galeria/galeria/fortiflex_20.jpeg', title: 'Foto 20' },
            { img: 'galeria/galeria/fortiflex_3.jpeg',  title: 'Foto 03' }
        ]
    };

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    const isTouch = () => window.matchMedia('(pointer: coarse)').matches;

    function initReveal() {
        const els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-in');
                    io.unobserve(e.target);
                }
            }
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        els.forEach(el => io.observe(el));
    }

    function initCounters() {
        const nums = document.querySelectorAll('.kpi-num[data-target]');
        if (!nums.length) return;

        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (!e.isIntersecting) continue;
                const el = e.target;
                const target = Number(el.getAttribute('data-target') || '0');
                if (!Number.isFinite(target)) continue;

                const start = performance.now();
                const tick = (t) => {
                    const p = clamp((t - start) / 1400, 0, 1);
                    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                io.unobserve(el);
            }
        }, { threshold: 0.35 });

        nums.forEach(n => io.observe(n));
    }

    function mountCarousel(stageEl, items) {
        const deck = stageEl.querySelector('[data-deck]');
        const dotsWrap = stageEl.querySelector('[data-dots]');
        const btnPrev = stageEl.querySelector('[data-prev]');
        const btnNext = stageEl.querySelector('[data-next]');
        const viewport = stageEl.querySelector('.stage__viewport');

        if (!deck || !dotsWrap || !viewport) return;

        let index = 0;
        const lbList = items.map(x => ({ src: x.img, caption: x.caption || x.title || '' }));

        deck.innerHTML = '';
        dotsWrap.innerHTML = '';

        const cards = items.map((item, i) => {
            const card = document.createElement('article');
            card.className = 'card3d';
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `${item.title} - abrir imagen`);
            card.dataset.i = String(i);
            card.innerHTML = `<img class="card3d__img" src="${item.img}" alt="${item.title}"><div class="card3d__glow"></div>`;

            const open = () => openLightbox(lbList, i);
            card.addEventListener('click', open);
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
            });
            deck.appendChild(card);

            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.type = 'button';
            dot.setAttribute('aria-label', `Ir a ${i + 1}`);
            dot.addEventListener('click', () => { index = i; render(); });
            dotsWrap.appendChild(dot);

            return card;
        });

        function render() {
            cards.forEach((card, i) => {
                const offset = i - index;
                const visible = Math.abs(offset) <= 3;
                card.style.opacity = visible ? '1' : '0';
                card.style.pointerEvents = visible ? 'auto' : 'none';
                card.style.filter = offset === 0 ? 'none' : 'blur(0.4px) saturate(0.9)';
                card.style.transform = `translateX(${offset * 34}px) translateY(${Math.abs(offset) * 10}px) translateZ(${-Math.abs(offset) * 120}px) rotateY(${offset * -8}deg) rotateZ(${offset * -1.2}deg)`;
                card.style.zIndex = String(100 - Math.abs(offset));
            });

            dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('is-active', i === index));
        }

        const next = () => { index = (index + 1) % items.length; render(); };
        const prev = () => { index = (index - 1 + items.length) % items.length; render(); };

        btnNext?.addEventListener('click', next);
        btnPrev?.addEventListener('click', prev);

        viewport.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        });

        let sx = 0, dx = 0;
        viewport.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX; dx = 0; }, { passive: true });
        viewport.addEventListener('touchmove', e => { dx = e.changedTouches[0].clientX - sx; }, { passive: true });
        viewport.addEventListener('touchend', () => { if (Math.abs(dx) > 45) dx < 0 ? next() : prev(); });

        if (!isTouch()) {
            viewport.addEventListener('mousemove', e => {
                const active = deck.querySelector(`.card3d[data-i="${index}"]`);
                if (!active) return;
                const r = viewport.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width;
                const y = (e.clientY - r.top) / r.height;
                active.style.setProperty('--mx', `${x * 100}%`);
                active.style.setProperty('--my', `${y * 100}%`);
                render();
                active.style.transform += ` rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateZ(10px)`;
            });
            viewport.addEventListener('mouseleave', render);
        }

        let timer = setInterval(next, 6500);
        const stop = () => clearInterval(timer);
        const start = () => { stop(); timer = setInterval(next, 6500); };

        stageEl.addEventListener('mouseenter', stop);
        stageEl.addEventListener('mouseleave', start);
        stageEl.addEventListener('focusin', stop);
        stageEl.addEventListener('focusout', start);

        render();
    }

    const LB = { open: false, list: [], i: 0, els: {} };

    function initLightbox() {
        const root = document.getElementById('fxLightbox');
        if (!root) return;

        LB.els.root = root;
        LB.els.img = root.querySelector('.fx-lightbox__img');
        LB.els.cap = root.querySelector('.fx-lightbox__cap');
        LB.els.prev = root.querySelector('[data-lb-prev]');
        LB.els.next = root.querySelector('[data-lb-next]');

        root.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', closeLightbox));
        LB.els.prev?.addEventListener('click', () => stepLightbox(-1));
        LB.els.next?.addEventListener('click', () => stepLightbox(1));

        document.addEventListener('keydown', e => {
            if (!LB.open) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') stepLightbox(1);
            if (e.key === 'ArrowLeft') stepLightbox(-1);
        });
    }

    function openLightbox(list, index) {
        if (!LB.els.root) return;
        LB.open = true;
        LB.list = list;
        LB.i = index;
        LB.els.root.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        LB.els.root.setAttribute('aria-hidden', 'false');
        renderLightbox();
    }

    function closeLightbox() {
        if (!LB.els.root) return;
        LB.open = false;
        LB.els.root.classList.remove('is-open');
        document.body.style.overflow = '';
        LB.els.root.setAttribute('aria-hidden', 'true');
    }

    function stepLightbox(dir) {
        if (!LB.open || !LB.list.length) return;
        LB.i = (LB.i + dir + LB.list.length) % LB.list.length;
        renderLightbox();
    }

    function renderLightbox() {
        const item = LB.list[LB.i];
        if (!item) return;
        LB.els.img.src = item.src;
        LB.els.img.alt = item.caption || 'Imagen';
        LB.els.cap.textContent = item.caption || '';
    }

    document.addEventListener('DOMContentLoaded', () => {
        initReveal();
        initCounters();
        initLightbox();

        document.querySelectorAll('.stage[data-carousel]').forEach(stage => {
            const key = stage.getAttribute('data-carousel');
            mountCarousel(stage, DATA[key] || []);
        });
    });
})();

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