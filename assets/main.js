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

    /* RED DESGUACE — Fiel a la web real con fotos de piezas simuladas */
    'red-desguace': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="#1a2a1a" stroke-width="0.3"/></pattern>
        <!-- Texturas fotos piezas -->
        <linearGradient id="photoMotor" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3a3a3a"/><stop offset="50%" stop-color="#2a2a2a"/><stop offset="100%" stop-color="#1a1a1a"/></linearGradient>
        <linearGradient id="photoAsiento" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c8b89a"/><stop offset="100%" stop-color="#b0a080"/></linearGradient>
        <linearGradient id="photoMotor2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2a3a4a"/><stop offset="100%" stop-color="#1a2a3a"/></linearGradient>
      </defs>
      <!-- Fondo -->
      <rect width="800" height="500" fill="#0d1d0d"/>
      <rect width="800" height="500" fill="url(#grid)" opacity="0.3"/>
      <!-- Header blanco -->
      <rect x="0" y="0" width="800" height="52" fill="#fefdf7"/>
      <g transform="translate(18,14)"><circle cx="12" cy="12" r="11" fill="none" stroke="#3f8e26" stroke-width="2"/><path d="M7 14 L12 9 L17 14 M12 9 L12 18" fill="none" stroke="#3f8e26" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
      <text x="44" y="30" font-family="ui-sans-serif" font-size="13" fill="#0d2a1f" font-weight="700">Red Desguace</text>
      <text x="110" y="30" font-family="ui-sans-serif" font-size="11" fill="#3a5a3a">Inicio</text>
      <text x="150" y="30" font-family="ui-sans-serif" font-size="11" fill="#3a5a3a">Piezas</text>
      <text x="192" y="30" font-family="ui-sans-serif" font-size="11" fill="#3a5a3a">Vehículos</text>
      <text x="248" y="30" font-family="ui-sans-serif" font-size="11" fill="#3a5a3a">Desguaces</text>
      <text x="308" y="30" font-family="ui-sans-serif" font-size="11" fill="#3a5a3a">Talleres</text>
      <text x="548" y="26" font-family="ui-sans-serif" font-size="9.5" fill="#3f8e26" font-weight="700">✓ Vendedores verificados</text>
      <text x="548" y="40" font-family="ui-sans-serif" font-size="7.5" fill="#5a7a5a">Solo centros CAT autorizados</text>
      <rect x="696" y="12" width="84" height="28" rx="4" fill="none" stroke="#0d2a1f" stroke-width="1"/>
      <text x="738" y="30" font-family="ui-sans-serif" font-size="11" fill="#0d2a1f" font-weight="600" text-anchor="middle">Acceso CAT</text>
      <!-- Hero oscuro con texto -->
      <rect x="0" y="52" width="800" height="130" fill="#111d11"/>
      <text x="400" y="96" font-family="ui-sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="700">Encuentra el <tspan fill="#7fbf3f">recambio</tspan> que necesitas</text>
      <text x="400" y="114" font-family="ui-sans-serif" font-size="10" fill="#c8dcc8" text-anchor="middle">Stock real de desguaces autorizados. Contacta directamente con el desguace por WhatsApp.</text>
      <!-- Buscador -->
      <rect x="188" y="126" width="330" height="38" rx="4" fill="#fff"/>
      <text x="202" y="150" font-family="ui-sans-serif" font-size="10" fill="#9aa89a">Marca, modelo, motor, referencia...</text>
      <rect x="522" y="126" width="76" height="38" rx="4" fill="#c8a010"/>
      <text x="560" y="150" font-family="ui-sans-serif" font-size="11" fill="#fff" text-anchor="middle" font-weight="800">BUSCAR</text>
      <!-- Stats -->
      <text x="290" y="178" font-family="Archivo Black,sans-serif" font-size="18" fill="#fff" text-anchor="middle">+185.000</text>
      <text x="290" y="192" font-family="ui-sans-serif" font-size="8" fill="#a8c89a" text-anchor="middle" letter-spacing="1.5">PIEZAS</text>
      <text x="400" y="178" font-family="Archivo Black,sans-serif" font-size="18" fill="#fff" text-anchor="middle">CAT</text>
      <text x="400" y="192" font-family="ui-sans-serif" font-size="8" fill="#a8c89a" text-anchor="middle" letter-spacing="1.5">AUTORIZADOS</text>
      <text x="510" y="178" font-family="Archivo Black,sans-serif" font-size="18" fill="#fff" text-anchor="middle">+1.200</text>
      <text x="510" y="192" font-family="ui-sans-serif" font-size="8" fill="#a8c89a" text-anchor="middle" letter-spacing="1.5">MODELOS</text>
      <!-- Sección piezas -->
      <rect x="0" y="206" width="800" height="294" fill="#f5f3eb"/>
      <text x="18" y="232" font-family="ui-sans-serif" font-size="13" fill="#0d2a1f" font-weight="700">Últimas piezas añadidas</text>
      <text x="782" y="232" font-family="ui-sans-serif" font-size="10" fill="#3f8e26" text-anchor="end">Ver todo el catálogo →</text>

      <!-- CARD 1: Motor completo (foto motor gris) -->
      <g transform="translate(14,244)">
        <rect width="148" height="236" rx="6" fill="#fff" stroke="#e5e3db"/>
        <!-- Foto motor: gris texturizado con formas de motor -->
        <rect width="148" height="116" rx="6" fill="#3a3a3a"/>
        <rect x="0" y="0" width="148" height="116" rx="6" fill="url(#photoMotor)"/>
        <!-- Simular motor: bloques rectangulares, tubos, tornillos -->
        <rect x="24" y="18" width="100" height="42" rx="3" fill="#4a4a4a" stroke="#5a5a5a" stroke-width="0.5"/>
        <rect x="30" y="24" width="16" height="30" rx="2" fill="#2a2a2a"/>
        <rect x="50" y="24" width="16" height="30" rx="2" fill="#2a2a2a"/>
        <rect x="70" y="24" width="16" height="30" rx="2" fill="#2a2a2a"/>
        <rect x="90" y="24" width="16" height="30" rx="2" fill="#2a2a2a"/>
        <rect x="18" y="68" width="112" height="14" rx="2" fill="#5a5a5a"/>
        <circle cx="40" cy="95" r="10" fill="#4a4a4a" stroke="#5a8a5a" stroke-width="2"/>
        <circle cx="40" cy="95" r="5" fill="#2a2a2a"/>
        <rect x="60" y="86" width="70" height="8" rx="4" fill="#4a4a4a"/>
        <rect x="60" y="98" width="50" height="6" rx="3" fill="#3a3a3a"/>
        <!-- Badge REF -->
        <rect x="5" y="5" width="62" height="14" rx="2" fill="#fff" stroke="#e5e3db"/>
        <text x="36" y="15" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="600">REF 1845554</text>
        <!-- Info -->
        <text x="8" y="134" font-family="ui-sans-serif" font-size="7.5" fill="#3f8e26" font-weight="700">MOTOR / ADMISIÓN / ESCAPE</text>
        <text x="8" y="150" font-family="ui-sans-serif" font-size="11" fill="#0d2a1f" font-weight="700">Motor completo</text>
        <text x="8" y="164" font-family="ui-sans-serif" font-size="8.5" fill="#4a6a4a">MAZDA · RX-8 (SE)</text>
        <text x="8" y="175" font-family="ui-sans-serif" font-size="8.5" fill="#4a6a4a">2003–2009</text>
        <text x="8" y="202" font-family="ui-sans-serif" font-size="15" fill="#3f8e26" font-weight="700">2.835,00 €</text>
        <rect x="8" y="218" width="132" height="14" rx="3" fill="#25D366"/>
        <text x="74" y="228" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
      </g>

      <!-- CARD 2: Asiento delantero (foto tela beige) -->
      <g transform="translate(172,244)">
        <rect width="148" height="236" rx="6" fill="#fff" stroke="#e5e3db"/>
        <rect width="148" height="116" rx="6" fill="url(#photoAsiento)"/>
        <!-- Simular asiento: forma ergonómica -->
        <path d="M34 110 Q34 70 50 52 Q74 36 98 52 Q114 70 114 110" fill="#c4b08a" stroke="#b09870" stroke-width="1"/>
        <path d="M42 110 Q42 78 56 64 Q74 50 92 64 Q106 78 106 110" fill="#d4c09a"/>
        <!-- respaldo superior -->
        <ellipse cx="74" cy="46" rx="28" ry="18" fill="#d4c09a" stroke="#b09870" stroke-width="1"/>
        <!-- Costuras simuladas -->
        <path d="M58 70 L58 105" fill="none" stroke="#a08860" stroke-width="0.8" stroke-dasharray="3 2"/>
        <path d="M90 70 L90 105" fill="none" stroke="#a08860" stroke-width="0.8" stroke-dasharray="3 2"/>
        <rect x="5" y="5" width="62" height="14" rx="2" fill="#fff" stroke="#e5e3db"/>
        <text x="36" y="15" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="600">REF 1893034</text>
        <text x="8" y="134" font-family="ui-sans-serif" font-size="7.5" fill="#3f8e26" font-weight="700">INTERIOR</text>
        <text x="8" y="150" font-family="ui-sans-serif" font-size="11" fill="#0d2a1f" font-weight="700">Asiento delantero</text>
        <text x="8" y="163" font-family="ui-sans-serif" font-size="10.5" fill="#0d2a1f" font-weight="700">izquierdo</text>
        <text x="8" y="178" font-family="ui-sans-serif" font-size="8.5" fill="#4a6a4a">VOLKSWAGEN · T5 TRANSPORTER</text>
        <text x="8" y="188" font-family="ui-sans-serif" font-size="8.5" fill="#4a6a4a">BUS · 2003–2007</text>
        <text x="8" y="212" font-family="ui-sans-serif" font-size="15" fill="#3f8e26" font-weight="700">2.835,00 €</text>
        <rect x="8" y="218" width="132" height="14" rx="3" fill="#25D366"/>
        <text x="74" y="228" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
      </g>

      <!-- CARD 3: Motor VW Touareg (azul motor) -->
      <g transform="translate(330,244)">
        <rect width="148" height="236" rx="6" fill="#fff" stroke="#e5e3db"/>
        <rect width="148" height="116" rx="6" fill="url(#photoMotor2)"/>
        <!-- Motor diferente: con tubo azul prominente -->
        <rect x="20" y="20" width="108" height="40" rx="3" fill="#3a4a5a" stroke="#4a5a6a" stroke-width="0.5"/>
        <rect x="26" y="26" width="14" height="28" rx="2" fill="#1a2a3a"/>
        <rect x="44" y="26" width="14" height="28" rx="2" fill="#1a2a3a"/>
        <rect x="62" y="26" width="14" height="28" rx="2" fill="#1a2a3a"/>
        <rect x="80" y="26" width="14" height="28" rx="2" fill="#1a2a3a"/>
        <rect x="98" y="26" width="14" height="28" rx="2" fill="#1a2a3a"/>
        <rect x="16" y="68" width="116" height="12" rx="2" fill="#4a5a6a"/>
        <!-- Tubo azul prominente (como en el VW) -->
        <path d="M50 82 Q74 75 98 82 L98 96 Q74 103 50 96 Z" fill="#2a5a9a"/>
        <path d="M60 88 L88 88" stroke="#4a7ab0" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="44" cy="95" r="8" fill="#3a4a5a" stroke="#4a7ab0" stroke-width="1.5"/>
        <rect x="5" y="5" width="62" height="14" rx="2" fill="#fff" stroke="#e5e3db"/>
        <text x="36" y="15" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="600">REF 1835210</text>
        <text x="8" y="134" font-family="ui-sans-serif" font-size="7.5" fill="#3f8e26" font-weight="700">MOTOR / ADMISIÓN / ESCAPE</text>
        <text x="8" y="150" font-family="ui-sans-serif" font-size="11" fill="#0d2a1f" font-weight="700">Motor completo</text>
        <text x="8" y="164" font-family="ui-sans-serif" font-size="8.5" fill="#4a6a4a">VOLKSWAGEN · TOUAREG</text>
        <text x="8" y="175" font-family="ui-sans-serif" font-size="8.5" fill="#4a6a4a">2006–2008</text>
        <text x="8" y="202" font-family="ui-sans-serif" font-size="15" fill="#3f8e26" font-weight="700">2.790,00 €</text>
        <rect x="8" y="218" width="132" height="14" rx="3" fill="#25D366"/>
        <text x="74" y="228" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
      </g>

      <!-- CARD 4: Motor Renault (amarillo visible) -->
      <g transform="translate(488,244)">
        <rect width="148" height="236" rx="6" fill="#fff" stroke="#e5e3db"/>
        <rect width="148" height="116" rx="6" fill="#2a2a2a"/>
        <rect x="20" y="14" width="108" height="46" rx="3" fill="#3a3a3a" stroke="#4a4a4a" stroke-width="0.5"/>
        <rect x="26" y="20" width="14" height="34" rx="2" fill="#222"/>
        <rect x="44" y="20" width="14" height="34" rx="2" fill="#222"/>
        <rect x="62" y="20" width="14" height="34" rx="2" fill="#222"/>
        <rect x="80" y="20" width="14" height="34" rx="2" fill="#222"/>
        <!-- Tapa amarilla característica Renault -->
        <circle cx="110" cy="28" r="14" fill="#e8c800" stroke="#c8a800" stroke-width="1.5"/>
        <text x="110" y="32" font-family="ui-sans-serif" font-size="8" fill="#5a4a00" text-anchor="middle" font-weight="700">OIL</text>
        <rect x="16" y="68" width="116" height="10" rx="2" fill="#4a4a4a"/>
        <rect x="30" y="82" width="88" height="24" rx="3" fill="#3a3a3a"/>
        <circle cx="55" cy="94" r="8" fill="#2a2a2a" stroke="#4a4a4a" stroke-width="1"/>
        <circle cx="93" cy="94" r="8" fill="#2a2a2a" stroke="#4a4a4a" stroke-width="1"/>
        <rect x="5" y="5" width="62" height="14" rx="2" fill="#fff" stroke="#e5e3db"/>
        <text x="36" y="15" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="600">REF 1841512</text>
        <text x="8" y="134" font-family="ui-sans-serif" font-size="7.5" fill="#3f8e26" font-weight="700">MOTOR / ADMISIÓN / ESCAPE</text>
        <text x="8" y="150" font-family="ui-sans-serif" font-size="11" fill="#0d2a1f" font-weight="700">Motor completo</text>
        <text x="8" y="164" font-family="ui-sans-serif" font-size="8.5" fill="#4a6a4a">RENAULT · TALISMAN SPORT</text>
        <text x="8" y="175" font-family="ui-sans-serif" font-size="8.5" fill="#4a6a4a">2015–2018</text>
        <text x="8" y="202" font-family="ui-sans-serif" font-size="15" fill="#3f8e26" font-weight="700">2.790,00 €</text>
        <rect x="8" y="218" width="132" height="14" rx="3" fill="#25D366"/>
        <text x="74" y="228" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
      </g>

      <!-- CARD 5: Motor Porsche (azul intenso) -->
      <g transform="translate(646,244)">
        <rect width="148" height="236" rx="6" fill="#fff" stroke="#e5e3db"/>
        <rect width="148" height="116" rx="6" fill="#2a3a4a"/>
        <!-- Motor Porsche Cayenne: más compacto, tubos azul/naranja -->
        <rect x="18" y="10" width="112" height="50" rx="4" fill="#3a4a5a" stroke="#4a5a6a" stroke-width="0.5"/>
        <rect x="24" y="16" width="14" height="38" rx="2" fill="#1a2a3a"/>
        <rect x="42" y="16" width="14" height="38" rx="2" fill="#1a2a3a"/>
        <rect x="60" y="16" width="14" height="38" rx="2" fill="#1a2a3a"/>
        <rect x="78" y="16" width="14" height="38" rx="2" fill="#1a2a3a"/>
        <rect x="96" y="16" width="14" height="38" rx="2" fill="#1a2a3a"/>
        <rect x="112" y="16" width="10" height="38" rx="2" fill="#1a2a3a"/>
        <!-- Tubo naranja característica Porsche -->
        <path d="M30 68 Q74 60 118 68 L118 82 Q74 90 30 82 Z" fill="#c85a10"/>
        <path d="M40 75 L108 75" stroke="#e87a30" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Tubo azul -->
        <path d="M22 88 Q74 80 126 88" fill="none" stroke="#3a6ab0" stroke-width="4" stroke-linecap="round"/>
        <circle cx="36" cy="105" r="7" fill="#3a4a5a" stroke="#4a7ab0" stroke-width="1.5"/>
        <rect x="5" y="5" width="62" height="14" rx="2" fill="#fff" stroke="#e5e3db"/>
        <text x="36" y="15" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="600">REF 1378568</text>
        <text x="8" y="134" font-family="ui-sans-serif" font-size="7.5" fill="#3f8e26" font-weight="700">MOTOR / ADMISIÓN / ESCAPE</text>
        <text x="8" y="150" font-family="ui-sans-serif" font-size="11" fill="#0d2a1f" font-weight="700">Motor completo</text>
        <text x="8" y="164" font-family="ui-sans-serif" font-size="8.5" fill="#4a6a4a">PORSCHE · CAYENNE</text>
        <text x="8" y="175" font-family="ui-sans-serif" font-size="8.5" fill="#4a6a4a">2009–2016</text>
        <text x="8" y="202" font-family="ui-sans-serif" font-size="15" fill="#3f8e26" font-weight="700">2.700,00 €</text>
        <rect x="8" y="218" width="132" height="14" rx="3" fill="#25D366"/>
        <text x="74" y="228" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
      </g>
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

    /* DESGUACES SOLIVA — Piezas con fotos simuladas */
    'desguaces-soliva': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="450" fill="#f5f3eb"/>
      <rect x="0" y="0" width="800" height="56" fill="#1a4a35"/>
      <text x="28" y="36" font-family="Archivo Black,sans-serif" font-size="15" fill="#c0dd97">DESGUACES SOLIVA</text>
      <text x="590" y="30" font-family="ui-sans-serif" font-size="11" fill="#fff">Catálogo</text>
      <text x="652" y="30" font-family="ui-sans-serif" font-size="11" fill="#fff">Vehículos</text>
      <text x="724" y="30" font-family="ui-sans-serif" font-size="11" fill="#fff">Contacto</text>
      <!-- Título y buscador -->
      <text x="28" y="90" font-family="Archivo Black,sans-serif" font-size="20" fill="#0d2a1f">Piezas de ocasión</text>
      <text x="28" y="108" font-family="ui-sans-serif" font-size="12" fill="#3f8e26" font-weight="600">+12.000 referencias disponibles · Envíos a toda España</text>
      <rect x="28" y="118" width="520" height="38" rx="19" fill="#fff" stroke="#1a4a3522"/>
      <text x="52" y="141" font-family="ui-sans-serif" font-size="11" fill="#7a8a7a">🔍  Pieza, marca, modelo, año...</text>
      <rect x="560" y="118" width="90" height="38" rx="19" fill="#3f8e26"/>
      <text x="605" y="141" font-family="ui-sans-serif" font-size="12" fill="#fff" text-anchor="middle" font-weight="700">Buscar</text>
      <text x="662" y="141" font-family="ui-sans-serif" font-size="11" fill="#3f8e26">Filtros ⚙</text>

      <!-- CARD 1: Motor 1.6 TDI -->
      <g transform="translate(28,170)">
        <rect width="178" height="258" rx="8" fill="#fff" stroke="#e8e3d5"/>
        <!-- Foto motor con tapa amarilla -->
        <rect width="178" height="130" rx="8" fill="#2a3a2a"/>
        <!-- Badge REF verde -->
        <rect x="6" y="6" width="60" height="14" rx="3" fill="#d4a010"/>
        <text x="36" y="16" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="700">REF 1234</text>
        <!-- Motor -->
        <rect x="20" y="24" width="138" height="56" rx="3" fill="#3a4a3a" stroke="#4a5a4a" stroke-width="0.5"/>
        <rect x="26" y="30" width="16" height="44" rx="2" fill="#1a2a1a"/>
        <rect x="46" y="30" width="16" height="44" rx="2" fill="#1a2a1a"/>
        <rect x="66" y="30" width="16" height="44" rx="2" fill="#1a2a1a"/>
        <rect x="86" y="30" width="16" height="44" rx="2" fill="#1a2a1a"/>
        <!-- tapa amarilla VW TDI -->
        <circle cx="128" cy="38" r="14" fill="#e8c800" stroke="#c8a800" stroke-width="1.5"/>
        <text x="128" y="42" font-family="ui-sans-serif" font-size="7.5" fill="#5a4a00" text-anchor="middle" font-weight="700">TDI</text>
        <rect x="16" y="88" width="146" height="10" rx="2" fill="#4a5a4a"/>
        <path d="M20 104 Q89 96 158 104" fill="none" stroke="#3a8a3a" stroke-width="3" stroke-linecap="round"/>
        <circle cx="48" cy="118" r="8" fill="#3a4a3a" stroke="#5a8a5a" stroke-width="1.5"/>
        <!-- Info -->
        <text x="10" y="152" font-family="ui-sans-serif" font-size="9" fill="#0d2a1f" font-weight="700">Motor 1.6 TDI</text>
        <text x="10" y="166" font-family="ui-sans-serif" font-size="8.5" fill="#3f8e26" font-weight="600">VW Golf VII (2014)</text>
        <text x="10" y="179" font-family="ui-sans-serif" font-size="8" fill="#7a8a7a">Garantía 30 días</text>
        <text x="10" y="210" font-family="Archivo Black,sans-serif" font-size="22" fill="#0d2a1f">420€</text>
        <rect x="10" y="222" width="78" height="18" rx="4" fill="#25D366"/>
        <text x="49" y="234" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
        <rect x="94" y="222" width="74" height="18" rx="4" fill="#3f8e26" fill-opacity="0.12" stroke="#3f8e26" stroke-width="0.5"/>
        <text x="131" y="234" font-family="ui-monospace" font-size="7" fill="#3f8e26" text-anchor="middle" font-weight="700">DISPONIBLE</text>
      </g>

      <!-- CARD 2: Caja DSG -->
      <g transform="translate(218,170)">
        <rect width="178" height="258" rx="8" fill="#fff" stroke="#e8e3d5"/>
        <rect width="178" height="130" rx="8" fill="#1a2a3a"/>
        <rect x="6" y="6" width="60" height="14" rx="3" fill="#d4a010"/>
        <text x="36" y="16" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="700">REF 1235</text>
        <!-- Caja cambios: forma cilíndrica/rectangular con ejes -->
        <rect x="26" y="20" width="126" height="68" rx="8" fill="#2a3a4a" stroke="#3a4a5a" stroke-width="1"/>
        <rect x="32" y="28" width="114" height="52" rx="6" fill="#1a2a3a"/>
        <!-- Patrón de engranaje -->
        <circle cx="74" cy="54" r="22" fill="none" stroke="#3a5a7a" stroke-width="2"/>
        <circle cx="74" cy="54" r="14" fill="#1a2a3a" stroke="#3a5a7a" stroke-width="1.5"/>
        <circle cx="74" cy="54" r="6" fill="#2a3a4a"/>
        <!-- radios del engranaje -->
        <line x1="74" y1="32" x2="74" y2="40" stroke="#3a5a7a" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="74" y1="68" x2="74" y2="76" stroke="#3a5a7a" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="52" y1="54" x2="60" y2="54" stroke="#3a5a7a" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="88" y1="54" x2="96" y2="54" stroke="#3a5a7a" stroke-width="2.5" stroke-linecap="round"/>
        <!-- texto DSG -->
        <text x="124" y="58" font-family="ui-monospace" font-size="8" fill="#4a7ab0" font-weight="700">DSG</text>
        <!-- eje salida -->
        <rect x="16" y="94" width="28" height="8" rx="4" fill="#3a5a7a"/>
        <rect x="134" y="94" width="28" height="8" rx="4" fill="#3a5a7a"/>
        <path d="M28 104 Q89 108 150 104" fill="none" stroke="#3a5a7a" stroke-width="2" stroke-linecap="round"/>
        <text x="10" y="152" font-family="ui-sans-serif" font-size="9" fill="#0d2a1f" font-weight="700">Caja DSG-7</text>
        <text x="10" y="166" font-family="ui-sans-serif" font-size="8.5" fill="#3f8e26" font-weight="600">Audi A3 (2016)</text>
        <text x="10" y="179" font-family="ui-sans-serif" font-size="8" fill="#7a8a7a">Garantía 30 días</text>
        <text x="10" y="210" font-family="Archivo Black,sans-serif" font-size="22" fill="#0d2a1f">650€</text>
        <rect x="10" y="222" width="78" height="18" rx="4" fill="#25D366"/>
        <text x="49" y="234" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
        <rect x="94" y="222" width="74" height="18" rx="4" fill="#3f8e26" fill-opacity="0.12" stroke="#3f8e26" stroke-width="0.5"/>
        <text x="131" y="234" font-family="ui-monospace" font-size="7" fill="#3f8e26" text-anchor="middle" font-weight="700">DISPONIBLE</text>
      </g>

      <!-- CARD 3: Puerta delantera -->
      <g transform="translate(408,170)">
        <rect width="178" height="258" rx="8" fill="#fff" stroke="#e8e3d5"/>
        <rect width="178" height="130" rx="8" fill="#c8c0b8"/>
        <rect x="6" y="6" width="60" height="14" rx="3" fill="#d4a010"/>
        <text x="36" y="16" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="700">REF 1236</text>
        <!-- Puerta: panel lateral con ventana -->
        <rect x="22" y="16" width="134" height="104" rx="6" fill="#b8b0a8" stroke="#a8a09a" stroke-width="1"/>
        <!-- Ventana -->
        <rect x="30" y="22" width="118" height="52" rx="4" fill="#8ab0c8" fill-opacity="0.7"/>
        <!-- Manecilla interior -->
        <rect x="128" y="82" width="22" height="6" rx="3" fill="#8a8a8a"/>
        <circle cx="140" cy="85" r="4" fill="#9a9a9a"/>
        <!-- Panel puerta -->
        <rect x="30" y="80" width="58" height="28" rx="3" fill="#a8a0a0"/>
        <!-- Altavoz -->
        <circle cx="72" cy="110" r="8" fill="#8a8a8a"/>
        <circle cx="72" cy="110" r="5" fill="#7a7a7a"/>
        <circle cx="72" cy="110" r="2" fill="#6a6a6a"/>
        <text x="10" y="152" font-family="ui-sans-serif" font-size="9" fill="#0d2a1f" font-weight="700">Puerta del. der.</text>
        <text x="10" y="166" font-family="ui-sans-serif" font-size="8.5" fill="#3f8e26" font-weight="600">Seat León III (2018)</text>
        <text x="10" y="179" font-family="ui-sans-serif" font-size="8" fill="#7a8a7a">Garantía 30 días</text>
        <text x="10" y="210" font-family="Archivo Black,sans-serif" font-size="22" fill="#0d2a1f">140€</text>
        <rect x="10" y="222" width="78" height="18" rx="4" fill="#25D366"/>
        <text x="49" y="234" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
        <rect x="94" y="222" width="74" height="18" rx="4" fill="#F4C430" fill-opacity="0.15" stroke="#F4C430" stroke-width="0.5"/>
        <text x="131" y="234" font-family="ui-monospace" font-size="7" fill="#a87f00" text-anchor="middle" font-weight="700">BAJO STOCK</text>
      </g>

      <!-- CARD 4: Alternador -->
      <g transform="translate(598,170)">
        <rect width="178" height="258" rx="8" fill="#fff" stroke="#e8e3d5"/>
        <rect width="178" height="130" rx="8" fill="#2a2a2a"/>
        <rect x="6" y="6" width="60" height="14" rx="3" fill="#d4a010"/>
        <text x="36" y="16" font-family="ui-monospace" font-size="7" fill="#0d2a1f" text-anchor="middle" font-weight="700">REF 1237</text>
        <!-- Alternador: cilindro con poleas y cables -->
        <ellipse cx="89" cy="64" rx="52" ry="48" fill="#3a3a3a" stroke="#4a4a4a" stroke-width="1"/>
        <ellipse cx="89" cy="64" rx="40" ry="36" fill="#2a2a2a" stroke="#3a3a3a" stroke-width="1"/>
        <!-- ventilación lateral -->
        <path d="M50 42 L38 42" stroke="#4a4a4a" stroke-width="2" stroke-linecap="round"/>
        <path d="M50 52 L38 52" stroke="#4a4a4a" stroke-width="2" stroke-linecap="round"/>
        <path d="M50 62 L38 62" stroke="#4a4a4a" stroke-width="2" stroke-linecap="round"/>
        <path d="M50 72 L38 72" stroke="#4a4a4a" stroke-width="2" stroke-linecap="round"/>
        <path d="M50 82 L38 82" stroke="#4a4a4a" stroke-width="2" stroke-linecap="round"/>
        <!-- polea dentada -->
        <circle cx="89" cy="64" rx="22" r="22" fill="none" stroke="#6a6a6a" stroke-width="3" stroke-dasharray="5 3"/>
        <circle cx="89" cy="64" r="10" fill="#3a3a3a" stroke="#5a5a5a" stroke-width="2"/>
        <!-- cable positivo rojo -->
        <path d="M118 48 L138 40 L138 32" fill="none" stroke="#c83a2a" stroke-width="3" stroke-linecap="round"/>
        <circle cx="138" cy="30" r="4" fill="#c83a2a"/>
        <!-- tornillo montaje -->
        <circle cx="36" cy="96" r="6" fill="#3a3a3a" stroke="#5a5a5a" stroke-width="1.5"/>
        <circle cx="142" cy="96" r="6" fill="#3a3a3a" stroke="#5a5a5a" stroke-width="1.5"/>
        <text x="10" y="152" font-family="ui-sans-serif" font-size="9" fill="#0d2a1f" font-weight="700">Alternador 140A</text>
        <text x="10" y="166" font-family="ui-sans-serif" font-size="8.5" fill="#3f8e26" font-weight="600">Ford Focus IV (2020)</text>
        <text x="10" y="179" font-family="ui-sans-serif" font-size="8" fill="#7a8a7a">Garantía 30 días</text>
        <text x="10" y="210" font-family="Archivo Black,sans-serif" font-size="22" fill="#0d2a1f">95€</text>
        <rect x="10" y="222" width="78" height="18" rx="4" fill="#25D366"/>
        <text x="49" y="234" font-family="ui-sans-serif" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">WhatsApp</text>
        <rect x="94" y="222" width="74" height="18" rx="4" fill="#3f8e26" fill-opacity="0.12" stroke="#3f8e26" stroke-width="0.5"/>
        <text x="131" y="234" font-family="ui-monospace" font-size="7" fill="#3f8e26" text-anchor="middle" font-weight="700">DISPONIBLE</text>
      </g>
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

  // Inyección lazy de mockups — solo cuando entran en el viewport
  const mockupFrames = document.querySelectorAll('[data-mockup-content]');
  if ('IntersectionObserver' in window) {
    const mockupObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const frame = entry.target;
        const key = frame.getAttribute('data-mockup-content');
        if (mockups[key] && !frame.dataset.loaded) {
          frame.innerHTML = mockups[key];
          const svg = frame.querySelector('svg');
          if (svg) svg.style.cssText = 'width:100%;height:100%;display:block;';
          frame.dataset.loaded = '1';
        }
        mockupObs.unobserve(frame);
      });
    }, { rootMargin: '200px 0px' });
    mockupFrames.forEach(el => mockupObs.observe(el));
  } else {
    mockupFrames.forEach(frame => {
      const key = frame.getAttribute('data-mockup-content');
      if (mockups[key]) {
        frame.innerHTML = mockups[key];
        const svg = frame.querySelector('svg');
        if (svg) svg.style.cssText = 'width:100%;height:100%;display:block;';
      }
    });
  }

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
