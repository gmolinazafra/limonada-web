# Limonada Web — Sitio corporativo

> Exprimimos internet para tu negocio.

Sitio estático multipropósito de la agencia **Limonada Web** (Málaga). Construido con HTML5 + Tailwind CSS compilado + JavaScript vanilla. Sin frameworks pesados, sin dependencias innecesarias, optimizado para Cloudflare Pages.

---

## Stack

- **HTML5** semántico y accesible (landmarks, ARIA, contraste AA+)
- **Tailwind CSS v3** compilado vía CLI (purge automático, ~12 KB final minificado)
- **JavaScript vanilla** (sin frameworks, sin libs)
- **Google Fonts**: Instrument Serif + Bricolage Grotesque + Archivo Black + JetBrains Mono
- **Mockups SVG inline** generados dinámicamente por proyecto
- **Schema.org JSON-LD** (ProfessionalService)
- **Open Graph + Twitter Cards** completos

---

## Estructura

```
limonada-web/
├── index.html              ← Único HTML (one-page)
├── favicon.svg             ← Limón vectorial
├── robots.txt
├── sitemap.xml
├── _headers                ← Cloudflare: cache + security headers
├── _redirects              ← Cloudflare: www → apex
├── package.json
├── tailwind.config.js
├── .gitignore
├── README.md
│
├── src/
│   └── styles.css          ← Input Tailwind + componentes custom
│
├── assets/
│   ├── styles.css          ← OUTPUT generado por build (gitignorable opcional)
│   └── main.js             ← JS principal con mockups e interactividad
│
└── images/
    ├── logo-limonadaweb.png
    ├── logo-limonadaweb-circle.png
    └── og-image.png        ← Pendiente: 1200x630 para redes
```

---

## Desarrollo local

```powershell
# Instalar dependencias (solo la primera vez)
npm install

# Modo dev: Tailwind escucha cambios
npm run dev

# Abre index.html con cualquier servidor estático.
# Por ejemplo, en otra terminal:
npx serve .
# o simplemente abrir index.html con Live Server de VS Code.
```

## Build de producción

```powershell
npm run build
```

Esto genera `assets/styles.css` minificado.

---

## Despliegue en Cloudflare Pages (vía GitHub)

### 1. Subir a GitHub

```powershell
cd C:\proyectos\limonada-web
git init
git add .
git commit -m "feat: web inicial Limonada Web"
git branch -M main
git remote add origin https://github.com/gmolinazafra/limonada-web.git
git push -u origin main
```

### 2. Conectar Cloudflare Pages

1. Entra en https://dash.cloudflare.com → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
2. Autoriza GitHub y selecciona el repo `limonada-web`
3. Configuración del build:

   | Campo | Valor |
   |---|---|
   | Framework preset | **None** |
   | Build command | `npm run build` |
   | Build output directory | `/` *(raíz)* |
   | Root directory | *(vacío)* |
   | Environment variables | *(ninguna)* |
   | Node version | `20` *(variable `NODE_VERSION=20`)* |

4. **Save and Deploy**. En ~30 segundos estará en producción en `limonada-web.pages.dev`.

### 3. Conectar el dominio `limonadaweb.com`

1. En el proyecto de Pages: **Custom domains** → **Set up a custom domain** → `limonadaweb.com`
2. Cloudflare creará automáticamente el registro CNAME si el DNS está en Cloudflare. Si no, te indicará qué añadir en tu registrador.
3. Repite para `www.limonadaweb.com` (el `_redirects` la mandará al apex con 301).

---

## Formulario de contacto — endpoint

El formulario hace `POST` a `/api/contact`. Hay varias formas de implementarlo:

### Opción A · Cloudflare Worker (recomendada, gratis hasta 100k requests/día)

Crear un Worker que reenvíe vía **Resend** o **Postmark**:

```javascript
// worker.js (en otro repo o como Pages Function)
export async function onRequestPost(context) {
  const data = await context.request.json();

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Limonada Web <web@limonadaweb.com>',
      to: 'hola@limonadaweb.com',
      subject: `Nuevo contacto · ${data.nombre}`,
      html: `<p><b>De:</b> ${data.nombre} (${data.email})</p>
             <p><b>Empresa:</b> ${data.empresa || '-'}</p>
             <p><b>Teléfono:</b> ${data.telefono || '-'}</p>
             <p><b>Mensaje:</b><br>${data.mensaje}</p>`,
    }),
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

Lo metes como **Pages Functions** en `functions/api/contact.js` y se despliega automáticamente con el resto.

### Opción B · Servicio externo

Sustituir la URL en `assets/main.js` línea con `fetch('/api/contact', ...)` por uno de:

- **Formspree** → `https://formspree.io/f/XXXXXX`
- **Web3Forms** → `https://api.web3forms.com/submit` *(gratis, sin login)*
- **Basin** → `https://usebasin.com/f/XXXXXX`

### Opción C · Fallback `mailto:`

Si el endpoint falla, el formulario abre automáticamente el cliente de correo del usuario con todos los datos rellenados. **Funciona desde el minuto cero sin configurar nada.**

---

## Personalización rápida

### Cambiar textos
Todo el copy está en `index.html`. Buscar el bloque, editar, `git push` → desplegado.

### Cambiar mockups del portfolio
Los mockups SVG están en `assets/main.js` dentro del objeto `mockups`. Cada uno es independiente. Cuando tengas capturas reales:

1. Guardarlas en `images/proyectos/`
2. En `index.html`, sustituir cada `<div class="mockup-frame" data-mockup-content="...">` por:
   ```html
   <div class="mockup-frame">
     <img src="/images/proyectos/red-desguace.webp" alt="Red Desguace" loading="lazy" class="w-full h-full object-cover">
   </div>
   ```
3. Eliminar el objeto `mockups` en `main.js` (ya no se usa).

### Cambiar colores
En `tailwind.config.js` → `theme.extend.colors`. Y luego `npm run build`.

---

## Performance · Lighthouse esperado

| Métrica | Target |
|---|---|
| Performance | 99–100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

- LCP < 1.5s en 4G
- CLS < 0.05
- CSS final ~12 KB minificado
- JS final ~10 KB sin minificar (los SVGs van inline)
- Sin dependencias externas más allá de Google Fonts (con preconnect + display=swap)

---

## Licencia

© 2026 Limonada Web. Todos los derechos reservados.
