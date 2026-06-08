/* =========================================================
   LIMONADA WEB · main.js
   Scroll reveal, mockups SVG generativos, formulario
   ========================================================= */
(() => {
  'use strict';

  // Año actual en footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Parallax aurora
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const auroras = document.querySelectorAll('.aurora');
    window.addEventListener('scroll', () => {
      const s = window.pageYOffset;
      auroras.forEach((a) => { if (s < 1000) a.style.transform = `translateY(${s * 0.25}px)`; });
    }, { passive: true });
  }

  // =========================================================
  // MOCKUPS SVG GENERATIVOS
  // Cada valor en este objeto corresponde al data-mockup-content
  // del div contenedor. Para sustituir por capturas reales:
  //   <div class="mockup-frame">
  //     <img src="/images/proyectos/red-desguace.webp" alt="..." loading="lazy" class="w-full h-full object-cover">
  //   </div>
  // =========================================================
  const mockups = {

    /* RED DESGUACE ----------------------------------------- */
    'red-desguace': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-label="Red Desguace">
      <defs>
        <linearGradient id="rd0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0d2a1f"/><stop offset="100%" stop-color="#14392a"/></linearGradient>
        <linearGradient id="rd1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a4a35"/><stop offset="100%" stop-color="#0d2a1f"/></linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#rd0)"/>
      <!-- Nav -->
      <rect x="0" y="0" width="800" height="48" fill="#06140d"/>
      <text x="24" y="30" font-family="Archivo Black,sans-serif" font-size="16" fill="#c0dd97">RED DESGUACE</text>
      <rect x="480" y="12" width="200" height="24" rx="12" fill="#1a4a35"/>
      <text x="500" y="28" font-family="ui-sans-serif" font-size="10" fill="#a8c89a">Buscar pieza, marca...</text>
      <rect x="700" y="12" width="72" height="24" rx="12" fill="#c0dd97"/>
      <text x="736" y="28" font-family="ui-sans-serif" font-size="10" fill="#14392a" text-anchor="middle" font-weight="bold">Buscar</text>
      <!-- Hero text -->
      <text x="24" y="110" font-family="Archivo Black,sans-serif" font-size="36" fill="#fff">+176.000 piezas</text>
      <text x="24" y="140" font-family="Georgia,serif" font-style="italic" font-size="22" fill="#c0dd97">de vehículos certificados</text>
      <!-- Filter pills -->
      <rect x="24" y="158" width="64" height="20" rx="10" fill="#c0dd9720" stroke="#c0dd9955"/>
      <text x="56" y="172" font-family="ui-sans-serif" font-size="9" fill="#c0dd97" text-anchor="middle">Motor</text>
      <rect x="96" y="158" width="80" height="20" rx="10" fill="#1a4a35"/>
      <text x="136" y="172" font-family="ui-sans-serif" font-size="9" fill="#a8c89a" text-anchor="middle">Carrocería</text>
      <rect x="184" y="158" width="80" height="20" rx="10" fill="#1a4a35"/>
      <text x="224" y="172" font-family="ui-sans-serif" font-size="9" fill="#a8c89a" text-anchor="middle">Eléctrico</text>
      <!-- Part cards -->
      ${[0,1,2,3].map(i => `
        <g transform="translate(${24 + i*192},194)">
          <rect width="178" height="272" rx="10" fill="url(#rd1)" stroke="#c0dd9730"/>
          <rect x="10" y="10" width="158" height="130" rx="6" fill="#0d2a1f"/>
          <circle cx="89" cy="75" r="36" fill="none" stroke="#c0dd9755" stroke-width="2"/>
          <path d="M69 75 q20-25 40 0" fill="none" stroke="#c0dd9977" stroke-width="2"/>
          <rect x="10" y="152" width="128" height="10" rx="4" fill="#c0dd9944"/>
          <rect x="10" y="168" width="90" height="8" rx="4" fill="#c0dd9922"/>
          <text x="10" y="208" font-family="Archivo Black,sans-serif" font-size="22" fill="#F4C430">${['85€','450€','120€','70€'][i]}</text>
          <text x="10" y="224" font-family="ui-sans-serif" font-size="9" fill="#a8c89a">Stock: ${['3','1','5','2'][i]} uds</text>
          <rect x="10" y="238" width="158" height="24" rx="12" fill="#F4C430"/>
          <text x="89" y="254" font-family="ui-sans-serif" font-size="10" fill="#14392a" text-anchor="middle" font-weight="bold">Ver pieza →</text>
        </g>`).join('')}
    </svg>`,

    /* RECICLACAT APP --------------------------------------- */
    'reciclacat': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-label="ReciclaCAT App">
      <defs>
        <linearGradient id="rc0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1B4332"/><stop offset="100%" stop-color="#2D6A30"/></linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#rc0)"/>
      <!-- Phone frame -->
      <rect x="200" y="20" width="400" height="460" rx="40" fill="#0a1f15" stroke="#000" stroke-width="3"/>
      <rect x="213" y="33" width="374" height="434" rx="30" fill="#1B4332"/>
      <!-- Status -->
      <text x="230" y="60" font-family="ui-sans-serif" font-size="11" fill="#fff" font-weight="600">09:41</text>
      <!-- Header -->
      <rect x="213" y="70" width="374" height="72" fill="#0a1f15"/>
      <text x="233" y="102" font-family="Archivo Black,sans-serif" font-size="20" fill="#fff">ReciclaCAT</text>
      <text x="233" y="120" font-family="ui-sans-serif" font-size="11" fill="#a8dc8a">VFU-2024-0847 · SEAT Ibiza</text>
      <!-- Stepper -->
      <g transform="translate(233,158)">
        <circle cx="0" cy="0" r="16" fill="#67C23A"/>
        <text x="0" y="5" font-family="ui-sans-serif" font-size="12" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text>
        <line x1="16" y1="0" x2="78" y2="0" stroke="#67C23A" stroke-width="2"/>
        <circle cx="94" cy="0" r="16" fill="#67C23A"/>
        <text x="94" y="5" font-family="ui-sans-serif" font-size="12" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text>
        <line x1="110" y1="0" x2="168" y2="0" stroke="#F4C430" stroke-width="2"/>
        <circle cx="184" cy="0" r="16" fill="#F4C430"/>
        <text x="184" y="5" font-family="ui-sans-serif" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">3</text>
        <line x1="200" y1="0" x2="258" y2="0" stroke="#3a5a4855" stroke-width="2" stroke-dasharray="3 3"/>
        <circle cx="274" cy="0" r="16" fill="none" stroke="#67C23A55" stroke-width="2"/>
        <text x="274" y="5" font-family="ui-sans-serif" font-size="11" fill="#67C23A88" text-anchor="middle">4</text>
        <text x="0" y="26" font-family="ui-sans-serif" font-size="8" fill="#a8dc8a" text-anchor="middle">Registro</text>
        <text x="94" y="26" font-family="ui-sans-serif" font-size="8" fill="#a8dc8a" text-anchor="middle">Fluidos</text>
        <text x="184" y="26" font-family="ui-sans-serif" font-size="8" fill="#F4C430" text-anchor="middle">BST/HV</text>
        <text x="274" y="26" font-family="ui-sans-serif" font-size="8" fill="#67C23A88" text-anchor="middle">Acta</text>
      </g>
      <!-- Step card -->
      <rect x="233" y="210" width="354" height="190" rx="14" fill="#0a2818" stroke="#67C23A33"/>
      <text x="253" y="238" font-family="ui-monospace" font-size="9" fill="#a8dc8a" letter-spacing="2">PASO 3 · BOLETÍN HV</text>
      <text x="253" y="262" font-family="Georgia,serif" font-style="italic" font-size="20" fill="#fff">Supresión de tensión</text>
      <g transform="translate(253,278)">
        <rect width="18" height="18" rx="4" fill="#67C23A"/><text x="9" y="13" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text>
        <text x="28" y="13" font-family="ui-sans-serif" font-size="12" fill="#fff">Desconexión manual</text>
      </g>
      <g transform="translate(253,304)">
        <rect width="18" height="18" rx="4" fill="#67C23A"/><text x="9" y="13" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text>
        <text x="28" y="13" font-family="ui-sans-serif" font-size="12" fill="#fff">Tiempo espera (5 min)</text>
      </g>
      <g transform="translate(253,330)">
        <rect width="18" height="18" rx="4" fill="none" stroke="#F4C430" stroke-width="2"/>
        <text x="28" y="13" font-family="ui-sans-serif" font-size="12" fill="#F4C430">Medición tensión residual</text>
      </g>
      <g transform="translate(253,356)">
        <rect width="18" height="18" rx="4" fill="none" stroke="#67C23A55" stroke-width="2"/>
        <text x="28" y="13" font-family="ui-sans-serif" font-size="12" fill="#ffffff80">Bloqueo batería</text>
      </g>
      <!-- CTA -->
      <rect x="233" y="415" width="354" height="38" rx="19" fill="#F4C430"/>
      <text x="410" y="438" font-family="ui-sans-serif" font-size="13" fill="#1B4332" text-anchor="middle" font-weight="bold">Generar Boletín BST →</text>
    </svg>`,

    /* MEDIBITÁCORA ----------------------------------------- */
    'medibitacora': `<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-label="MediBitácora">
      <defs>
        <linearGradient id="mb0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a8970"/><stop offset="100%" stop-color="#0d6b56"/></linearGradient>
      </defs>
      <rect width="800" height="500" fill="#f0f7f4"/>
      <!-- Phone -->
      <rect x="210" y="20" width="380" height="460" rx="36" fill="#1a2332" stroke="#0a1018" stroke-width="3"/>
      <rect x="222" y="32" width="356" height="436" rx="26" fill="#fff"/>
      <text x="240" y="58" font-family="ui-sans-serif" font-size="10" fill="#1a2332" font-weight="600">09:41</text>
      <!-- App header -->
      <rect x="222" y="66" width="356" height="80" fill="url(#mb0)"/>
      <text x="244" y="96" font-family="Georgia,serif" font-size="20" fill="#fff" font-style="italic">MediBitácora</text>
      <text x="244" y="116" font-family="ui-sans-serif" font-size="11" fill="#a8e8d0">Tu salud, en orden</text>
      <circle cx="548" cy="106" r="22" fill="#fff" opacity="0.12"/>
      <text x="548" y="111" font-family="ui-sans-serif" font-size="14" fill="#fff" text-anchor="middle">+</text>
      <!-- Summary strip -->
      <rect x="222" y="146" width="356" height="44" fill="#f0f7f4"/>
      <text x="254" y="172" font-family="ui-monospace" font-size="9" fill="#1a8970" letter-spacing="1">ESTE MES</text>
      <text x="380" y="172" font-family="Archivo Black,sans-serif" font-size="14" fill="#1a2332" text-anchor="middle">3 citas</text>
      <text x="530" y="172" font-family="Archivo Black,sans-serif" font-size="14" fill="#1a2332" text-anchor="middle">12 registros</text>
      <!-- Cards -->
      <g transform="translate(242,204)">
        <rect width="316" height="56" rx="12" fill="#f0f7f4" stroke="#1a897033"/>
        <circle cx="28" cy="28" r="16" fill="#1a8970"/>
        <text x="28" y="33" font-family="ui-sans-serif" font-size="14" fill="#fff" text-anchor="middle">📅</text>
        <text x="56" y="24" font-family="ui-sans-serif" font-size="13" fill="#1a2332" font-weight="600">Próxima cita</text>
        <text x="56" y="40" font-family="ui-sans-serif" font-size="11" fill="#5a6878">Cardiología · 18 Jun · 10:30</text>
        <text x="296" y="32" font-family="ui-sans-serif" font-size="18" fill="#1a8970" text-anchor="middle">›</text>
      </g>
      <g transform="translate(242,270)">
        <rect width="316" height="56" rx="12" fill="#fff" stroke="#1a897033"/>
        <circle cx="28" cy="28" r="16" fill="#F4C430"/>
        <text x="28" y="33" font-family="ui-sans-serif" font-size="14" fill="#fff" text-anchor="middle">💊</text>
        <text x="56" y="24" font-family="ui-sans-serif" font-size="13" fill="#1a2332" font-weight="600">Medicación diaria</text>
        <text x="56" y="40" font-family="ui-sans-serif" font-size="11" fill="#5a6878">3 pendientes hoy · ver detalle</text>
        <text x="296" y="32" font-family="ui-sans-serif" font-size="18" fill="#1a8970" text-anchor="middle">›</text>
      </g>
      <g transform="translate(242,336)">
        <rect width="316" height="56" rx="12" fill="#fff" stroke="#1a897033"/>
        <circle cx="28" cy="28" r="16" fill="#0d6b56"/>
        <text x="28" y="33" font-family="ui-sans-serif" font-size="14" fill="#fff" text-anchor="middle">📋</text>
        <text x="56" y="24" font-family="ui-sans-serif" font-size="13" fill="#1a2332" font-weight="600">Síntomas recientes</text>
        <text x="56" y="40" font-family="ui-sans-serif" font-size="11" fill="#5a6878">Último registro: hace 2 días</text>
        <text x="296" y="32" font-family="ui-sans-serif" font-size="18" fill="#1a8970" text-anchor="middle">›</text>
      </g>
      <g transform="translate(242,402)">
        <rect width="316" height="56" rx="12" fill="#f0f7f4" stroke="#1a897033"/>
        <circle cx="28" cy="28" r="16" fill="#1a2332"/>
        <text x="28" y="33" font-family="ui-sans-serif" font-size="14" fill="#fff" text-anchor="middle">📄</text>
        <text x="56" y="24" font-family="ui-sans-serif" font-size="13" fill="#1a2332" font-weight="600">Exportar informe PDF</text>
        <text x="56" y="40" font-family="ui-sans-serif" font-size="11" fill="#5a6878">Historial completo · compartir</text>
        <text x="296" y="32" font-family="ui-sans-serif" font-size="18" fill="#1a8970" text-anchor="middle">›</text>
      </g>
    </svg>`,

    /* HOLA ITV MÁLAGA -------------------------------------- */
    'hola-itv': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-label="Hola ITV Málaga">
      <defs>
        <linearGradient id="itv0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f2d55"/><stop offset="100%" stop-color="#1a3e6e"/></linearGradient>
        <linearGradient id="itv1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#1a3e6e"/><stop offset="100%" stop-color="#0f2d55"/></linearGradient>
      </defs>
      <!-- BG -->
      <rect width="800" height="450" fill="#f5f7fa"/>
      <!-- Nav -->
      <rect x="0" y="0" width="800" height="56" fill="#fff" filter="drop-shadow(0 1px 3px #0002)"/>
      <text x="32" y="22" font-family="Archivo Black,sans-serif" font-size="11" fill="#0f2d55" letter-spacing="1">H</text>
      <text x="46" y="22" font-family="ui-sans-serif" font-size="11" fill="#0f2d55" font-weight="700">HOLA ITV</text>
      <text x="32" y="38" font-family="ui-monospace" font-size="8" fill="#6a7a9a" letter-spacing="1.5">MÁLAGA</text>
      <rect x="640" y="16" width="128" height="24" rx="12" fill="#0f2d55"/>
      <text x="704" y="32" font-family="ui-sans-serif" font-size="11" fill="#fff" text-anchor="middle">Contactar →</text>
      <!-- Hero -->
      <rect x="0" y="56" width="800" height="200" fill="url(#itv0)"/>
      <!-- Car silhouette abstract -->
      <path d="M520 170 Q560 140 620 145 Q680 148 710 165 L715 210 L510 210 Z" fill="#ffffff10"/>
      <ellipse cx="560" cy="210" rx="22" ry="9" fill="#ffffff20"/>
      <ellipse cx="680" cy="210" rx="22" ry="9" fill="#ffffff20"/>
      <!-- Text -->
      <text x="48" y="120" font-family="Archivo Black,sans-serif" font-size="32" fill="#fff">Tu flota con la ITV</text>
      <text x="48" y="155" font-family="Georgia,serif" font-style="italic" font-size="28" fill="#F4C430">al día, sin mover un dedo</text>
      <text x="48" y="185" font-family="ui-sans-serif" font-size="13" fill="#ffffff99">Servicio exclusivo para concesionarios, rent-a-car y flotas de empresa en Málaga.</text>
      <rect x="48" y="200" width="140" height="34" rx="17" fill="#F4C430"/>
      <text x="118" y="221" font-family="ui-sans-serif" font-size="12" fill="#0f2d55" text-anchor="middle" font-weight="bold">Escríbenos →</text>
      <!-- 4 Steps -->
      <rect x="0" y="256" width="800" height="194" fill="#fff"/>
      <text x="400" y="288" font-family="Archivo Black,sans-serif" font-size="16" fill="#0f2d55" text-anchor="middle">Cuatro pasos, cero complicaciones</text>
      ${[
        ['01', 'Nos contactas', 'Por email o WhatsApp con los vehículos que necesitas.'],
        ['02', 'Gestionamos', 'Buscamos cita en la ITV más conveniente.'],
        ['03', 'Recogemos', 'Un conductor acude a tus instalaciones.'],
        ['04', 'Entregamos', 'Vehículo + documentación. Tasas adelantadas.'],
      ].map(([n, t, d], i) => `
        <g transform="translate(${40 + i*190},308)">
          <rect width="175" height="110" rx="10" fill="#f5f7fa" stroke="#0f2d5518"/>
          <circle cx="24" cy="24" r="18" fill="#0f2d55"/>
          <text x="24" y="29" font-family="Archivo Black,sans-serif" font-size="12" fill="#fff" text-anchor="middle">${n}</text>
          <text x="14" y="62" font-family="ui-sans-serif" font-size="11" fill="#0f2d55" font-weight="600">${t}</text>
          <text x="14" y="78" font-family="ui-sans-serif" font-size="9" fill="#6a7a9a" text-anchor="start">${d.substring(0,28)}</text>
          ${d.length > 28 ? `<text x="14" y="92" font-family="ui-sans-serif" font-size="9" fill="#6a7a9a">${d.substring(28)}</text>` : ''}
        </g>`).join('')}
    </svg>`,

    /* DESGUACES SOLIVA ------------------------------------- */
    'desguaces-soliva': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-label="Desguaces Soliva">
      <defs>
        <linearGradient id="ds0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a2a1a"/><stop offset="100%" stop-color="#0d1d0d"/></linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#ds0)"/>
      <!-- Browser chrome -->
      <rect x="0" y="0" width="800" height="32" fill="#0a140a"/>
      <circle cx="18" cy="16" r="4" fill="#ff5f57"/><circle cx="34" cy="16" r="4" fill="#febc2e"/><circle cx="50" cy="16" r="4" fill="#28c940"/>
      <rect x="80" y="8" width="640" height="16" rx="8" fill="#0a1a0a"/>
      <text x="100" y="20" font-family="ui-monospace" font-size="10" fill="#5a7a5a">desguacessoliva.com</text>
      <!-- Header -->
      <text x="32" y="74" font-family="Archivo Black,sans-serif" font-size="26" fill="#fff">Desguaces Soliva</text>
      <text x="32" y="94" font-family="ui-sans-serif" font-size="12" fill="#a8c89a">Piezas de ocasión · +12.000 referencias disponibles</text>
      <!-- Search bar -->
      <rect x="32" y="110" width="480" height="40" rx="20" fill="#0d1d0d" stroke="#67C23A33"/>
      <text x="60" y="134" font-family="ui-sans-serif" font-size="12" fill="#a8c89a">🔍  Buscar pieza, marca, modelo...</text>
      <rect x="524" y="110" width="110" height="40" rx="20" fill="#67C23A"/>
      <text x="579" y="134" font-family="ui-sans-serif" font-size="12" fill="#0d1d0d" text-anchor="middle" font-weight="bold">Buscar</text>
      <!-- Part grid -->
      ${[
        ['Motor 1.6 TDI','Volkswagen Golf','420€','3'],
        ['Caja cambios auto','Renault Mégane','350€','1'],
        ['Puerta del. der.','Seat León','140€','2'],
        ['Alternador 80A','Ford Focus','85€','4'],
        ['Paragolpes tras.','Peugeot 308','95€','1'],
        ['Faro xenón der.','BMW Serie 3','220€','1'],
      ].map(([p,m,pr,s], i) => `
        <g transform="translate(${32 + (i%4)*190},170)">
          <rect width="175" height="225" rx="10" fill="#0d1d0d" stroke="#67C23A22"/>
          <rect x="10" y="10" width="155" height="110" rx="6" fill="#1a2a1a"/>
          <circle cx="87" cy="65" r="28" fill="none" stroke="#67C23A55" stroke-width="2"/>
          <text x="10" y="136" font-family="ui-sans-serif" font-size="11" fill="#fff" font-weight="600">${p}</text>
          <text x="10" y="152" font-family="ui-sans-serif" font-size="10" fill="#a8c89a">${m}</text>
          <text x="10" y="182" font-family="Archivo Black,sans-serif" font-size="18" fill="#F4C430">${pr}</text>
          <text x="10" y="198" font-family="ui-monospace" font-size="8" fill="#67C23A">Stock: ${s} ud${s!='1'?'s':''}</text>
          <rect x="10" y="208" width="76" height="20" rx="10" fill="#25D366"/>
          <text x="48" y="221" font-family="ui-sans-serif" font-size="9" fill="#fff" text-anchor="middle">WhatsApp</text>
        </g>`).join('')}
    </svg>`,

    /* RECAMBIOS RECICLACAT --------------------------------- */
    'recambios-reciclacat': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-label="Recambios ReciclaCAT">
      <defs>
        <linearGradient id="rr0" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1B4332"/><stop offset="100%" stop-color="#0a2818"/></linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#rr0)"/>
      <rect x="0" y="0" width="800" height="32" fill="#0a1f15"/>
      <circle cx="18" cy="16" r="4" fill="#ff5f57"/><circle cx="34" cy="16" r="4" fill="#febc2e"/><circle cx="50" cy="16" r="4" fill="#28c940"/>
      <rect x="80" y="8" width="640" height="16" rx="8" fill="#0a2818"/>
      <text x="100" y="20" font-family="ui-monospace" font-size="10" fill="#5a9a6a">recambios.reciclacat.es</text>
      <!-- Header -->
      <text x="32" y="70" font-family="Archivo Black,sans-serif" font-size="14" fill="#67C23A" letter-spacing="1">RECICLACAT</text>
      <text x="32" y="92" font-family="Archivo Black,sans-serif" font-size="24" fill="#fff">Recambios verificados</text>
      <!-- Search -->
      <rect x="32" y="108" width="500" height="40" rx="20" fill="#0a2818" stroke="#67C23A44"/>
      <text x="58" y="132" font-family="ui-sans-serif" font-size="12" fill="#a8dc8a">Busca por pieza, modelo o referencia...</text>
      <rect x="546" y="108" width="64" height="40" rx="20" fill="#67C23A"/>
      <text x="578" y="132" font-family="ui-sans-serif" font-size="18" fill="#1B4332" text-anchor="middle">🔍</text>
      <!-- List view -->
      <rect x="32" y="165" width="736" height="40" rx="8" fill="#0a2818" stroke="#67C23A22"/>
      <text x="52" y="190" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1">PIEZA</text>
      <text x="280" y="190" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1">VEHÍCULO</text>
      <text x="480" y="190" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1">MOTOR</text>
      <text x="600" y="190" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1">PRECIO</text>
      <text x="700" y="190" font-family="ui-monospace" font-size="9" fill="#5a9a6a" letter-spacing="1">ESTADO</text>
      ${[
        ['Motor 1.4 TSI 122CV','Seat Ibiza 2018','1.4 TSI','380€','Disponible','#67C23A'],
        ['Turbocompresor','VW Polo 2019','1.0 TSI','220€','Disponible','#67C23A'],
        ['Caja cambios DSG','Skoda Fabia','1.6 TDI','450€','Consultar','#F4C430'],
        ['Alternador 14V','SEAT León 2020','1.5 TSI','95€','Disponible','#67C23A'],
        ['Módulo ABS','Audi A3','2.0 TDI','180€','Disponible','#67C23A'],
        ['Compresor AC','VW Golf VII','1.4 TSI','145€','Bajo stock','#F4C430'],
      ].map(([p,v,m,pr,st,c], i) => `
        <g transform="translate(0,${208 + i*38})">
          <rect x="32" y="0" width="736" height="36" rx="6" fill="${i%2===0 ? '#0a2818' : '#1B433280'}"/>
          <text x="52" y="22" font-family="ui-sans-serif" font-size="11" fill="#fff" font-weight="500">${p}</text>
          <text x="280" y="22" font-family="ui-sans-serif" font-size="11" fill="#a8dc8a">${v}</text>
          <text x="480" y="22" font-family="ui-monospace" font-size="10" fill="#a8dc8a">${m}</text>
          <text x="600" y="22" font-family="Archivo Black,sans-serif" font-size="13" fill="#F4C430">${pr}</text>
          <rect x="700" y="8" width="56" height="18" rx="9" fill="${c}22" stroke="${c}55"/>
          <text x="728" y="20" font-family="ui-sans-serif" font-size="8" fill="${c}" text-anchor="middle">${st}</text>
        </g>`).join('')}
    </svg>`,

    /* EL BOQUERÓN BOOKS ------------------------------------ */
    'boqueron-books': `<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-label="El Boquerón Books">
      <defs>
        <linearGradient id="bb0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a1828"/><stop offset="100%" stop-color="#1a2842"/></linearGradient>
        <radialGradient id="bb1" cx="0.5" cy="0"><stop offset="0%" stop-color="#d4a017" stop-opacity="0.25"/><stop offset="100%" stop-color="#d4a017" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="800" height="450" fill="url(#bb0)"/>
      <rect width="800" height="280" fill="url(#bb1)"/>
      <rect x="0" y="0" width="800" height="32" fill="#050d18"/>
      <circle cx="18" cy="16" r="4" fill="#ff5f57"/><circle cx="34" cy="16" r="4" fill="#febc2e"/><circle cx="50" cy="16" r="4" fill="#28c940"/>
      <rect x="80" y="8" width="640" height="16" rx="8" fill="#0a1828"/>
      <text x="100" y="20" font-family="ui-monospace" font-size="10" fill="#3a5070">elboqueronbooks.com</text>
      <!-- Header -->
      <text x="48" y="76" font-family="Georgia,serif" font-style="italic" font-size="36" fill="#d4a017">El Boquerón</text>
      <text x="48" y="100" font-family="Archivo Black,sans-serif" font-size="16" fill="#fff" letter-spacing="3">— BOOKS —</text>
      <line x1="48" y1="115" x2="752" y2="115" stroke="#d4a01740" stroke-width="1"/>
      <!-- Books -->
      ${[
        ['#1a2842','ChatGPT para Gerentes','Molina','2024'],
        ['#2a1830','La Ventaja Invisible','Molina','2023'],
        ['#1a3042','Sana Tu Cuerpo','Molina','2024'],
        ['#2a2818','NO ME PASA NADA','Molina','2023'],
        ['#1a1f3a','Próximamente','—','2026'],
      ].map(([c,t,a,y], i) => `
        <g transform="translate(${48 + i*148},135)">
          <rect width="130" height="195" rx="4" fill="${c}" stroke="#d4a01766"/>
          <rect x="8" y="8" width="114" height="179" rx="2" fill="none" stroke="#d4a01733"/>
          <text x="65" y="58" font-family="Georgia,serif" font-style="italic" font-size="9" fill="#d4a017" text-anchor="middle">${a}</text>
          <line x1="35" y1="66" x2="95" y2="66" stroke="#d4a017" stroke-width="0.5"/>
          <text x="65" y="96" font-family="Archivo Black,sans-serif" font-size="8" fill="#fff" text-anchor="middle">${t.split(' ').slice(0,2).join(' ')}</text>
          <text x="65" y="110" font-family="Archivo Black,sans-serif" font-size="8" fill="#fff" text-anchor="middle">${t.split(' ').slice(2).join(' ')}</text>
          <text x="65" y="175" font-family="ui-monospace" font-size="7" fill="#d4a01799" text-anchor="middle">${y}</text>
        </g>`).join('')}
      <!-- Footer strip -->
      <text x="48" y="374" font-family="ui-monospace" font-size="9" fill="#5a6878" letter-spacing="2">PUBLICACIONES · MÁLAGA</text>
      <rect x="48" y="384" width="120" height="30" rx="15" fill="#d4a017"/>
      <text x="108" y="403" font-family="ui-sans-serif" font-size="11" fill="#0a1828" text-anchor="middle" font-weight="bold">Ver catálogo →</text>
    </svg>`,

  };

  // Inyectar mockups en los contenedores
  document.querySelectorAll('[data-mockup-content]').forEach(frame => {
    const key = frame.getAttribute('data-mockup-content');
    if (mockups[key]) {
      frame.innerHTML = mockups[key];
      // Aseguramos que el SVG ocupe todo el frame
      const svg = frame.querySelector('svg');
      if (svg) { svg.style.cssText = 'width:100%;height:100%;display:block;'; }
    }
  });

  // =========================================================
  // FORMULARIO DE CONTACTO
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
        const res = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) });
        if (res.ok) { showFeedback('¡Mensaje recibido! Te respondemos en menos de 24h.', 'success'); form.reset(); }
        else throw new Error('Error del servidor');
      } catch {
        const sub = encodeURIComponent(`Consulta · ${data.nombre}`);
        const body = encodeURIComponent(`Nombre: ${data.nombre}\nEmpresa: ${data.empresa||'-'}\nEmail: ${data.email}\nTeléfono: ${data.telefono||'-'}\n\n${data.mensaje}`);
        window.location.href = `mailto:hola@limonadaweb.com?subject=${sub}&body=${body}`;
        showFeedback('Abriendo tu cliente de correo... Si no funciona, escríbenos directamente a hola@limonadaweb.com', 'info');
      } finally { btn.disabled = false; btn.innerHTML = orig; }
    });
  }

})();
