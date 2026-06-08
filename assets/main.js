/* =========================================================
   LIMONADA WEB · main.js — Edition Premium
   Cursor, contadores, tilt 3D, mockups realistas
   ========================================================= */
(() => {
  'use strict';

  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const isMobile = window.matchMedia('(hover: none)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // CURSOR
  if (!isMobile) {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (dot && ring) {
      let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
      document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; }, { passive: true });
      (function loop() { rx += (mx-rx)*0.1; ry += (my-ry)*0.1; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(loop); })();
      document.querySelectorAll('a, button, .glass-card, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });
      document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
      document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
    }
  }

  // SCROLL PROGRESS
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      progressBar.style.width = (h > 0 ? (scrollY/h)*100 : 0) + '%';
    }, { passive: true });
  }

  // NAV SCROLLED
  const header = document.querySelector('header');
  if (header) addEventListener('scroll', () => header.classList.toggle('nav-scrolled', scrollY > 60), { passive: true });

  // SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));

  // COUNTERS
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 1600;
        const startTime = performance.now();
        el.classList.add('is-counting');
        (function tick(now) {
          const p = Math.min((now - startTime)/duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.floor(eased * target);
          el.textContent = prefix + val.toLocaleString('es-ES') + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else { el.textContent = prefix + target.toLocaleString('es-ES') + suffix; el.classList.remove('is-counting'); }
        })(performance.now());
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cObs.observe(el));
  }

  // TILT 3D
  if (!isMobile && !reduceMotion) {
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX-r.left)/r.width-0.5, y = (e.clientY-r.top)/r.height-0.5;
        card.style.transform = `perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-6px) scale(1.01)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .6s cubic-bezier(.2,.7,.2,1), border-color .4s, box-shadow .4s';
        setTimeout(() => card.style.transition = '', 600);
      });
    });

    // MAGNETIC BUTTONS
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX-r.left-r.width/2)*0.28, y = (e.clientY-r.top-r.height/2)*0.28;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => btn.style.transform = '');
    });

    // PARALLAX
    const heroInner = document.querySelector('.hero-inner');
    const auroras = document.querySelectorAll('.aurora');
    addEventListener('scroll', () => {
      const s = scrollY;
      if (s < 800) {
        if (heroInner) heroInner.style.transform = `translateY(${s*0.15}px)`;
        auroras.forEach(a => a.style.transform = `translateY(${s*0.25}px)`);
      }
    }, { passive: true });
  }

  // FAQ ACCORDION
  document.querySelectorAll('.faq-item').forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) trigger.addEventListener('click', () => {
      const open = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(o => o.classList.remove('is-open'));
      if (!open) item.classList.add('is-open');
    });
  });

  // =========================================================
  // MOCKUPS — Realistas, basados en las webs reales
  // =========================================================
  const mockups = {

    /* RED DESGUACE — Recreación fiel de la web real */
    'red-desguace': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="rdHero" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a2a1a"/><stop offset="100%" stop-color="#0d1d0d"/></linearGradient>
        <linearGradient id="rdOverlay" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#000000" stop-opacity="0.3"/><stop offset="100%" stop-color="#000000" stop-opacity="0.7"/></linearGradient>
        <pattern id="rdWarehouse" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="60" fill="#1f2f1f"/>
          <rect x="2" y="2" width="56" height="56" rx="2" fill="#1a261a" stroke="#2a3a2a" stroke-width="0.5"/>
          <line x1="0" y1="30" x2="60" y2="30" stroke="#0d1a0d" stroke-width="0.5"/>
        </pattern>
      </defs>
      <!-- BG warehouse simulado -->
      <rect width="800" height="500" fill="url(#rdHero)"/>
      <rect width="800" height="500" fill="url(#rdWarehouse)" opacity="0.4"/>
      <!-- Header blanco -->
      <rect x="0" y="0" width="800" height="56" fill="#fefdf7"/>
      <!-- Logo verde reciclaje -->
      <g transform="translate(28,18)">
        <circle cx="14" cy="14" r="13" fill="none" stroke="#3f8e26" stroke-width="2"/>
        <path d="M8 16 L14 10 L20 16 M14 10 L14 20" fill="none" stroke="#3f8e26" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <!-- Nav links -->
      <text x="76" y="34" font-family="ui-sans-serif" font-size="12" fill="#0d2a1f" font-weight="600">Inicio</text>
      <text x="124" y="34" font-family="ui-sans-serif" font-size="12" fill="#0d2a1f" font-weight="600">Piezas</text>
      <text x="172" y="34" font-family="ui-sans-serif" font-size="12" fill="#0d2a1f" font-weight="600">Vehículos</text>
      <text x="232" y="34" font-family="ui-sans-serif" font-size="12" fill="#0d2a1f" font-weight="600">Desguaces</text>
      <text x="300" y="34" font-family="ui-sans-serif" font-size="12" fill="#0d2a1f" font-weight="600">Talleres</text>
      <!-- Trust badge -->
      <text x="560" y="28" font-family="ui-sans-serif" font-size="10" fill="#3f8e26" font-weight="700">✓ Vendedores verificados</text>
      <text x="560" y="42" font-family="ui-sans-serif" font-size="8" fill="#5a7a5a">Solo centros CAT autorizados</text>
      <rect x="700" y="14" width="80" height="28" rx="4" fill="none" stroke="#0d2a1f" stroke-width="1"/>
      <text x="740" y="32" font-family="ui-sans-serif" font-size="11" fill="#0d2a1f" font-weight="600" text-anchor="middle">Acceso CAT</text>
      <!-- Hero -->
      <rect x="0" y="56" width="800" height="240" fill="url(#rdOverlay)"/>
      <text x="400" y="120" font-family="ui-sans-serif" font-size="22" fill="#fff" text-anchor="middle" font-weight="700">Encuentra el <tspan fill="#7fbf3f">recambio</tspan> que necesitas</text>
      <text x="400" y="142" font-family="ui-sans-serif" font-size="11" fill="#d4e8c8" text-anchor="middle">Stock real de desguaces autorizados. Contacta directamente con el</text>
      <text x="400" y="155" font-family="ui-sans-serif" font-size="11" fill="#d4e8c8" text-anchor="middle">desguace por WhatsApp.</text>
      <!-- Buscador -->
      <rect x="200" y="178" width="320" height="44" rx="4" fill="#fff"/>
      <text x="216" y="205" font-family="ui-sans-serif" font-size="11" fill="#9aa89a">Marca, modelo, motor, referencia... (ej: bendix golf)</text>
      <rect x="528" y="178" width="80" height="44" rx="4" fill="#d4a017"/>
      <text x="568" y="205" font-family="ui-sans-serif" font-size="12" fill="#fff" text-anchor="middle" font-weight="800">BUSCAR</text>
      <!-- Stats -->
      <text x="300" y="265" font-family="Archivo Black,sans-serif" font-size="22" fill="#fff" text-anchor="middle">+185.000</text>
      <text x="300" y="280" font-family="ui-sans-serif" font-size="9" fill="#a8c89a" text-anchor="middle" letter-spacing="2">PIEZAS</text>
      <text x="400" y="265" font-family="Archivo Black,sans-serif" font-size="22" fill="#fff" text-anchor="middle">CAT</text>
      <text x="400" y="280" font-family="ui-sans-serif" font-size="9" fill="#a8c89a" text-anchor="middle" letter-spacing="2">AUTORIZADOS</text>
      <text x="500" y="265" font-family="Archivo Black,sans-serif" font-size="22" fill="#fff" text-anchor="middle">+1.200</text>
      <text x="500" y="280" font-family="ui-sans-serif" font-size="9" fill="#a8c89a" text-anchor="middle" letter-spacing="2">MODELOS</text>
      <!-- Sección piezas -->
      <rect x="0" y="296" width="800" height="204" fill="#f5f3eb"/>
      <text x="24" y="320" font-family="ui-sans-serif" font-size="14" fill="#0d2a1f" font-weight="700">Últimas piezas añadidas</text>
      <text x="776" y="320" font-family="ui-sans-serif" font-size="11" fill="#3f8e26" text-anchor="end">Ver todo el catálogo →</text>
      <!-- 5 cards piezas reales -->
      ${[
        ['MANETA EXT.', 'CITROEN XSARA', '11,47 €'],
        ['ANTENA', 'CITROEN XSARA', '6,96 €'],
        ['BRAZO LIMPIA', 'CITROEN XSARA', '15,44 €'],
        ['CERRADURA', 'CITROEN XSARA', '25,05 €'],
        ['COMPRESOR AIRE', 'CITROEN XSARA', '62,80 €']
      ].map(([p,m,pr], i) => `
        <g transform="translate(${24+i*152},338)">
          <rect width="140" height="148" rx="4" fill="#fff" stroke="#e5e3db"/>
          <rect width="140" height="78" rx="4" fill="#d8d4c4"/>
          <rect x="4" y="4" width="40" height="14" rx="2" fill="#fff"/>
          <text x="24" y="14" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="600">REF ${1935059+i}</text>
          <circle cx="70" cy="42" r="20" fill="none" stroke="#b8b4a8" stroke-width="1.5"/>
          <text x="8" y="92" font-family="ui-sans-serif" font-size="8" fill="#0d2a1f" font-weight="700">${p}</text>
          <text x="8" y="104" font-family="ui-sans-serif" font-size="7" fill="#3f8e26" font-weight="600">${m}</text>
          <text x="8" y="116" font-family="ui-sans-serif" font-size="6" fill="#7a8a7a">1.6 16V · 109 CV</text>
          <text x="8" y="130" font-family="Archivo Black,sans-serif" font-size="10" fill="#0d2a1f">${pr}</text>
          <rect x="4" y="132" width="132" height="12" rx="2" fill="#25D366"/>
          <text x="70" y="141" font-family="ui-sans-serif" font-size="7" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
        </g>
      `).join('')}
    </svg>`,

    /* RECICLACAT APP — Móvil con wizard de descontaminación */
    'reciclacat': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="rc0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1B4332"/><stop offset="100%" stop-color="#2D6A30"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#rc0)"/>
      <!-- Decoración fondo -->
      <circle cx="120" cy="120" r="60" fill="#67C23A" opacity="0.05"/>
      <circle cx="680" cy="380" r="80" fill="#F4C430" opacity="0.06"/>
      <!-- Phone frame -->
      <rect x="220" y="20" width="360" height="460" rx="40" fill="#0a1f15" stroke="#000" stroke-width="3"/>
      <rect x="232" y="32" width="336" height="438" rx="30" fill="#fff"/>
      <!-- Status bar -->
      <text x="252" y="58" font-family="ui-sans-serif" font-size="11" fill="#1a2332" font-weight="700">09:41</text>
      <text x="540" y="58" font-family="ui-sans-serif" font-size="11" fill="#1a2332" font-weight="700">···</text>
      <!-- App header verde -->
      <rect x="232" y="70" width="336" height="92" fill="#1B4332"/>
      <text x="252" y="100" font-family="ui-sans-serif" font-size="10" fill="#a8dc8a" letter-spacing="2" font-weight="600">RECICLACAT · CAT</text>
      <text x="252" y="124" font-family="Georgia,serif" font-style="italic" font-size="22" fill="#fff">Descontaminación</text>
      <text x="252" y="146" font-family="ui-sans-serif" font-size="11" fill="#a8dc8a">VFU-2024-0847 · SEAT Ibiza 2018</text>
      <!-- Progress steps -->
      <g transform="translate(252,186)">
        <line x1="22" y1="18" x2="294" y2="18" stroke="#e0ebe2" stroke-width="2"/>
        <line x1="22" y1="18" x2="184" y2="18" stroke="#67C23A" stroke-width="2"/>
        <circle cx="22" cy="18" r="18" fill="#67C23A"/><text x="22" y="23" font-size="14" fill="#fff" text-anchor="middle" font-weight="700">✓</text>
        <text x="22" y="56" font-family="ui-sans-serif" font-size="9" fill="#1B4332" text-anchor="middle">Registro</text>
        <circle cx="113" cy="18" r="18" fill="#67C23A"/><text x="113" y="23" font-size="14" fill="#fff" text-anchor="middle" font-weight="700">✓</text>
        <text x="113" y="56" font-family="ui-sans-serif" font-size="9" fill="#1B4332" text-anchor="middle">Fluidos</text>
        <circle cx="204" cy="18" r="18" fill="#F4C430"/><text x="204" y="23" font-size="12" fill="#1B4332" text-anchor="middle" font-weight="700">3</text>
        <text x="204" y="56" font-family="ui-sans-serif" font-size="9" fill="#1B4332" text-anchor="middle" font-weight="700">BST/HV</text>
        <circle cx="295" cy="18" r="18" fill="none" stroke="#cfd8d2" stroke-width="2"/><text x="295" y="23" font-size="12" fill="#7a8a7a" text-anchor="middle">4</text>
        <text x="295" y="56" font-family="ui-sans-serif" font-size="9" fill="#7a8a7a" text-anchor="middle">Acta</text>
      </g>
      <!-- Step card -->
      <rect x="252" y="260" width="296" height="188" rx="14" fill="#f6fbf2" stroke="#67C23A33"/>
      <text x="272" y="284" font-family="ui-monospace" font-size="9" fill="#67C23A" letter-spacing="2" font-weight="700">PASO 3 · BOLETÍN HV</text>
      <text x="272" y="306" font-family="ui-sans-serif" font-size="14" fill="#1B4332" font-weight="700">Supresión de tensión</text>
      <text x="272" y="320" font-family="ui-sans-serif" font-size="10" fill="#5a6a5a">RD 614/2001 · vehículos eléctricos</text>
      <g transform="translate(272,336)">
        <rect width="18" height="18" rx="4" fill="#67C23A"/><text x="9" y="13" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">✓</text>
        <text x="28" y="13" font-family="ui-sans-serif" font-size="11" fill="#1B4332">Desconexión seccionador</text>
      </g>
      <g transform="translate(272,360)">
        <rect width="18" height="18" rx="4" fill="#67C23A"/><text x="9" y="13" font-size="11" fill="#fff" text-anchor="middle" font-weight="700">✓</text>
        <text x="28" y="13" font-family="ui-sans-serif" font-size="11" fill="#1B4332">Espera (5 min) cumplida</text>
      </g>
      <g transform="translate(272,384)">
        <rect width="18" height="18" rx="4" fill="none" stroke="#F4C430" stroke-width="2"/>
        <text x="28" y="13" font-family="ui-sans-serif" font-size="11" fill="#F4C430" font-weight="600">Medición tensión residual</text>
      </g>
      <g transform="translate(272,408)">
        <rect width="18" height="18" rx="4" fill="none" stroke="#cfd8d2" stroke-width="2"/>
        <text x="28" y="13" font-family="ui-sans-serif" font-size="11" fill="#7a8a7a">Bloqueo y etiquetado</text>
      </g>
      <!-- CTA generar PDF -->
      <rect x="252" y="438" width="296" height="22" rx="11" fill="#1B4332"/>
      <text x="400" y="453" font-family="ui-sans-serif" font-size="10" fill="#fff" text-anchor="middle" font-weight="700">⬇ Generar Boletín PDF firmado</text>
    </svg>`,

    /* MEDIBITÁCORA — App de salud */
    'medibitacora': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="mb0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a8970"/><stop offset="100%" stop-color="#0d6b56"/></linearGradient></defs>
      <rect width="800" height="500" fill="#eef5f2"/>
      <circle cx="120" cy="120" r="80" fill="#1a8970" opacity="0.05"/>
      <circle cx="680" cy="380" r="100" fill="#F4C430" opacity="0.05"/>
      <rect x="210" y="20" width="380" height="460" rx="38" fill="#1a2332" stroke="#0a1018" stroke-width="3"/>
      <rect x="222" y="32" width="356" height="436" rx="28" fill="#fff"/>
      <text x="240" y="58" font-family="ui-sans-serif" font-size="11" fill="#1a2332" font-weight="700">09:41</text>
      <text x="540" y="58" font-family="ui-sans-serif" font-size="11" fill="#1a2332" font-weight="700">94%</text>
      <rect x="222" y="66" width="356" height="92" fill="url(#mb0)"/>
      <text x="244" y="94" font-family="ui-sans-serif" font-size="10" fill="#a8e8d0" letter-spacing="2" font-weight="600">BUENOS DÍAS, GUSTAVO</text>
      <text x="244" y="120" font-family="Georgia,serif" font-style="italic" font-size="24" fill="#fff">Tu salud, en orden</text>
      <text x="244" y="140" font-family="ui-sans-serif" font-size="11" fill="#a8e8d0">3 citas · 12 registros este mes</text>
      <!-- Botón flotante + -->
      <circle cx="540" cy="116" r="22" fill="#fff" opacity="0.15"/>
      <text x="540" y="123" font-family="ui-sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="300">+</text>
      <!-- Cards -->
      ${[
        ['📅', '#1a8970', 'Próxima cita', 'Cardiología · 18 jun · 10:30'],
        ['💊', '#F4C430', 'Medicación', '3 pendientes hoy · ver pauta'],
        ['📋', '#0d6b56', 'Síntomas', 'Último registro: hace 2 días'],
        ['📈', '#5a7d72', 'Constantes', 'TA 120/80 · FC 68 ppm'],
        ['📄', '#1a2332', 'Exportar PDF', 'Historial completo · 24 meses']
      ].map(([ic,c,t,d], i) => `
        <g transform="translate(242,${172+i*58})">
          <rect width="316" height="50" rx="12" fill="#f6fbf2" stroke="#e0e8e3"/>
          <circle cx="26" cy="25" r="14" fill="${c}"/>
          <text x="26" y="30" font-size="13" fill="#fff" text-anchor="middle">${ic}</text>
          <text x="50" y="21" font-family="ui-sans-serif" font-size="12" fill="#1a2332" font-weight="700">${t}</text>
          <text x="50" y="36" font-family="ui-sans-serif" font-size="10" fill="#5a6878">${d}</text>
          <text x="298" y="29" font-family="ui-sans-serif" font-size="16" fill="#1a8970" text-anchor="middle">›</text>
        </g>
      `).join('')}
    </svg>`,

    /* HOLA ITV MÁLAGA — Web corporativa B2B */
    'hola-itv': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="itv0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a2540"/><stop offset="100%" stop-color="#0f2d55"/></linearGradient>
      </defs>
      <rect width="800" height="450" fill="#fff"/>
      <!-- Nav -->
      <rect x="0" y="0" width="800" height="56" fill="#fff"/>
      <line x1="0" y1="55" x2="800" y2="55" stroke="#e8ecf2"/>
      <text x="32" y="28" font-family="Archivo Black,sans-serif" font-size="13" fill="#0f2d55">H HOLA ITV MÁLAGA</text>
      <text x="32" y="42" font-family="ui-sans-serif" font-size="9" fill="#6a7a9a" letter-spacing="0.5">Servicios del Automóvil</text>
      <rect x="668" y="16" width="100" height="24" rx="4" fill="#0f2d55"/>
      <text x="718" y="32" font-family="ui-sans-serif" font-size="11" fill="#fff" text-anchor="middle" font-weight="600">Contactar →</text>
      <!-- Hero -->
      <rect x="0" y="56" width="800" height="240" fill="url(#itv0)"/>
      <!-- Coche silueta -->
      <g opacity="0.3" transform="translate(540,140)">
        <path d="M0 60 Q30 30 80 30 Q140 30 180 50 L180 90 L-10 90 Z" fill="#fff"/>
        <circle cx="40" cy="90" r="15" fill="#fff"/>
        <circle cx="140" cy="90" r="15" fill="#fff"/>
        <circle cx="40" cy="90" r="8" fill="#0f2d55"/>
        <circle cx="140" cy="90" r="8" fill="#0f2d55"/>
      </g>
      <text x="48" y="108" font-family="ui-sans-serif" font-size="10" fill="#F4C430" letter-spacing="2" font-weight="700">SERVICIO B2B EXCLUSIVO</text>
      <text x="48" y="148" font-family="Archivo Black,sans-serif" font-size="32" fill="#fff">Tu flota con la ITV</text>
      <text x="48" y="186" font-family="Georgia,serif" font-style="italic" font-size="30" fill="#F4C430">al día, sin mover un dedo</text>
      <text x="48" y="212" font-family="ui-sans-serif" font-size="13" fill="#c5d2e0">Gestionamos citas, recogemos los vehículos, pasamos la inspección y</text>
      <text x="48" y="228" font-family="ui-sans-serif" font-size="13" fill="#c5d2e0">los devolvemos. Tasas adelantadas, factura única.</text>
      <rect x="48" y="248" width="140" height="32" rx="4" fill="#F4C430"/>
      <text x="118" y="268" font-family="ui-sans-serif" font-size="12" fill="#0f2d55" text-anchor="middle" font-weight="700">Escríbenos</text>
      <text x="208" y="268" font-family="ui-sans-serif" font-size="12" fill="#fff">Cómo funciona →</text>
      <!-- Sección 3 ventajas -->
      <rect x="0" y="296" width="800" height="154" fill="#fafbfc"/>
      <text x="400" y="324" font-family="ui-sans-serif" font-size="10" fill="#6a7a9a" letter-spacing="2" text-anchor="middle">VENTAJAS</text>
      <text x="400" y="346" font-family="Archivo Black,sans-serif" font-size="18" fill="#0f2d55" text-anchor="middle">Cuatro pasos, cero complicaciones</text>
      ${[
        ['💶', 'Tasas adelantadas', 'Sin que tu equipo maneje dinero'],
        ['🧾', 'Factura única', 'Todo consolidado en una sola factura'],
        ['🔑', 'Cero gestión', 'Nos encargamos de localizar las citas']
      ].map(([ic,t,d], i) => `
        <g transform="translate(${48+i*240},370)">
          <text x="0" y="14" font-size="20">${ic}</text>
          <text x="34" y="12" font-family="ui-sans-serif" font-size="11" fill="#0f2d55" font-weight="700">${t}</text>
          <text x="34" y="28" font-family="ui-sans-serif" font-size="9" fill="#6a7a9a">${d}</text>
        </g>
      `).join('')}
    </svg>`,

    /* DESGUACES SOLIVA — Catálogo verde */
    'desguaces-soliva': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="450" fill="#f5f3eb"/>
      <!-- Nav -->
      <rect x="0" y="0" width="800" height="60" fill="#1a4a35"/>
      <text x="32" y="38" font-family="Archivo Black,sans-serif" font-size="16" fill="#c0dd97">DESGUACES SOLIVA</text>
      <text x="600" y="32" font-family="ui-sans-serif" font-size="11" fill="#fff">Catálogo</text>
      <text x="660" y="32" font-family="ui-sans-serif" font-size="11" fill="#fff">Vehículos</text>
      <text x="730" y="32" font-family="ui-sans-serif" font-size="11" fill="#fff">Contacto</text>
      <!-- Hero -->
      <text x="32" y="100" font-family="Archivo Black,sans-serif" font-size="22" fill="#0d2a1f">Piezas de ocasión</text>
      <text x="32" y="122" font-family="ui-sans-serif" font-size="13" fill="#3f8e26" font-weight="600">+12.000 referencias disponibles · Envíos a toda España</text>
      <!-- Buscador -->
      <rect x="32" y="140" width="540" height="44" rx="22" fill="#fff" stroke="#1a4a3522"/>
      <text x="56" y="167" font-family="ui-sans-serif" font-size="12" fill="#7a8a7a">🔍  Pieza, marca, modelo, año...</text>
      <rect x="584" y="140" width="100" height="44" rx="22" fill="#3f8e26"/>
      <text x="634" y="167" font-family="ui-sans-serif" font-size="13" fill="#fff" text-anchor="middle" font-weight="700">Buscar</text>
      <text x="696" y="167" font-family="ui-sans-serif" font-size="11" fill="#3f8e26">Filtros ⚙</text>
      <!-- Grid 4 piezas -->
      ${[
        ['Motor 1.6 TDI', 'VW Golf VII', '2014', '420€', 'DISPONIBLE'],
        ['Caja DSG-7', 'Audi A3', '2016', '650€', 'DISPONIBLE'],
        ['Puerta del. der.', 'Seat León III', '2018', '140€', 'BAJO STOCK'],
        ['Alternador 140A', 'Ford Focus IV', '2020', '95€', 'DISPONIBLE']
      ].map(([p,m,y,pr,st], i) => `
        <g transform="translate(${32+i*190},210)">
          <rect width="175" height="220" rx="8" fill="#fff" stroke="#e8e3d5"/>
          <rect x="0" y="0" width="175" height="115" rx="8" fill="#3a4a3a"/>
          <circle cx="87" cy="60" r="30" fill="none" stroke="#67C23A55" stroke-width="2"/>
          <rect x="6" y="6" width="36" height="14" rx="2" fill="#F4C430"/>
          <text x="24" y="16" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="700">REF ${1234+i}</text>
          <text x="12" y="135" font-family="ui-sans-serif" font-size="12" fill="#0d2a1f" font-weight="700">${p}</text>
          <text x="12" y="150" font-family="ui-sans-serif" font-size="10" fill="#3f8e26" font-weight="600">${m} (${y})</text>
          <text x="12" y="164" font-family="ui-sans-serif" font-size="9" fill="#7a8a7a">Garantía 30 días</text>
          <text x="12" y="190" font-family="Archivo Black,sans-serif" font-size="20" fill="#0d2a1f">${pr}</text>
          <rect x="12" y="198" width="68" height="16" rx="2" fill="#25D366"/>
          <text x="46" y="208" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
          <rect x="84" y="198" width="79" height="16" rx="2" fill="${st==='DISPONIBLE'?'#3f8e26':'#F4C430'}" fill-opacity="0.15" stroke="${st==='DISPONIBLE'?'#3f8e26':'#F4C430'}" stroke-width="0.5"/>
          <text x="123" y="208" font-family="ui-monospace" font-size="6" fill="${st==='DISPONIBLE'?'#3f8e26':'#a87f00'}" text-anchor="middle" font-weight="700">${st}</text>
        </g>
      `).join('')}
    </svg>`,

    /* RECAMBIOS RECICLACAT — Tabla ERP */
    'recambios-reciclacat': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="rr0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1B4332"/><stop offset="100%" stop-color="#0a2818"/></linearGradient></defs>
      <rect width="800" height="450" fill="url(#rr0)"/>
      <rect x="0" y="0" width="800" height="32" fill="#0a1f15"/>
      <circle cx="18" cy="16" r="4" fill="#ff5f57"/><circle cx="34" cy="16" r="4" fill="#febc2e"/><circle cx="50" cy="16" r="4" fill="#28c940"/>
      <text x="100" y="20" font-family="ui-monospace" font-size="10" fill="#5a9a6a">recambios.reciclacat.es</text>
      <text x="32" y="70" font-family="Archivo Black,sans-serif" font-size="14" fill="#67C23A" letter-spacing="1">RECICLACAT</text>
      <text x="32" y="92" font-family="Archivo Black,sans-serif" font-size="22" fill="#fff">Recambios verificados · Stock real</text>
      <text x="32" y="110" font-family="ui-sans-serif" font-size="11" fill="#a8dc8a">8.450 referencias actualizadas cada noche</text>
      <rect x="32" y="124" width="500" height="40" rx="20" fill="#0a2818" stroke="#67C23A44"/>
      <text x="58" y="148" font-family="ui-sans-serif" font-size="12" fill="#a8dc8a">Busca por pieza, modelo, ref. catálogo...</text>
      <rect x="546" y="124" width="64" height="40" rx="20" fill="#67C23A"/>
      <text x="578" y="150" font-family="ui-sans-serif" font-size="18" fill="#1B4332" text-anchor="middle">🔍</text>
      <rect x="620" y="124" width="148" height="40" rx="20" fill="none" stroke="#67C23A33"/>
      <text x="694" y="148" font-family="ui-sans-serif" font-size="11" fill="#a8dc8a" text-anchor="middle">⚙ Filtros avanzados</text>
      <rect x="32" y="180" width="736" height="40" rx="6" fill="#0a2818" stroke="#67C23A22"/>
      <text x="52" y="205" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1" font-weight="700">PIEZA</text>
      <text x="260" y="205" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1" font-weight="700">VEHÍCULO</text>
      <text x="430" y="205" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1" font-weight="700">MOTOR</text>
      <text x="540" y="205" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1" font-weight="700">PRECIO</text>
      <text x="650" y="205" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1" font-weight="700">ESTADO</text>
      ${[
        ['Motor 1.4 TSI 122CV', 'Seat Ibiza 2018', '1.4 TSI', '380€', 'Disponible', '#67C23A'],
        ['Turbocompresor IHI', 'VW Polo 2019', '1.0 TSI', '220€', 'Disponible', '#67C23A'],
        ['Caja cambios DSG-7', 'Skoda Fabia', '1.6 TDI', '450€', 'Consultar', '#F4C430'],
        ['Alternador Bosch 140A', 'SEAT León III', '1.5 TSI', '95€', 'Disponible', '#67C23A'],
        ['Módulo ABS Bosch', 'Audi A3 8V', '2.0 TDI', '180€', 'Disponible', '#67C23A'],
        ['Compresor AC Denso', 'VW Golf VII', '1.4 TSI', '145€', 'Bajo stock', '#F4C430']
      ].map(([p,v,mo,pr,st,c], i) => `
        <g transform="translate(0,${224+i*36})">
          <rect x="32" y="0" width="736" height="34" rx="4" fill="${i%2===0?'#0a2818':'#15302380'}" stroke="${i%2===0?'transparent':'#67C23A11'}"/>
          <text x="52" y="20" font-family="ui-sans-serif" font-size="11" fill="#fff" font-weight="500">${p}</text>
          <text x="260" y="20" font-family="ui-sans-serif" font-size="11" fill="#a8dc8a">${v}</text>
          <text x="430" y="20" font-family="ui-monospace" font-size="10" fill="#a8dc8a">${mo}</text>
          <text x="540" y="20" font-family="Archivo Black,sans-serif" font-size="13" fill="#F4C430">${pr}</text>
          <rect x="648" y="6" width="80" height="20" rx="10" fill="${c}22" stroke="${c}55"/>
          <text x="688" y="19" font-family="ui-sans-serif" font-size="9" fill="${c}" text-anchor="middle" font-weight="600">${st}</text>
        </g>
      `).join('')}
    </svg>`,

    /* EL BOQUERÓN BOOKS — Fiel a la web real */
    'boqueron-books': `<svg viewBox="0 0 800 470" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="470" fill="#f5f5f0"/>
      <rect x="0" y="0" width="800" height="54" fill="#0c1e35"/>
      <g transform="translate(20,11)"><rect width="32" height="32" rx="6" fill="#2a4a7a"/><path d="M6 22 L16 12 L26 22 L16 26 Z" fill="none" stroke="#7ab0e8" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 22 L24 22" stroke="#7ab0e8" stroke-width="2" stroke-linecap="round"/><path d="M4 26 Q16 30 28 26" fill="none" stroke="#7ab0e8" stroke-width="1.5"/></g>
      <text x="62" y="32" font-family="Georgia,serif" font-style="italic" font-size="16" fill="#fff">El Boquerón</text>
      <text x="490" y="30" font-family="ui-sans-serif" font-size="11" fill="#7ab0e8" font-weight="700">Inicio</text>
      <text x="538" y="30" font-family="ui-sans-serif" font-size="11" fill="#c5d5e8">Categorías ↓</text>
      <text x="628" y="30" font-family="ui-sans-serif" font-size="11" fill="#c5d5e8">Sobre el autor</text>
      <text x="718" y="30" font-family="ui-sans-serif" font-size="11" fill="#c5d5e8">Contacto</text>
      <line x1="40" y1="76" x2="760" y2="76" stroke="#d4a017" stroke-opacity="0.25" stroke-width="0.5"/>
      <text x="400" y="100" font-family="Georgia,serif" font-style="italic" font-size="24" fill="#0c1e35" text-anchor="middle">Favoritos del Boquerón</text>
      <line x1="40" y1="110" x2="760" y2="110" stroke="#d4a017" stroke-opacity="0.25" stroke-width="0.5"/>
      <!-- Portada 1: La Ventaja Invisible -->
      <g transform="translate(30,120)">
        <rect width="132" height="195" rx="3" fill="#111" stroke="#2a2a2a"/>
        <rect x="7" y="7" width="118" height="181" rx="2" fill="#0a0a0a"/>
        <text x="66" y="26" font-family="ui-sans-serif" font-size="6" fill="#d4a017" text-anchor="middle" letter-spacing="0.5">EL ÉXITO NO ES SUERTE.</text>
        <text x="66" y="37" font-family="ui-sans-serif" font-size="6" fill="#d4a017" text-anchor="middle" letter-spacing="0.5">ES UNA DECISIÓN INTERNA.</text>
        <text x="66" y="58" font-family="Archivo Black,sans-serif" font-size="18" fill="#fff" text-anchor="middle">LA</text>
        <text x="66" y="78" font-family="Archivo Black,sans-serif" font-size="18" fill="#fff" text-anchor="middle">VENTAJA</text>
        <circle cx="66" cy="104" r="16" fill="none" stroke="#d4a017" stroke-width="2"/>
        <circle cx="66" cy="100" r="7" fill="#d4a017"/>
        <rect x="62" y="106" width="8" height="11" rx="2" fill="#d4a017"/>
        <text x="66" y="136" font-family="Archivo Black,sans-serif" font-size="18" fill="#d4a017" text-anchor="middle">INVI◆IBLE</text>
        <text x="66" y="158" font-family="ui-sans-serif" font-size="5.5" fill="#ffffff70" text-anchor="middle">CÓMO CONSTRUIR UNA MENTE QUE</text>
        <text x="66" y="167" font-family="ui-sans-serif" font-size="5.5" fill="#ffffff70" text-anchor="middle">GANA ANTES DE QUE EL MUNDO LO NOTE</text>
        <text x="66" y="182" font-family="ui-sans-serif" font-size="7" fill="#d4a017" text-anchor="middle">GUSTAVO MOLINA ZAFRA</text>
      </g>
      <text x="96" y="328" font-family="ui-sans-serif" font-size="7.5" fill="#2a6a9a" text-anchor="middle" font-weight="700">DESARROLLO PERSONAL Y AUTOAYUDA</text>
      <text x="96" y="343" font-family="ui-sans-serif" font-size="9.5" fill="#1a1a2a" text-anchor="middle" font-weight="700">La ventaja invisible: Cómo</text>
      <text x="96" y="356" font-family="ui-sans-serif" font-size="9.5" fill="#1a1a2a" text-anchor="middle" font-weight="700">construir una mente que ga...</text>
      <text x="96" y="370" font-family="Georgia,serif" font-style="italic" font-size="9" fill="#5a5a6a" text-anchor="middle">Gustavo Molina Zafra</text>
      <!-- Portada 2: Sana Tu Cuerpo -->
      <g transform="translate(178,120)">
        <rect width="132" height="195" rx="3"/>
        <rect x="0" y="0" width="132" height="195" rx="3" fill="#3a6a3a"/>
        <ellipse cx="66" cy="100" rx="55" ry="55" fill="#5a8a4a" opacity="0.5"/>
        <ellipse cx="52" cy="90" rx="22" ry="16" fill="#f5a04a" opacity="0.9"/>
        <circle cx="78" cy="78" r="20" fill="#2a6a2a"/>
        <ellipse cx="85" cy="115" rx="16" ry="24" fill="#6ab04a" opacity="0.8"/>
        <ellipse cx="46" cy="120" rx="13" ry="9" fill="#c8b458" opacity="0.7"/>
        <circle cx="96" cy="90" rx="12" r="12" fill="#2a8a3a" opacity="0.6"/>
        <rect x="0" y="0" width="132" height="46" rx="3" fill="#0a1a0a" fill-opacity="0.8"/>
        <text x="66" y="15" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">SANA TU CUERPO,</text>
        <text x="66" y="27" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">RECUPERA TU VIDA</text>
        <text x="66" y="40" font-family="ui-sans-serif" font-size="6" fill="#ffffffaa" text-anchor="middle">De la fatiga crónica a la salud total...</text>
        <circle cx="66" cy="176" r="12" fill="none" stroke="#ffffffaa" stroke-width="1"/>
        <text x="66" y="180" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle">✦</text>
        <text x="66" y="189" font-family="ui-sans-serif" font-size="5.5" fill="#ffffffaa" text-anchor="middle">Plan nutricional antiinflamatorio</text>
      </g>
      <text x="244" y="328" font-family="ui-sans-serif" font-size="7.5" fill="#2a6a9a" text-anchor="middle" font-weight="700">MEDICINA ALTERNATIVA</text>
      <text x="244" y="343" font-family="ui-sans-serif" font-size="9.5" fill="#1a1a2a" text-anchor="middle" font-weight="700">Sana Tu Cuerpo, Recupera</text>
      <text x="244" y="356" font-family="ui-sans-serif" font-size="9.5" fill="#1a1a2a" text-anchor="middle" font-weight="700">Tu Vida: La guía...</text>
      <text x="244" y="370" font-family="Georgia,serif" font-style="italic" font-size="9" fill="#5a5a6a" text-anchor="middle">Gustavo Molina Zafra</text>
      <!-- Portada 3 (repetida) -->
      <g transform="translate(326,120)">
        <rect width="132" height="195" rx="3" fill="#3a6a3a"/>
        <ellipse cx="66" cy="100" rx="55" ry="55" fill="#5a8a4a" opacity="0.5"/>
        <ellipse cx="52" cy="90" rx="22" ry="16" fill="#f5a04a" opacity="0.9"/>
        <circle cx="78" cy="78" r="20" fill="#2a6a2a"/>
        <ellipse cx="85" cy="115" rx="16" ry="24" fill="#6ab04a" opacity="0.8"/>
        <rect x="0" y="0" width="132" height="46" rx="3" fill="#0a1a0a" fill-opacity="0.8"/>
        <text x="66" y="15" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">SANA TU CUERPO,</text>
        <text x="66" y="27" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">RECUPERA TU VIDA</text>
        <text x="66" y="40" font-family="ui-sans-serif" font-size="6" fill="#ffffffaa" text-anchor="middle">De la fatiga crónica a la salud total...</text>
      </g>
      <text x="392" y="328" font-family="ui-sans-serif" font-size="7.5" fill="#2a6a9a" text-anchor="middle" font-weight="700">MEDICINA ALTERNATIVA</text>
      <text x="392" y="343" font-family="ui-sans-serif" font-size="9.5" fill="#1a1a2a" text-anchor="middle" font-weight="700">Sana Tu Cuerpo, Recupera</text>
      <text x="392" y="356" font-family="ui-sans-serif" font-size="9.5" fill="#1a1a2a" text-anchor="middle" font-weight="700">Tu Vida: La guía...</text>
      <text x="392" y="370" font-family="Georgia,serif" font-style="italic" font-size="9" fill="#5a5a6a" text-anchor="middle">Gustavo Molina Zafra</text>
      <!-- Portada 4: ChatGPT para Gerentes de CAT -->
      <g transform="translate(474,120)">
        <rect width="132" height="195" rx="3" fill="#0a1830"/>
        <ellipse cx="66" cy="80" rx="38" ry="32" fill="#1a3a7a" opacity="0.6"/>
        <path d="M44 70 Q66 50 88 70 Q96 85 88 102 Q66 112 44 102 Q36 85 44 70" fill="none" stroke="#4a9adf" stroke-width="1.5" opacity="0.8"/>
        <path d="M50 76 L62 82 L74 72 L86 78" fill="none" stroke="#7ab0e8" stroke-width="1" opacity="0.7"/>
        <path d="M48 88 L60 94 L72 84 L84 90" fill="none" stroke="#7ab0e8" stroke-width="1" opacity="0.7"/>
        <rect x="26" y="120" width="80" height="38" rx="3" fill="#0a2040" stroke="#2a5a9a" stroke-width="1"/>
        <rect x="33" y="127" width="10" height="22" rx="2" fill="#3a7ab0"/>
        <rect x="47" y="127" width="10" height="22" rx="2" fill="#3a7ab0"/>
        <rect x="61" y="127" width="10" height="22" rx="2" fill="#3a7ab0"/>
        <rect x="75" y="127" width="10" height="22" rx="2" fill="#3a7ab0"/>
        <text x="66" y="17" font-family="Archivo Black,sans-serif" font-size="10" fill="#fff" text-anchor="middle">ChatGPT para</text>
        <text x="66" y="31" font-family="Archivo Black,sans-serif" font-size="10" fill="#fff" text-anchor="middle">Gerentes de CAT</text>
        <text x="66" y="47" font-family="ui-sans-serif" font-size="6.5" fill="#7ab0e8" text-anchor="middle">Automatización, Ventas</text>
        <text x="66" y="58" font-family="ui-sans-serif" font-size="6.5" fill="#7ab0e8" text-anchor="middle">Online y Blindaje Legal</text>
        <text x="66" y="69" font-family="ui-sans-serif" font-size="6.5" fill="#7ab0e8" text-anchor="middle">para el Desguace Moderno</text>
        <text x="66" y="188" font-family="ui-sans-serif" font-size="6.5" fill="#4a9adf" text-anchor="middle">GUSTAVO MOLINA ZAFRA</text>
      </g>
      <text x="540" y="328" font-family="ui-sans-serif" font-size="7.5" fill="#2a6a9a" text-anchor="middle" font-weight="700">ECONOMÍA Y EMPRESA</text>
      <text x="540" y="343" font-family="ui-sans-serif" font-size="9.5" fill="#1a1a2a" text-anchor="middle" font-weight="700">ChatGPT para Gerentes de</text>
      <text x="540" y="356" font-family="ui-sans-serif" font-size="9.5" fill="#1a1a2a" text-anchor="middle" font-weight="700">CAT: Cómo aumentar...</text>
      <text x="540" y="370" font-family="Georgia,serif" font-style="italic" font-size="9" fill="#5a5a6a" text-anchor="middle">Gustavo Molina Zafra</text>
      <!-- Portada 5: La Ventaja Invisible bis -->
      <g transform="translate(622,120)">
        <rect width="132" height="195" rx="3" fill="#111"/>
        <rect x="7" y="7" width="118" height="181" rx="2" fill="#0a0a0a"/>
        <text x="66" y="26" font-family="ui-sans-serif" font-size="6" fill="#d4a017" text-anchor="middle" letter-spacing="0.5">EL ÉXITO NO ES SUERTE.</text>
        <text x="66" y="58" font-family="Archivo Black,sans-serif" font-size="18" fill="#fff" text-anchor="middle">LA</text>
        <text x="66" y="78" font-family="Archivo Black,sans-serif" font-size="18" fill="#fff" text-anchor="middle">VENTAJA</text>
        <circle cx="66" cy="104" r="16" fill="none" stroke="#d4a017" stroke-width="2"/>
        <circle cx="66" cy="100" r="7" fill="#d4a017"/>
        <rect x="62" y="106" width="8" height="11" rx="2" fill="#d4a017"/>
        <text x="66" y="136" font-family="Archivo Black,sans-serif" font-size="18" fill="#d4a017" text-anchor="middle">INVI◆IBLE</text>
        <text x="66" y="182" font-family="ui-sans-serif" font-size="7" fill="#d4a017" text-anchor="middle">GUSTAVO MOLINA ZAFRA</text>
      </g>
      <text x="688" y="328" font-family="ui-sans-serif" font-size="7.5" fill="#2a6a9a" text-anchor="middle" font-weight="700">DESARROLLO PERSONAL Y AUTOAYUDA</text>
      <text x="688" y="343" font-family="ui-sans-serif" font-size="9.5" fill="#1a1a2a" text-anchor="middle" font-weight="700">La ventaja invisible: Cómo</text>
      <text x="688" y="356" font-family="ui-sans-serif" font-size="9.5" fill="#1a1a2a" text-anchor="middle" font-weight="700">construir una mente que ga...</text>
      <text x="688" y="370" font-family="Georgia,serif" font-style="italic" font-size="9" fill="#5a5a6a" text-anchor="middle">Gustavo Molina Zafra</text>
      <!-- Flecha carrusel -->
      <circle cx="20" cy="228" r="14" fill="#0c1e35" stroke="#d4a01766"/>
      <text x="20" y="233" font-family="ui-sans-serif" font-size="14" fill="#d4a017" text-anchor="middle">‹</text>
    </svg>`,

  };

  document.querySelectorAll('[data-mockup-content]').forEach(frame => {
    const key = frame.getAttribute('data-mockup-content');
    if (mockups[key]) {
      frame.innerHTML = mockups[key];
      const svg = frame.querySelector('svg');
      if (svg) svg.style.cssText = 'width:100%;height:100%;display:block;';
    }
  });

  // FORM
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'mt-6 p-4 rounded-2xl text-sm';
    if (type === 'success') feedback.classList.add('bg-leaf/15','border','border-leaf/30','text-leaf-soft');
    else if (type === 'error') feedback.classList.add('bg-red-500/15','border','border-red-500/30','text-red-300');
    else feedback.classList.add('bg-lemon/10','border','border-lemon/30','text-lemon');
    feedback.classList.remove('hidden');
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.nombre || !data.email || !data.mensaje) { showFeedback('Por favor, completa los campos obligatorios.', 'error'); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showFeedback('El email no parece válido.', 'error'); return; }
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.disabled = true; btn.textContent = 'Enviando...';
      try {
        const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (res.ok) { showFeedback('¡Mensaje recibido! Te respondemos en menos de 24h.', 'success'); form.reset(); }
        else throw new Error();
      } catch {
        const sub = encodeURIComponent(`Consulta · ${data.nombre}`);
        const body = encodeURIComponent(`Nombre: ${data.nombre}\nEmpresa: ${data.empresa||'-'}\nEmail: ${data.email}\nTeléfono: ${data.telefono||'-'}\n\n${data.mensaje}`);
        location.href = `mailto:hola@limonadaweb.com?subject=${sub}&body=${body}`;
        showFeedback('Abriendo tu cliente de correo...', 'info');
      } finally { btn.disabled = false; btn.innerHTML = orig; }
    });
  }

})();
