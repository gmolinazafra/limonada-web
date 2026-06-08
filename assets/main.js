/* =========================================================
   LIMONADA WEB · main.js — Premium Edition
   Cursor personalizado, contadores, tilt 3D, scroll effects
   ========================================================= */
(() => {
  'use strict';

  // Año footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const isMobile = window.matchMedia('(hover: none)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================
  // 1. CUSTOM CURSOR
  // =========================================================
  if (!isMobile) {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (dot && ring) {
      let mx = window.innerWidth / 2, my = window.innerHeight / 2;
      let rx = mx, ry = my;

      document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
      }, { passive: true });

      // Ring sigue con lerp suave
      function animateRing() {
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateRing);
      }
      animateRing();

      // Hover state en links/buttons
      const hoverEls = document.querySelectorAll('a, button, .glass-card, .btn');
      hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      });

      // Click state
      document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
      document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
    }
  }

  // =========================================================
  // 2. SCROLL PROGRESS BAR
  // =========================================================
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }, { passive: true });
  }

  // =========================================================
  // 3. NAV SCROLL STATE
  // =========================================================
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('nav-scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // =========================================================
  // 4. SCROLL REVEAL
  // =========================================================
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // =========================================================
  // 5. COUNTER ANIMATION (stats del hero)
  // =========================================================
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();
        el.classList.add('is-counting');

        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          start = Math.floor(eased * target);
          el.textContent = prefix + start + suffix;
          if (progress < 1) requestAnimationFrame(update);
          else { el.textContent = prefix + target + suffix; el.classList.remove('is-counting'); }
        }
        requestAnimationFrame(update);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(el => counterObs.observe(el));
  }

  // =========================================================
  // 6. TILT 3D EN GLASS CARDS
  // =========================================================
  if (!isMobile && !reduceMotion) {
    document.querySelectorAll('.glass-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px) scale(1.01)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .6s cubic-bezier(.2,.7,.2,1), border-color .4s, box-shadow .4s';
        setTimeout(() => { card.style.transition = ''; }, 600);
      });
    });
  }

  // =========================================================
  // 7. BOTONES MAGNÉTICOS
  // =========================================================
  if (!isMobile && !reduceMotion) {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.28;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // =========================================================
  // 8. PARALLAX SUAVE EN HERO
  // =========================================================
  if (!isMobile && !reduceMotion) {
    const heroContent = document.querySelector('.hero-inner');
    const auroras = document.querySelectorAll('.aurora');
    window.addEventListener('scroll', () => {
      const s = window.scrollY;
      if (s < 800) {
        if (heroContent) heroContent.style.transform = `translateY(${s * 0.15}px)`;
        auroras.forEach(a => { a.style.transform = `translateY(${s * 0.25}px)`; });
      }
    }, { passive: true });
  }

  // =========================================================
  // 9. MOCKUPS SVG GENERATIVOS
  // =========================================================
  const mockups = {

    'red-desguace': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="rd0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0d2a1f"/><stop offset="100%" stop-color="#14392a"/></linearGradient><linearGradient id="rd1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a4a35"/><stop offset="100%" stop-color="#0d2a1f"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#rd0)"/>
      <rect x="0" y="0" width="800" height="48" fill="#06140d"/>
      <text x="24" y="30" font-family="Archivo Black,sans-serif" font-size="16" fill="#c0dd97">RED DESGUACE</text>
      <rect x="480" y="12" width="200" height="24" rx="12" fill="#1a4a35"/><text x="500" y="28" font-family="ui-sans-serif" font-size="10" fill="#a8c89a">Buscar pieza, marca...</text>
      <rect x="700" y="12" width="72" height="24" rx="12" fill="#c0dd97"/><text x="736" y="28" font-family="ui-sans-serif" font-size="10" fill="#14392a" text-anchor="middle" font-weight="bold">Buscar</text>
      <text x="24" y="110" font-family="Archivo Black,sans-serif" font-size="36" fill="#fff">+176.000 piezas</text>
      <text x="24" y="140" font-family="Georgia,serif" font-style="italic" font-size="22" fill="#c0dd97">de vehículos certificados</text>
      <rect x="24" y="158" width="64" height="20" rx="10" fill="#c0dd9720" stroke="#c0dd9955"/><text x="56" y="172" font-family="ui-sans-serif" font-size="9" fill="#c0dd97" text-anchor="middle">Motor</text>
      <rect x="96" y="158" width="80" height="20" rx="10" fill="#1a4a35"/><text x="136" y="172" font-family="ui-sans-serif" font-size="9" fill="#a8c89a" text-anchor="middle">Carrocería</text>
      <rect x="184" y="158" width="80" height="20" rx="10" fill="#1a4a35"/><text x="224" y="172" font-family="ui-sans-serif" font-size="9" fill="#a8c89a" text-anchor="middle">Eléctrico</text>
      ${[0,1,2,3].map(i=>`<g transform="translate(${24+i*192},194)"><rect width="178" height="272" rx="10" fill="url(#rd1)" stroke="#c0dd9730"/><rect x="10" y="10" width="158" height="130" rx="6" fill="#0d2a1f"/><circle cx="89" cy="75" r="36" fill="none" stroke="#c0dd9755" stroke-width="2"/><path d="M69 75 q20-25 40 0" fill="none" stroke="#c0dd9977" stroke-width="2"/><rect x="10" y="152" width="128" height="10" rx="4" fill="#c0dd9944"/><rect x="10" y="168" width="90" height="8" rx="4" fill="#c0dd9922"/><text x="10" y="208" font-family="Archivo Black,sans-serif" font-size="22" fill="#F4C430">${['85€','450€','120€','70€'][i]}</text><text x="10" y="224" font-family="ui-sans-serif" font-size="9" fill="#a8c89a">Stock: ${['3','1','5','2'][i]} uds</text><rect x="10" y="238" width="158" height="24" rx="12" fill="#F4C430"/><text x="89" y="254" font-family="ui-sans-serif" font-size="10" fill="#14392a" text-anchor="middle" font-weight="bold">Ver pieza →</text></g>`).join('')}
    </svg>`,

    'reciclacat': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="rc0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1B4332"/><stop offset="100%" stop-color="#2D6A30"/></linearGradient></defs>
      <rect width="800" height="500" fill="url(#rc0)"/>
      <rect x="200" y="20" width="400" height="460" rx="40" fill="#0a1f15" stroke="#000" stroke-width="3"/>
      <rect x="213" y="33" width="374" height="434" rx="30" fill="#1B4332"/>
      <text x="230" y="60" font-family="ui-sans-serif" font-size="11" fill="#fff" font-weight="600">09:41</text>
      <rect x="213" y="70" width="374" height="72" fill="#0a1f15"/>
      <text x="233" y="102" font-family="Archivo Black,sans-serif" font-size="20" fill="#fff">ReciclaCAT</text>
      <text x="233" y="120" font-family="ui-sans-serif" font-size="11" fill="#a8dc8a">VFU-2024-0847 · SEAT Ibiza</text>
      <g transform="translate(233,158)"><circle cx="0" cy="0" r="16" fill="#67C23A"/><text x="0" y="5" font-family="ui-sans-serif" font-size="12" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text><line x1="16" y1="0" x2="78" y2="0" stroke="#67C23A" stroke-width="2"/><circle cx="94" cy="0" r="16" fill="#67C23A"/><text x="94" y="5" font-family="ui-sans-serif" font-size="12" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text><line x1="110" y1="0" x2="168" y2="0" stroke="#F4C430" stroke-width="2"/><circle cx="184" cy="0" r="16" fill="#F4C430"/><text x="184" y="5" font-family="ui-sans-serif" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">3</text><line x1="200" y1="0" x2="258" y2="0" stroke="#3a5a4855" stroke-width="2" stroke-dasharray="3 3"/><circle cx="274" cy="0" r="16" fill="none" stroke="#67C23A55" stroke-width="2"/><text x="274" y="5" font-family="ui-sans-serif" font-size="11" fill="#67C23A88" text-anchor="middle">4</text></g>
      <rect x="233" y="210" width="354" height="195" rx="14" fill="#0a2818" stroke="#67C23A33"/>
      <text x="253" y="238" font-family="ui-monospace" font-size="9" fill="#a8dc8a" letter-spacing="2">PASO 3 · BOLETÍN HV</text>
      <text x="253" y="262" font-family="Georgia,serif" font-style="italic" font-size="20" fill="#fff">Supresión de tensión</text>
      <g transform="translate(253,278)"><rect width="18" height="18" rx="4" fill="#67C23A"/><text x="9" y="13" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text><text x="28" y="13" font-family="ui-sans-serif" font-size="12" fill="#fff">Desconexión manual</text></g>
      <g transform="translate(253,304)"><rect width="18" height="18" rx="4" fill="#67C23A"/><text x="9" y="13" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text><text x="28" y="13" font-family="ui-sans-serif" font-size="12" fill="#fff">Tiempo espera (5 min)</text></g>
      <g transform="translate(253,330)"><rect width="18" height="18" rx="4" fill="none" stroke="#F4C430" stroke-width="2"/><text x="28" y="13" font-family="ui-sans-serif" font-size="12" fill="#F4C430">Medición tensión residual</text></g>
      <g transform="translate(253,356)"><rect width="18" height="18" rx="4" fill="none" stroke="#67C23A55" stroke-width="2"/><text x="28" y="13" font-family="ui-sans-serif" font-size="12" fill="#ffffff80">Bloqueo batería</text></g>
      <rect x="233" y="420" width="354" height="36" rx="18" fill="#F4C430"/>
      <text x="410" y="442" font-family="ui-sans-serif" font-size="13" fill="#1B4332" text-anchor="middle" font-weight="bold">Generar Boletín BST →</text>
    </svg>`,

    'medibitacora': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="mb0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a8970"/><stop offset="100%" stop-color="#0d6b56"/></linearGradient></defs>
      <rect width="800" height="500" fill="#f0f7f4"/>
      <rect x="210" y="20" width="380" height="460" rx="36" fill="#1a2332" stroke="#0a1018" stroke-width="3"/>
      <rect x="222" y="32" width="356" height="436" rx="26" fill="#fff"/>
      <text x="240" y="58" font-family="ui-sans-serif" font-size="10" fill="#1a2332" font-weight="600">09:41</text>
      <rect x="222" y="66" width="356" height="80" fill="url(#mb0)"/>
      <text x="244" y="96" font-family="Georgia,serif" font-size="20" fill="#fff" font-style="italic">MediBitácora</text>
      <text x="244" y="116" font-family="ui-sans-serif" font-size="11" fill="#a8e8d0">Tu salud, en orden</text>
      <rect x="222" y="146" width="356" height="44" fill="#f0f7f4"/>
      <text x="244" y="172" font-family="Archivo Black,sans-serif" font-size="14" fill="#1a2332" text-anchor="middle" x="316">3 citas · 12 registros</text>
      ${[['📅','Próxima cita','Cardiología · 18 Jun'],['💊','Medicación diaria','3 pendientes hoy'],['📋','Síntomas recientes','Último: hace 2 días'],['📄','Exportar PDF','Historial completo']].map(([ic,t,d],i)=>`<g transform="translate(242,${204+i*66})"><rect width="316" height="56" rx="12" fill="${i%2===0?'#f0f7f4':'#fff'}" stroke="#1a897033"/><circle cx="28" cy="28" r="16" fill="${['#1a8970','#F4C430','#0d6b56','#1a2332'][i]}"/><text x="28" y="33" font-family="ui-sans-serif" font-size="14" fill="#fff" text-anchor="middle">${ic}</text><text x="56" y="24" font-family="ui-sans-serif" font-size="13" fill="#1a2332" font-weight="600">${t}</text><text x="56" y="40" font-family="ui-sans-serif" font-size="11" fill="#5a6878">${d}</text><text x="296" y="32" font-family="ui-sans-serif" font-size="18" fill="#1a8970" text-anchor="middle">›</text></g>`).join('')}
    </svg>`,

    'hola-itv': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="800" height="450" fill="#f5f7fa"/>
      <rect x="0" y="0" width="800" height="56" fill="#fff"/>
      <text x="32" y="36" font-family="Archivo Black,sans-serif" font-size="14" fill="#0f2d55">HOLA ITV MÁLAGA</text>
      <rect x="640" y="16" width="128" height="24" rx="12" fill="#0f2d55"/><text x="704" y="32" font-family="ui-sans-serif" font-size="11" fill="#fff" text-anchor="middle">Contactar →</text>
      <rect x="0" y="56" width="800" height="200" fill="#0f2d55"/>
      <path d="M520 170 Q560 140 620 145 Q680 148 710 165 L715 210 L510 210 Z" fill="#ffffff10"/>
      <ellipse cx="560" cy="210" rx="22" ry="9" fill="#ffffff20"/><ellipse cx="680" cy="210" rx="22" ry="9" fill="#ffffff20"/>
      <text x="48" y="120" font-family="Archivo Black,sans-serif" font-size="32" fill="#fff">Tu flota con la ITV</text>
      <text x="48" y="155" font-family="Georgia,serif" font-style="italic" font-size="28" fill="#F4C430">al día, sin mover un dedo</text>
      <text x="48" y="185" font-family="ui-sans-serif" font-size="12" fill="#ffffff99">Servicio exclusivo para concesionarios, rent-a-car y flotas en Málaga.</text>
      <rect x="48" y="200" width="140" height="34" rx="17" fill="#F4C430"/><text x="118" y="221" font-family="ui-sans-serif" font-size="12" fill="#0f2d55" text-anchor="middle" font-weight="bold">Escríbenos →</text>
      <rect x="0" y="256" width="800" height="194" fill="#fff"/>
      <text x="400" y="288" font-family="Archivo Black,sans-serif" font-size="16" fill="#0f2d55" text-anchor="middle">Cuatro pasos, cero complicaciones</text>
      ${[['01','Nos contactas','Indícanos vehículos y plazos'],['02','Gestionamos cita','ITV más conveniente'],['03','Recogemos','Conductor a tus instalaciones'],['04','Entregamos','Tasas adelantadas · factura única']].map(([n,t,d],i)=>`<g transform="translate(${40+i*190},308)"><rect width="175" height="110" rx="10" fill="#f5f7fa" stroke="#0f2d5518"/><circle cx="24" cy="24" r="18" fill="#0f2d55"/><text x="24" y="29" font-family="Archivo Black,sans-serif" font-size="12" fill="#fff" text-anchor="middle">${n}</text><text x="14" y="62" font-family="ui-sans-serif" font-size="11" fill="#0f2d55" font-weight="600">${t}</text><text x="14" y="78" font-family="ui-sans-serif" font-size="9" fill="#6a7a9a">${d}</text></g>`).join('')}
    </svg>`,

    'desguaces-soliva': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="ds0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a2a1a"/><stop offset="100%" stop-color="#0d1d0d"/></linearGradient></defs>
      <rect width="800" height="450" fill="url(#ds0)"/>
      <rect x="0" y="0" width="800" height="32" fill="#0a140a"/>
      <circle cx="18" cy="16" r="4" fill="#ff5f57"/><circle cx="34" cy="16" r="4" fill="#febc2e"/><circle cx="50" cy="16" r="4" fill="#28c940"/>
      <rect x="80" y="8" width="640" height="16" rx="8" fill="#0a1a0a"/><text x="100" y="20" font-family="ui-monospace" font-size="10" fill="#5a7a5a">desguacessoliva.com</text>
      <text x="32" y="74" font-family="Archivo Black,sans-serif" font-size="26" fill="#fff">Desguaces Soliva</text>
      <text x="32" y="94" font-family="ui-sans-serif" font-size="12" fill="#a8c89a">Piezas de ocasión · +12.000 referencias</text>
      <rect x="32" y="110" width="480" height="40" rx="20" fill="#0d1d0d" stroke="#67C23A33"/><text x="60" y="134" font-family="ui-sans-serif" font-size="12" fill="#a8c89a">🔍  Buscar pieza, marca, modelo...</text>
      <rect x="524" y="110" width="110" height="40" rx="20" fill="#67C23A"/><text x="579" y="134" font-family="ui-sans-serif" font-size="12" fill="#0d1d0d" text-anchor="middle" font-weight="bold">Buscar</text>
      ${[['Motor 1.6 TDI','VW Golf','420€'],['Caja cambios','Renault','350€'],['Puerta del.','Seat León','140€'],['Alternador','Ford Focus','85€']].map(([p,m,pr],i)=>`<g transform="translate(${32+i*190},170)"><rect width="175" height="225" rx="10" fill="#0d1d0d" stroke="#67C23A22"/><rect x="10" y="10" width="155" height="110" rx="6" fill="#1a2a1a"/><circle cx="87" cy="65" r="28" fill="none" stroke="#67C23A55" stroke-width="2"/><text x="10" y="136" font-family="ui-sans-serif" font-size="11" fill="#fff" font-weight="600">${p}</text><text x="10" y="152" font-family="ui-sans-serif" font-size="10" fill="#a8c89a">${m}</text><text x="10" y="182" font-family="Archivo Black,sans-serif" font-size="18" fill="#F4C430">${pr}</text><rect x="10" y="200" width="76" height="20" rx="10" fill="#25D366"/><text x="48" y="213" font-family="ui-sans-serif" font-size="9" fill="#fff" text-anchor="middle">WhatsApp</text></g>`).join('')}
    </svg>`,

    'recambios-reciclacat': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="rr0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1B4332"/><stop offset="100%" stop-color="#0a2818"/></linearGradient></defs>
      <rect width="800" height="450" fill="url(#rr0)"/>
      <rect x="0" y="0" width="800" height="32" fill="#0a1f15"/>
      <circle cx="18" cy="16" r="4" fill="#ff5f57"/><circle cx="34" cy="16" r="4" fill="#febc2e"/><circle cx="50" cy="16" r="4" fill="#28c940"/>
      <text x="100" y="20" font-family="ui-monospace" font-size="10" fill="#5a9a6a">recambios.reciclacat.es</text>
      <text x="32" y="70" font-family="Archivo Black,sans-serif" font-size="14" fill="#67C23A" letter-spacing="1">RECICLACAT</text>
      <text x="32" y="92" font-family="Archivo Black,sans-serif" font-size="24" fill="#fff">Recambios verificados</text>
      <rect x="32" y="108" width="500" height="40" rx="20" fill="#0a2818" stroke="#67C23A44"/><text x="58" y="132" font-family="ui-sans-serif" font-size="12" fill="#a8dc8a">Busca por pieza, modelo o referencia...</text>
      <rect x="546" y="108" width="64" height="40" rx="20" fill="#67C23A"/>
      <rect x="32" y="165" width="736" height="40" rx="8" fill="#0a2818" stroke="#67C23A22"/>
      <text x="52" y="190" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1">PIEZA</text><text x="280" y="190" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1">VEHÍCULO</text><text x="480" y="190" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1">PRECIO</text><text x="600" y="190" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1">ESTADO</text>
      ${[['Motor 1.4 TSI','Seat Ibiza 2018','380€','Disponible','#67C23A'],['Turbocompresor','VW Polo 2019','220€','Disponible','#67C23A'],['Caja DSG','Skoda Fabia','450€','Consultar','#F4C430'],['Alternador 14V','SEAT León','95€','Disponible','#67C23A'],['Módulo ABS','Audi A3','180€','Disponible','#67C23A'],['Compresor AC','VW Golf VII','145€','Bajo stock','#F4C430']].map(([p,v,pr,st,c],i)=>`<g transform="translate(0,${208+i*38})"><rect x="32" y="0" width="736" height="36" rx="6" fill="${i%2===0?'#0a2818':'#1B433280'}"/><text x="52" y="22" font-family="ui-sans-serif" font-size="11" fill="#fff" font-weight="500">${p}</text><text x="280" y="22" font-family="ui-sans-serif" font-size="11" fill="#a8dc8a">${v}</text><text x="480" y="22" font-family="Archivo Black,sans-serif" font-size="13" fill="#F4C430">${pr}</text><rect x="600" y="8" width="80" height="20" rx="10" fill="${c}22" stroke="${c}55"/><text x="640" y="21" font-family="ui-sans-serif" font-size="8" fill="${c}" text-anchor="middle">${st}</text></g>`).join('')}
    </svg>`,

    'boqueron-books': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="bb0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a1828"/><stop offset="100%" stop-color="#1a2842"/></linearGradient><radialGradient id="bb1" cx="0.5" cy="0"><stop offset="0%" stop-color="#d4a017" stop-opacity="0.25"/><stop offset="100%" stop-color="#d4a017" stop-opacity="0"/></radialGradient></defs>
      <rect width="800" height="450" fill="url(#bb0)"/>
      <rect width="800" height="280" fill="url(#bb1)"/>
      <rect x="0" y="0" width="800" height="32" fill="#050d18"/>
      <circle cx="18" cy="16" r="4" fill="#ff5f57"/><circle cx="34" cy="16" r="4" fill="#febc2e"/><circle cx="50" cy="16" r="4" fill="#28c940"/>
      <text x="48" y="76" font-family="Georgia,serif" font-style="italic" font-size="36" fill="#d4a017">El Boquerón</text>
      <text x="48" y="100" font-family="Archivo Black,sans-serif" font-size="16" fill="#fff" letter-spacing="3">— BOOKS —</text>
      <line x1="48" y1="115" x2="752" y2="115" stroke="#d4a01740" stroke-width="1"/>
      ${[['#1a2842','ChatGPT para Gerentes','2024'],['#2a1830','La Ventaja Invisible','2023'],['#1a3042','Sana Tu Cuerpo','2024'],['#2a2818','NO ME PASA NADA','2023'],['#1a1f3a','Próximamente','2026']].map(([c,t,y],i)=>`<g transform="translate(${48+i*148},135)"><rect width="130" height="195" rx="4" fill="${c}" stroke="#d4a01766"/><rect x="8" y="8" width="114" height="179" rx="2" fill="none" stroke="#d4a01733"/><text x="65" y="58" font-family="Georgia,serif" font-style="italic" font-size="9" fill="#d4a017" text-anchor="middle">El Boquerón</text><line x1="35" y1="66" x2="95" y2="66" stroke="#d4a017" stroke-width="0.5"/><text x="65" y="105" font-family="Archivo Black,sans-serif" font-size="8" fill="#fff" text-anchor="middle">${t.split(' ').slice(0,2).join(' ')}</text><text x="65" y="118" font-family="Archivo Black,sans-serif" font-size="8" fill="#fff" text-anchor="middle">${t.split(' ').slice(2).join(' ')}</text><text x="65" y="175" font-family="ui-monospace" font-size="7" fill="#d4a01799" text-anchor="middle">${y}</text></g>`).join('')}
      <text x="48" y="374" font-family="ui-monospace" font-size="9" fill="#5a6878" letter-spacing="2">PUBLICACIONES · MÁLAGA</text>
      <rect x="48" y="384" width="120" height="30" rx="15" fill="#d4a017"/><text x="108" y="403" font-family="ui-sans-serif" font-size="11" fill="#0a1828" text-anchor="middle" font-weight="bold">Ver catálogo →</text>
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

  // =========================================================
  // 10. FORMULARIO DE CONTACTO
  // =========================================================
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
    form.addEventListener('submit', async (e) => {
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
        else throw new Error('Error');
      } catch {
        const sub = encodeURIComponent(`Consulta · ${data.nombre}`);
        const body = encodeURIComponent(`Nombre: ${data.nombre}\nEmpresa: ${data.empresa||'-'}\nEmail: ${data.email}\nTeléfono: ${data.telefono||'-'}\n\n${data.mensaje}`);
        window.location.href = `mailto:hola@limonadaweb.com?subject=${sub}&body=${body}`;
        showFeedback('Abriendo tu cliente de correo... Si no funciona escríbenos a hola@limonadaweb.com', 'info');
      } finally { btn.disabled = false; btn.innerHTML = orig; }
    });
  }

})();
