/* =========================================================
   LIMONADA WEB · main.js
   Animaciones, mockups generativos e interactividad
   ========================================================= */

(() => {
  'use strict';

  // ----------------------------------------------------
  // Año actual en footer
  // ----------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----------------------------------------------------
  // Scroll reveal con IntersectionObserver
  // ----------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ----------------------------------------------------
  // Mockups generativos por proyecto
  // Cada mockup es SVG inline con la identidad del proyecto
  // Estructura preparada para sustituir por <img> reales
  // sin tocar el HTML del listing.
  // ----------------------------------------------------
  const mockups = {
    'red-desguace': `
      <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mockup de Red Desguace">
        <defs>
          <linearGradient id="rd-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0d2a1f"/>
            <stop offset="100%" stop-color="#14392a"/>
          </linearGradient>
          <linearGradient id="rd-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1a4a35"/>
            <stop offset="100%" stop-color="#0d2a1f"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#rd-bg)"/>
        <!-- Browser chrome -->
        <rect x="0" y="0" width="800" height="32" fill="#06140d"/>
        <circle cx="18" cy="16" r="4" fill="#ff5f57"/>
        <circle cx="34" cy="16" r="4" fill="#febc2e"/>
        <circle cx="50" cy="16" r="4" fill="#28c940"/>
        <rect x="80" y="8" width="640" height="16" rx="8" fill="#0d2a1f"/>
        <text x="100" y="20" font-family="ui-monospace" font-size="10" fill="#4a7560">reddesguace.com</text>
        <!-- Header -->
        <rect x="0" y="32" width="800" height="48" fill="#06140d"/>
        <text x="32" y="62" font-family="Archivo Black, sans-serif" font-size="18" fill="#c0dd97">RED DESGUACE</text>
        <rect x="500" y="44" width="180" height="24" rx="12" fill="#1a4a35"/>
        <text x="514" y="60" font-family="ui-sans-serif" font-size="11" fill="#a8c89a">Buscar pieza, modelo...</text>
        <rect x="704" y="44" width="64" height="24" rx="12" fill="#c0dd97"/>
        <text x="720" y="60" font-family="ui-sans-serif" font-size="11" fill="#14392a" font-weight="bold">Buscar</text>
        <!-- Hero block -->
        <text x="32" y="130" font-family="Archivo Black, sans-serif" font-size="42" fill="#fff">+176.000 piezas</text>
        <text x="32" y="160" font-family="Instrument Serif, serif" font-style="italic" font-size="28" fill="#c0dd97">en el escaparate</text>
        <!-- Filter pills -->
        <rect x="32" y="180" width="80" height="22" rx="11" fill="#1a4a35" stroke="#c0dd97" stroke-opacity="0.3"/>
        <text x="46" y="195" font-family="ui-sans-serif" font-size="10" fill="#c0dd97">Motor</text>
        <rect x="120" y="180" width="100" height="22" rx="11" fill="#1a4a35"/>
        <text x="134" y="195" font-family="ui-sans-serif" font-size="10" fill="#a8c89a">Carrocería</text>
        <rect x="228" y="180" width="90" height="22" rx="11" fill="#1a4a35"/>
        <text x="242" y="195" font-family="ui-sans-serif" font-size="10" fill="#a8c89a">Eléctrico</text>
        <!-- Parts grid -->
        <g transform="translate(32, 220)">
          ${[0,1,2,3].map(i => `
            <g transform="translate(${i*185}, 0)">
              <rect width="170" height="240" rx="10" fill="url(#rd-card)" stroke="#c0dd9722"/>
              <rect x="10" y="10" width="150" height="120" rx="6" fill="#0d2a1f"/>
              <circle cx="85" cy="70" r="32" fill="none" stroke="#c0dd9755" stroke-width="2"/>
              <rect x="10" y="142" width="120" height="10" rx="4" fill="#c0dd9744"/>
              <rect x="10" y="158" width="80" height="8" rx="4" fill="#c0dd9722"/>
              <text x="10" y="195" font-family="Archivo Black" font-size="20" fill="#F4C430">${[45,80,120,65][i]}€</text>
              <rect x="10" y="208" width="150" height="22" rx="11" fill="#F4C430"/>
              <text x="60" y="223" font-family="ui-sans-serif" font-size="10" fill="#14392a" font-weight="bold">Contactar</text>
            </g>
          `).join('')}
        </g>
      </svg>
    `,
    'medibitacora': `
      <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mockup de MediBitácora">
        <defs>
          <linearGradient id="mb-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f0f7f4"/>
            <stop offset="100%" stop-color="#e0ecea"/>
          </linearGradient>
          <linearGradient id="mb-accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1a8970"/>
            <stop offset="100%" stop-color="#0d6b56"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#mb-bg)"/>
        <!-- Phone frame -->
        <rect x="220" y="30" width="360" height="450" rx="32" fill="#1a2332" stroke="#0a1018" stroke-width="4"/>
        <rect x="232" y="42" width="336" height="426" rx="22" fill="#fff"/>
        <!-- Status bar -->
        <rect x="232" y="42" width="336" height="28" fill="#fff"/>
        <text x="248" y="60" font-family="ui-sans-serif" font-size="10" fill="#1a2332" font-weight="600">09:41</text>
        <!-- App header -->
        <rect x="232" y="70" width="336" height="80" fill="url(#mb-accent)"/>
        <text x="252" y="100" font-family="Instrument Serif, serif" font-size="22" fill="#fff" font-style="italic">MediBitácora</text>
        <text x="252" y="120" font-family="ui-sans-serif" font-size="11" fill="#a8e8d0">Tu salud, en orden</text>
        <circle cx="540" cy="110" r="20" fill="#fff" opacity="0.15"/>
        <!-- Cards -->
        <g transform="translate(252, 170)">
          <rect width="296" height="60" rx="12" fill="#f0f7f4" stroke="#1a897033" stroke-width="1"/>
          <circle cx="30" cy="30" r="14" fill="#1a8970"/>
          <text x="30" y="35" font-family="ui-sans-serif" font-size="14" fill="#fff" text-anchor="middle">+</text>
          <text x="56" y="26" font-family="ui-sans-serif" font-size="13" fill="#1a2332" font-weight="600">Próxima cita</text>
          <text x="56" y="42" font-family="ui-sans-serif" font-size="11" fill="#5a6878">Cardiología · 18 Jun</text>
        </g>
        <g transform="translate(252, 240)">
          <rect width="296" height="60" rx="12" fill="#fff" stroke="#1a897033"/>
          <circle cx="30" cy="30" r="14" fill="#F4C430"/>
          <text x="56" y="26" font-family="ui-sans-serif" font-size="13" fill="#1a2332" font-weight="600">Medicación diaria</text>
          <text x="56" y="42" font-family="ui-sans-serif" font-size="11" fill="#5a6878">3 pendientes hoy</text>
        </g>
        <g transform="translate(252, 310)">
          <rect width="296" height="60" rx="12" fill="#fff" stroke="#1a897033"/>
          <circle cx="30" cy="30" r="14" fill="#0d6b56"/>
          <text x="56" y="26" font-family="ui-sans-serif" font-size="13" fill="#1a2332" font-weight="600">Bitácora</text>
          <text x="56" y="42" font-family="ui-sans-serif" font-size="11" fill="#5a6878">12 registros este mes</text>
        </g>
        <!-- Bottom nav -->
        <rect x="252" y="400" width="296" height="50" rx="25" fill="#1a2332"/>
        <circle cx="290" cy="425" r="6" fill="#1a8970"/>
        <circle cx="340" cy="425" r="5" fill="#fff" opacity="0.4"/>
        <circle cx="400" cy="425" r="5" fill="#fff" opacity="0.4"/>
        <circle cx="460" cy="425" r="5" fill="#fff" opacity="0.4"/>
        <circle cx="510" cy="425" r="5" fill="#fff" opacity="0.4"/>
      </svg>
    `,
    'reciclacat': `
      <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mockup de ReciclaCAT">
        <defs>
          <linearGradient id="rc-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1B4332"/>
            <stop offset="100%" stop-color="#2D6A30"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#rc-bg)"/>
        <!-- Phone -->
        <rect x="240" y="40" width="320" height="420" rx="36" fill="#0a1f15" stroke="#000" stroke-width="3"/>
        <rect x="252" y="52" width="296" height="396" rx="26" fill="#1B4332"/>
        <!-- Header -->
        <text x="272" y="92" font-family="Archivo Black, sans-serif" font-size="22" fill="#fff">ReciclaCAT</text>
        <text x="272" y="110" font-family="ui-sans-serif" font-size="11" fill="#a8dc8a">Vehículo VFU-2024-0847</text>
        <!-- Progress steps -->
        <g transform="translate(272, 140)">
          <circle cx="0" cy="0" r="14" fill="#67C23A"/>
          <text x="0" y="4" font-family="ui-sans-serif" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text>
          <line x1="14" y1="0" x2="56" y2="0" stroke="#67C23A" stroke-width="2"/>
          <circle cx="70" cy="0" r="14" fill="#67C23A"/>
          <text x="70" y="4" font-family="ui-sans-serif" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text>
          <line x1="84" y1="0" x2="126" y2="0" stroke="#F4C430" stroke-width="2"/>
          <circle cx="140" cy="0" r="14" fill="#F4C430"/>
          <text x="140" y="4" font-family="ui-sans-serif" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">3</text>
          <line x1="154" y1="0" x2="196" y2="0" stroke="#3a5a48" stroke-width="2" stroke-dasharray="3 3"/>
          <circle cx="210" cy="0" r="14" fill="#2D6A30" stroke="#67C23A" stroke-opacity="0.3"/>
          <text x="210" y="4" font-family="ui-sans-serif" font-size="11" fill="#67C23A" text-anchor="middle">4</text>
        </g>
        <!-- Current step card -->
        <rect x="272" y="180" width="256" height="200" rx="12" fill="#0a2818" stroke="#67C23A33"/>
        <text x="288" y="208" font-family="ui-sans-serif" font-size="10" fill="#a8dc8a" letter-spacing="2">PASO 3</text>
        <text x="288" y="232" font-family="Instrument Serif, serif" font-style="italic" font-size="22" fill="#fff">Descontaminación</text>
        <!-- Checklist -->
        <g transform="translate(288, 252)">
          <rect width="16" height="16" rx="4" fill="#67C23A"/>
          <text x="8" y="12" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text>
          <text x="26" y="13" font-family="ui-sans-serif" font-size="12" fill="#fff">Extracción combustible</text>
        </g>
        <g transform="translate(288, 278)">
          <rect width="16" height="16" rx="4" fill="#67C23A"/>
          <text x="8" y="12" font-size="11" fill="#1B4332" text-anchor="middle" font-weight="bold">✓</text>
          <text x="26" y="13" font-family="ui-sans-serif" font-size="12" fill="#fff">Aceites motor</text>
        </g>
        <g transform="translate(288, 304)">
          <rect width="16" height="16" rx="4" fill="none" stroke="#F4C430" stroke-width="2"/>
          <text x="26" y="13" font-family="ui-sans-serif" font-size="12" fill="#F4C430">Líquido refrigerante</text>
        </g>
        <g transform="translate(288, 330)">
          <rect width="16" height="16" rx="4" fill="none" stroke="#67C23A55" stroke-width="2"/>
          <text x="26" y="13" font-family="ui-sans-serif" font-size="12" fill="#fff" opacity="0.5">Batería</text>
        </g>
        <!-- CTA -->
        <rect x="272" y="400" width="256" height="36" rx="18" fill="#F4C430"/>
        <text x="400" y="423" font-family="ui-sans-serif" font-size="13" fill="#1B4332" text-anchor="middle" font-weight="bold">Continuar →</text>
      </svg>
    `,
    'boqueron-books': `
      <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mockup de El Boquerón Books">
        <defs>
          <linearGradient id="bb-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0a1828"/>
            <stop offset="100%" stop-color="#1a2842"/>
          </linearGradient>
          <radialGradient id="bb-glow" cx="0.5" cy="0">
            <stop offset="0%" stop-color="#d4a017" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#d4a017" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#bb-bg)"/>
        <rect width="800" height="300" fill="url(#bb-glow)"/>
        <!-- Browser -->
        <rect x="0" y="0" width="800" height="32" fill="#050d18"/>
        <circle cx="18" cy="16" r="4" fill="#ff5f57"/>
        <circle cx="34" cy="16" r="4" fill="#febc2e"/>
        <circle cx="50" cy="16" r="4" fill="#28c940"/>
        <rect x="80" y="8" width="640" height="16" rx="8" fill="#0a1828"/>
        <text x="100" y="20" font-family="ui-monospace" font-size="10" fill="#3a5070">elboqueronbooks.com</text>
        <!-- Header -->
        <text x="50" y="80" font-family="Instrument Serif, serif" font-style="italic" font-size="42" fill="#d4a017">El Boquerón</text>
        <text x="50" y="110" font-family="Archivo Black, sans-serif" font-size="18" fill="#fff" letter-spacing="2">— BOOKS —</text>
        <line x1="50" y1="125" x2="750" y2="125" stroke="#d4a01744" stroke-width="1"/>
        <!-- Books grid -->
        <g transform="translate(50, 160)">
          ${[0,1,2,3,4].map(i => {
            const colors = ['#1a2842', '#2a1830', '#1a3042', '#2a2818', '#181a3a'];
            const titles = ['ChatGPT para\\nGerentes', 'La Ventaja\\nInvisible', 'Sana Tu\\nCuerpo', 'NO ME PASA\\nNADA', 'Próximamente'];
            return `
              <g transform="translate(${i*145}, 0)">
                <rect width="130" height="190" rx="4" fill="${colors[i]}" stroke="#d4a01755"/>
                <rect x="8" y="8" width="114" height="174" rx="2" fill="none" stroke="#d4a01733"/>
                <text x="65" y="60" font-family="Instrument Serif, serif" font-style="italic" font-size="11" fill="#d4a017" text-anchor="middle">El Boquerón</text>
                <line x1="40" y1="70" x2="90" y2="70" stroke="#d4a017" stroke-width="0.5"/>
                <text x="65" y="105" font-family="Archivo Black, sans-serif" font-size="9" fill="#fff" text-anchor="middle">
                  <tspan x="65" dy="0">${titles[i].split('\\n')[0]}</tspan>
                  <tspan x="65" dy="12">${titles[i].split('\\n')[1] || ''}</tspan>
                </text>
                <text x="65" y="170" font-family="ui-sans-serif" font-size="7" fill="#d4a01799" text-anchor="middle">G. MOLINA</text>
              </g>
            `;
          }).join('')}
        </g>
        <!-- Footer info -->
        <text x="50" y="430" font-family="ui-monospace" font-size="10" fill="#5a6878" letter-spacing="2">CATÁLOGO 2026 · IMPRINT DIGITAL</text>
        <rect x="50" y="445" width="120" height="32" rx="16" fill="#d4a017"/>
        <text x="110" y="465" font-family="ui-sans-serif" font-size="12" fill="#0a1828" text-anchor="middle" font-weight="bold">Ver todos →</text>
      </svg>
    `,
    'gestor-financiero': `
      <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mockup Gestor Financiero">
        <defs>
          <linearGradient id="gf-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0a0e1a"/>
            <stop offset="100%" stop-color="#141b2d"/>
          </linearGradient>
          <linearGradient id="gf-chart" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#F4C430" stop-opacity="0"/>
            <stop offset="100%" stop-color="#F4C430" stop-opacity="0.4"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#gf-bg)"/>
        <rect x="0" y="0" width="800" height="40" fill="#070b14"/>
        <circle cx="20" cy="20" r="5" fill="#F4C430"/>
        <text x="36" y="25" font-family="Archivo Black" font-size="13" fill="#fff">FINANCIERO IA</text>
        <!-- Stats -->
        <g transform="translate(40, 70)">
          <rect width="220" height="100" rx="12" fill="#1a2138" stroke="#2a324a"/>
          <text x="20" y="32" font-family="ui-monospace" font-size="10" fill="#7a829a" letter-spacing="2">INGRESOS MES</text>
          <text x="20" y="68" font-family="Archivo Black" font-size="28" fill="#fff">€48.230</text>
          <text x="20" y="86" font-family="ui-sans-serif" font-size="11" fill="#67C23A">↑ 12.4% vs anterior</text>
        </g>
        <g transform="translate(280, 70)">
          <rect width="220" height="100" rx="12" fill="#1a2138" stroke="#2a324a"/>
          <text x="20" y="32" font-family="ui-monospace" font-size="10" fill="#7a829a" letter-spacing="2">GASTOS MES</text>
          <text x="20" y="68" font-family="Archivo Black" font-size="28" fill="#fff">€21.870</text>
          <text x="20" y="86" font-family="ui-sans-serif" font-size="11" fill="#F4C430">↓ 3.2% vs anterior</text>
        </g>
        <g transform="translate(520, 70)">
          <rect width="240" height="100" rx="12" fill="#1a2138" stroke="#F4C43055"/>
          <text x="20" y="32" font-family="ui-monospace" font-size="10" fill="#F4C430" letter-spacing="2">★ PREVISIÓN IA</text>
          <text x="20" y="68" font-family="Archivo Black" font-size="28" fill="#F4C430">€52.100</text>
          <text x="20" y="86" font-family="ui-sans-serif" font-size="11" fill="#fff">Próximo mes · 94% conf.</text>
        </g>
        <!-- Chart -->
        <g transform="translate(40, 200)">
          <rect width="720" height="260" rx="12" fill="#1a2138" stroke="#2a324a"/>
          <text x="20" y="35" font-family="Archivo Black" font-size="14" fill="#fff">Evolución últimos 12 meses</text>
          <text x="20" y="52" font-family="ui-sans-serif" font-size="10" fill="#7a829a">Ingresos vs gastos · predicción Q4</text>
          <!-- Grid -->
          ${[0,1,2,3,4].map(i => `<line x1="40" y1="${80 + i*40}" x2="700" y2="${80 + i*40}" stroke="#2a324a" stroke-width="0.5" stroke-dasharray="2 2"/>`).join('')}
          <!-- Area chart -->
          <path d="M 40 200 L 100 180 L 160 170 L 220 150 L 280 160 L 340 130 L 400 140 L 460 110 L 520 120 L 580 90 L 640 100 L 700 80 L 700 240 L 40 240 Z" fill="url(#gf-chart)"/>
          <path d="M 40 200 L 100 180 L 160 170 L 220 150 L 280 160 L 340 130 L 400 140 L 460 110 L 520 120 L 580 90 L 640 100 L 700 80" stroke="#F4C430" stroke-width="2.5" fill="none"/>
          <!-- Forecast dashed -->
          <path d="M 580 90 L 640 100 L 700 80" stroke="#F4C430" stroke-width="2.5" fill="none" stroke-dasharray="4 3" opacity="0.6"/>
          <!-- Dots -->
          ${[100,160,220,280,340,400,460,520,580,640,700].map((x, idx) => {
            const ys = [180,170,150,160,130,140,110,120,90,100,80];
            return `<circle cx="${x}" cy="${ys[idx]}" r="3" fill="#F4C430"/>`;
          }).join('')}
        </g>
      </svg>
    `,
    'aad-evfu': `
      <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mockup AAD E-VFU">
        <defs>
          <linearGradient id="aad-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0c1e36"/>
            <stop offset="100%" stop-color="#1a3258"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#aad-bg)"/>
        <!-- Header -->
        <rect x="0" y="0" width="800" height="56" fill="#06142a"/>
        <text x="32" y="34" font-family="Archivo Black" font-size="16" fill="#fff">AAD · E-VFU</text>
        <text x="32" y="48" font-family="ui-monospace" font-size="9" fill="#6a8aba" letter-spacing="2">SISTEMA DE GESTIÓN VEHÍCULOS FIN DE VIDA</text>
        <circle cx="760" cy="28" r="14" fill="#1a3258"/>
        <text x="760" y="33" font-family="ui-sans-serif" font-size="11" fill="#F4C430" text-anchor="middle" font-weight="bold">G</text>
        <!-- Sidebar -->
        <rect x="0" y="56" width="180" height="444" fill="#0a1a30"/>
        ${['Dashboard', 'Vehículos', 'Trazabilidad', 'Certificados', 'Informes', 'Socios'].map((item, i) => `
          <g transform="translate(0, ${72 + i*44})">
            <rect width="180" height="36" fill="${i === 1 ? '#F4C43011' : 'transparent'}"/>
            ${i === 1 ? '<rect width="3" height="36" fill="#F4C430"/>' : ''}
            <text x="20" y="22" font-family="ui-sans-serif" font-size="12" fill="${i === 1 ? '#F4C430' : '#8aa5c5'}">${item}</text>
          </g>
        `).join('')}
        <!-- Main content -->
        <text x="210" y="100" font-family="Instrument Serif, serif" font-style="italic" font-size="28" fill="#fff">Registro de vehículos</text>
        <text x="210" y="120" font-family="ui-sans-serif" font-size="12" fill="#8aa5c5">847 vehículos procesados este mes</text>
        <!-- Table header -->
        <rect x="210" y="140" width="560" height="36" fill="#0a1a30" rx="6"/>
        <text x="226" y="162" font-family="ui-monospace" font-size="10" fill="#6a8aba" letter-spacing="1">BASTIDOR</text>
        <text x="370" y="162" font-family="ui-monospace" font-size="10" fill="#6a8aba" letter-spacing="1">MARCA</text>
        <text x="490" y="162" font-family="ui-monospace" font-size="10" fill="#6a8aba" letter-spacing="1">FECHA</text>
        <text x="600" y="162" font-family="ui-monospace" font-size="10" fill="#6a8aba" letter-spacing="1">ESTADO</text>
        <!-- Rows -->
        ${[
          ['WVWZZZ1KZ8W...', 'Volkswagen', '08/06/26', 'PROCESADO', '#67C23A'],
          ['VF7CB9HW0CW...', 'Citroën',     '07/06/26', 'EN CURSO',   '#F4C430'],
          ['WBA3A510X0F...', 'BMW',         '07/06/26', 'PROCESADO', '#67C23A'],
          ['VF1FBA1B5E5...', 'Renault',     '06/06/26', 'PROCESADO', '#67C23A'],
          ['JTDBJ20E6B3...', 'Toyota',      '06/06/26', 'PENDIENTE', '#8aa5c5'],
          ['WAUZZZF20H...', 'Audi',         '05/06/26', 'PROCESADO', '#67C23A'],
        ].map((row, i) => `
          <g transform="translate(0, ${190 + i*44})">
            <line x1="210" y1="0" x2="770" y2="0" stroke="#1a3258"/>
            <text x="226" y="24" font-family="ui-monospace" font-size="11" fill="#fff">${row[0]}</text>
            <text x="370" y="24" font-family="ui-sans-serif" font-size="11" fill="#fff">${row[1]}</text>
            <text x="490" y="24" font-family="ui-sans-serif" font-size="11" fill="#8aa5c5">${row[2]}</text>
            <rect x="600" y="10" width="90" height="20" rx="10" fill="${row[4]}22" stroke="${row[4]}55"/>
            <text x="645" y="23" font-family="ui-sans-serif" font-size="9" fill="${row[4]}" text-anchor="middle" letter-spacing="0.5">${row[3]}</text>
          </g>
        `).join('')}
      </svg>
    `,
    'escaparates': `
      <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mockup escaparates estáticos">
        <defs>
          <linearGradient id="esc-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1a2a1a"/>
            <stop offset="100%" stop-color="#0d1d0d"/>
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#esc-bg)"/>
        <!-- Browser -->
        <rect x="0" y="0" width="800" height="32" fill="#0a140a"/>
        <circle cx="18" cy="16" r="4" fill="#ff5f57"/>
        <circle cx="34" cy="16" r="4" fill="#febc2e"/>
        <circle cx="50" cy="16" r="4" fill="#28c940"/>
        <rect x="80" y="8" width="640" height="16" rx="8" fill="#0a1a0a"/>
        <text x="100" y="20" font-family="ui-monospace" font-size="10" fill="#5a7a5a">desguacessoliva.com</text>
        <!-- Header -->
        <text x="32" y="80" font-family="Archivo Black" font-size="28" fill="#fff">Desguaces Soliva</text>
        <text x="32" y="100" font-family="ui-sans-serif" font-size="12" fill="#a8c89a">Catálogo · 12.450 piezas disponibles</text>
        <!-- Search -->
        <rect x="32" y="120" width="500" height="44" rx="22" fill="#0d1d0d" stroke="#67C23A33"/>
        <circle cx="56" cy="142" r="8" fill="none" stroke="#67C23A" stroke-width="2"/>
        <line x1="62" y1="148" x2="68" y2="154" stroke="#67C23A" stroke-width="2"/>
        <text x="80" y="146" font-family="ui-sans-serif" font-size="13" fill="#a8c89a">Buscar pieza, marca, modelo...</text>
        <rect x="540" y="120" width="120" height="44" rx="22" fill="#67C23A"/>
        <text x="600" y="146" font-family="ui-sans-serif" font-size="13" fill="#0d1d0d" text-anchor="middle" font-weight="bold">Buscar</text>
        <!-- Grid -->
        <g transform="translate(32, 190)">
          ${[
            ['Motor 1.6 HDI', 'Peugeot 308', '850€'],
            ['Caja de cambios', 'Renault Mégane', '420€'],
            ['Puerta del.', 'Seat León', '180€'],
            ['Alternador', 'Ford Focus', '95€'],
          ].map((p, i) => `
            <g transform="translate(${i*190}, 0)">
              <rect width="175" height="240" rx="10" fill="#0d1d0d" stroke="#67C23A22"/>
              <rect x="10" y="10" width="155" height="120" rx="6" fill="#1a2a1a"/>
              <circle cx="87" cy="70" r="32" fill="none" stroke="#67C23A44" stroke-width="2"/>
              <rect x="92" y="55" width="40" height="30" rx="4" fill="#67C23A22"/>
              <text x="10" y="155" font-family="ui-sans-serif" font-size="13" fill="#fff" font-weight="600">${p[0]}</text>
              <text x="10" y="172" font-family="ui-sans-serif" font-size="11" fill="#a8c89a">${p[1]}</text>
              <text x="10" y="208" font-family="Archivo Black" font-size="20" fill="#F4C430">${p[2]}</text>
              <rect x="10" y="218" width="60" height="14" rx="7" fill="#67C23A22"/>
              <text x="40" y="228" font-family="ui-sans-serif" font-size="8" fill="#67C23A" text-anchor="middle">DISPONIBLE</text>
            </g>
          `).join('')}
        </g>
      </svg>
    `,
  };

  // Inyectar mockups
  document.querySelectorAll('[data-mockup-content]').forEach(frame => {
    const key = frame.getAttribute('data-mockup-content');
    if (mockups[key]) {
      frame.innerHTML = mockups[key];
    }
  });

  // ----------------------------------------------------
  // Formulario de contacto
  // ----------------------------------------------------
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Validación básica
      if (!data.nombre || !data.email || !data.mensaje) {
        showFeedback('Por favor, completa los campos obligatorios.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showFeedback('El email no parece válido.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<svg class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" opacity="0.25"/><path d="M22 12a10 10 0 01-10 10" stroke-linecap="round"/></svg> Enviando...';

      try {
        // Endpoint configurable.
        // OPCIÓN 1 (recomendada): Cloudflare Worker en /api/contact que reenvía a Resend, Postmark o Telegram.
        // OPCIÓN 2: servicio tipo Formspree, Web3Forms o Basin (rellena la URL aquí).
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          showFeedback('¡Gracias! Hemos recibido tu mensaje. Te responderemos en menos de 24 horas.', 'success');
          form.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (err) {
        // Fallback: abrir cliente de correo
        const subject = encodeURIComponent(`Consulta web · ${data.nombre}`);
        const body = encodeURIComponent(
          `Nombre: ${data.nombre}\n` +
          `Empresa: ${data.empresa || '-'}\n` +
          `Email: ${data.email}\n` +
          `Teléfono: ${data.telefono || '-'}\n\n` +
          `Mensaje:\n${data.mensaje}`
        );
        window.location.href = `mailto:hola@limonadaweb.com?subject=${subject}&body=${body}`;
        showFeedback('Abriendo tu cliente de correo... Si no se abre, escríbenos directamente a hola@limonadaweb.com', 'info');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  function showFeedback(message, type) {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.className = 'mt-6 p-4 rounded-2xl text-sm';
    if (type === 'success') {
      feedback.classList.add('bg-leaf/15', 'border', 'border-leaf/30', 'text-leaf-soft');
    } else if (type === 'error') {
      feedback.classList.add('bg-red-500/15', 'border', 'border-red-500/30', 'text-red-300');
    } else {
      feedback.classList.add('bg-lemon/10', 'border', 'border-lemon/30', 'text-lemon');
    }
    feedback.classList.remove('hidden');
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ----------------------------------------------------
  // Parallax suave en el hero (opcional, respetuoso con reduced-motion)
  // ----------------------------------------------------
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const aurora = document.querySelector('.aurora');
    if (aurora) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < 800) {
          aurora.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
      }, { passive: true });
    }
  }

})();
