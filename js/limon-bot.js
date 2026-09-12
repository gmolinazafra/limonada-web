/* ============================================================================
   Limonada Web · Limón Bot · Widget con motor conversacional propio
   Sin IA externa, sin backend, sin coste. Todo ocurre en el navegador.
   Uso: <script src="/js/limon-bot.js" defer></script> antes de </body>
   Requiere: /images/limon-bot.png y /images/limon-bot-mini.png
   ============================================================================ */
(function () {
  "use strict";
  if (window.__limonBot) return;
  window.__limonBot = true;

  var CFG = {
    img: "/images/limon-bot.png",
    imgMini: "/images/limon-bot-mini.png",
    name: "Limón",
    whatsapp: "34628482475",
    email: "hola@limonadaweb.com",
    storageKey: "lw_limon_v2",
    nudge: "¿Hablamos de tu proyecto?",
    nudgeDelay: 7000
  };

  /* ================================================================ CSS */
  var css = "\
:root{--lb-yellow:#FFD21E;--lb-green:#33B34A;--lb-green-deep:#1F8F35;--lb-ink:#0E2A15;--lb-paper:#FFFFFF;--lb-mist:#F4F6EF;--lb-line:#E3E8DC;--lb-shadow:0 18px 50px rgba(14,42,21,.18)}\
#lb-root{position:fixed;right:20px;bottom:18px;z-index:2147483000;font-family:inherit;color:var(--lb-ink);-webkit-font-smoothing:antialiased}\
#lb-launch{position:relative;width:118px;height:118px;border:0;padding:0;margin:0;background:none;cursor:pointer;outline:none;display:block}\
#lb-launch img{width:100%;height:100%;object-fit:contain;display:block;filter:drop-shadow(0 12px 18px rgba(14,42,21,.28));animation:lb-float 3.6s ease-in-out infinite;transition:transform .25s ease}\
#lb-launch:hover img{transform:scale(1.06) rotate(-3deg)}\
#lb-launch:focus-visible img{outline:3px solid var(--lb-green);outline-offset:6px;border-radius:50%}\
@keyframes lb-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}\
#lb-nudge{position:absolute;right:104px;bottom:74px;background:var(--lb-paper);border:2px solid var(--lb-green);border-radius:16px 16px 4px 16px;padding:9px 13px;font-size:14px;font-weight:600;white-space:nowrap;box-shadow:0 8px 24px rgba(14,42,21,.14);opacity:0;transform:translateY(6px) scale(.96);transition:opacity .3s,transform .3s;pointer-events:none}\
#lb-nudge.on{opacity:1;transform:none}\
#lb-panel{position:absolute;right:0;bottom:0;width:390px;max-width:calc(100vw - 20px);height:620px;max-height:calc(100vh - 40px);max-height:calc(100dvh - 40px);background:var(--lb-paper);border-radius:22px;box-shadow:var(--lb-shadow);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(16px) scale(.97);transform-origin:bottom right;pointer-events:none;transition:opacity .22s ease,transform .22s ease}\
#lb-root.open #lb-panel{opacity:1;transform:none;pointer-events:auto}\
#lb-root.open #lb-launch,#lb-root.open #lb-nudge{display:none}\
#lb-head{display:flex;align-items:center;gap:12px;padding:14px 14px 12px 16px;background:linear-gradient(135deg,var(--lb-yellow) 0%,#FFE270 100%);border-bottom:1px solid rgba(14,42,21,.08)}\
#lb-head img{width:44px;height:44px;object-fit:contain;filter:drop-shadow(0 3px 5px rgba(14,42,21,.25))}\
#lb-head .lb-t{flex:1;min-width:0;line-height:1.15}\
#lb-head .lb-t b{display:block;font-size:16px;font-weight:700}\
#lb-head .lb-t span{display:block;font-size:12px;opacity:.75;margin-top:2px}\
#lb-head .lb-t span::before{content:\"\";display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--lb-green);margin-right:6px;vertical-align:1px}\
#lb-head button{width:34px;height:34px;border:0;border-radius:10px;background:rgba(14,42,21,.08);color:var(--lb-ink);cursor:pointer;display:grid;place-items:center;transition:background .15s}\
#lb-head button:hover{background:rgba(14,42,21,.16)}\
#lb-head button svg{width:18px;height:18px}\
#lb-log{flex:1;overflow-y:auto;padding:18px 16px 8px;background:var(--lb-mist);overscroll-behavior:contain}\
.lb-msg{display:flex;gap:9px;margin:0 0 14px}\
.lb-msg.bot{align-items:flex-start}\
.lb-msg.bot .lb-av{width:28px;height:28px;flex:0 0 28px;object-fit:contain;margin-top:2px}\
.lb-msg .lb-b{font-size:14.5px;line-height:1.5;padding:10px 13px;border-radius:16px;max-width:82%;overflow-wrap:anywhere;white-space:pre-wrap}\
.lb-msg.bot .lb-b{background:var(--lb-paper);border:1px solid var(--lb-line);border-top-left-radius:6px}\
.lb-msg.user{justify-content:flex-end}\
.lb-msg.user .lb-b{background:var(--lb-yellow);border-bottom-right-radius:6px;font-weight:500}\
.lb-msg .lb-b a{color:var(--lb-green-deep);font-weight:600;text-decoration:underline;text-underline-offset:2px}\
.lb-chips{display:flex;flex-wrap:wrap;gap:8px;margin:-6px 0 14px 37px}\
.lb-chip{border:1.5px solid var(--lb-green);background:var(--lb-paper);color:var(--lb-green-deep);border-radius:999px;padding:7px 13px;font-size:13.5px;font-weight:600;cursor:pointer;transition:background .15s,color .15s,transform .15s;font-family:inherit;text-decoration:none}\
.lb-chip:hover{background:var(--lb-green);color:#fff;transform:translateY(-1px)}\
.lb-chip.wa{background:var(--lb-green);color:#fff}\
.lb-chip.wa:hover{background:var(--lb-green-deep);border-color:var(--lb-green-deep)}\
.lb-chip svg{width:15px;height:15px;vertical-align:-3px;margin-right:5px}\
.lb-typing{display:inline-flex;gap:4px;align-items:center;padding:4px 2px}\
.lb-typing i{width:7px;height:7px;border-radius:50%;background:var(--lb-green);animation:lb-dot 1.1s infinite ease-in-out}\
.lb-typing i:nth-child(2){animation-delay:.15s}.lb-typing i:nth-child(3){animation-delay:.3s}\
@keyframes lb-dot{0%,80%,100%{transform:translateY(0);opacity:.45}40%{transform:translateY(-4px);opacity:1}}\
#lb-form{display:flex;align-items:flex-end;gap:8px;padding:10px 12px 12px;background:var(--lb-paper);border-top:1px solid var(--lb-line)}\
#lb-in{flex:1;resize:none;border:1.5px solid var(--lb-line);border-radius:14px;padding:10px 13px;font:inherit;font-size:15px;line-height:1.4;max-height:120px;background:var(--lb-mist);color:var(--lb-ink);outline:none;transition:border-color .15s}\
#lb-in:focus{border-color:var(--lb-green);background:#fff}\
#lb-send{width:42px;height:42px;flex:0 0 42px;border:0;border-radius:13px;background:var(--lb-ink);color:var(--lb-yellow);cursor:pointer;display:grid;place-items:center;transition:transform .15s,opacity .15s}\
#lb-send:hover{transform:scale(1.05)}#lb-send:disabled{opacity:.4;cursor:default;transform:none}\
#lb-send svg{width:20px;height:20px}\
#lb-foot{font-size:11px;text-align:center;color:rgba(14,42,21,.5);padding:0 12px 9px;background:var(--lb-paper)}\
#lb-foot a{color:inherit;text-decoration:underline}\
@media (max-width:520px){#lb-root{right:12px;bottom:12px}#lb-launch{width:96px;height:96px}#lb-nudge{right:86px;bottom:60px}#lb-root.open{inset:0}#lb-panel{width:100vw;max-width:100vw;height:100%;max-height:100%;border-radius:0}}\
@media (prefers-reduced-motion:reduce){#lb-launch img,.lb-typing i{animation:none}#lb-panel,#lb-nudge{transition:none}}\
";
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ================================================================ Utilidades */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9ñ€@.+\s]/g, " ").replace(/\s+/g, " ").trim(); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function has(t, words) { for (var i = 0; i < words.length; i++) { if (new RegExp("(^|\\s)" + words[i] + "(s|es)?(\\s|$)").test(t)) return true; } return false; }
  function chips() { return Array.prototype.slice.call(arguments); }

  /* ================================================================ Conocimiento */
  var SECTORS = [
    { id: "hosteleria", label: "hostelería", words: ["restaurante", "bar", "cafeteria", "hosteleria", "pizzeria", "chiringuito", "taperia", "cerveceria", "heladeria", "pasteleria", "panaderia", "comida", "cocina", "gastrobar", "pub", "bodega", "catering"], demo: "carta" },
    { id: "belleza", label: "belleza", words: ["peluqueria", "barberia", "barbero", "estetica", "uñas", "spa", "masaje", "salon", "belleza", "tatuaje", "tattoo", "manicura", "depilacion"], demo: "reservas" },
    { id: "salud", label: "salud", words: ["clinica", "dentista", "dental", "fisio", "fisioterapia", "veterinario", "veterinaria", "psicologo", "psicologa", "medico", "medica", "nutricionista", "podologo", "optica", "farmacia", "osteopata", "consulta"], demo: "reservas" },
    { id: "taller", label: "automoción", words: ["taller", "mecanico", "mecanica", "neumatico", "itv", "chapa", "concesionario", "electromecanica", "grua", "lavadero", "detailing", "coches"], demo: "mcmotor" },
    { id: "desguace", label: "desguace / CAT", words: ["desguace", "cat", "reciclaje", "chatarra", "recambio", "despiece", "vfu", "descontaminacion"], demo: "reciclacat" },
    { id: "despacho", label: "servicios profesionales", words: ["abogado", "abogada", "asesoria", "gestoria", "consultoria", "consultor", "despacho", "arquitecto", "ingeniero", "seguros", "correduria", "fincas"], demo: "web" },
    { id: "inmobiliaria", label: "inmobiliaria", words: ["inmobiliaria", "pisos", "viviendas", "alquiler", "casas", "promotora"], demo: "web" },
    { id: "comercio", label: "comercio", words: ["tienda", "comercio", "ropa", "zapateria", "boutique", "ferreteria", "joyeria", "floristeria", "libreria", "supermercado"], demo: "tienda" },
    { id: "oficios", label: "oficios", words: ["fontanero", "electricista", "reforma", "construccion", "pintor", "carpintero", "cerrajero", "albañil", "climatizacion", "piscina", "jardineria", "mudanza", "limpieza"], demo: "web" },
    { id: "deporte", label: "deporte", words: ["gimnasio", "entrenador", "yoga", "pilates", "crossfit", "padel", "deporte", "fitness"], demo: "reservas" },
    { id: "formacion", label: "formación", words: ["academia", "formacion", "autoescuela", "escuela", "colegio", "profesor", "clases", "cursos"], demo: "web" },
    { id: "alojamiento", label: "alojamiento", words: ["hotel", "apartamento", "alojamiento", "hostal", "camping", "turismo", "turistico"], demo: "reservas" },
    { id: "parking", label: "parking", words: ["parking", "aparcamiento", "garaje"], demo: "rgpd" },
    { id: "loteria", label: "administración de lotería", words: ["loteria", "quiniela"], demo: "rgpd" },
    { id: "transporte", label: "transporte", words: ["transporte", "logistica", "camion", "reparto", "mensajeria", "taxi", "vtc"], demo: "app" },
    { id: "agro", label: "agricultura", words: ["agricultura", "finca", "aguacate", "mango", "agricola", "cooperativa"], demo: "app" },
    { id: "creativo", label: "creativos", words: ["fotografo", "fotografia", "artista", "artesano", "musico", "diseñador"], demo: "web" },
    { id: "ong", label: "asociación", words: ["asociacion", "ong", "fundacion", "hermandad", "cofradia"], demo: "web" }
  ];

  var PROJECTS = {
    carta: "un restaurante puede tener una **carta digital por QR con pedidos directos**, sin comisiones de plataformas. Está publicada: limonadaweb.com/demos/carta-digital/",
    reservas: "tenemos una **app de reservas** funcionando con citas online, equipo, productos y panel de administración: limonadaweb.com/demos/victormonio/",
    mcmotor: "hicimos la web de **MC Motor Premium**, un taller de Málaga, con cita directa y WhatsApp: mcmotorpremium.com",
    reciclacat: "**ReciclaCAT_Gest** es un software de gestión completo para desguaces y CAT (ventas, almacén, kilos para la memoria, catálogo, GLS, Stripe, Contasimple) y **Red Desguace** el marketplace de recambios: reddesguace.com",
    web: "puedes ver webs reales en producción como holaitvmalaga.com o mcmotorpremium.com: claras, rápidas y pensadas para que el cliente contacte",
    tienda: "podemos hacer desde un catálogo online sencillo hasta una tienda con pagos por Stripe, según lo que necesites vender",
    rgpd: "hemos hecho implantaciones RGPD en negocios parecidos: Parking Costa Golf y Loterías La Suerte del Sur",
    app: "hemos construido plataformas como Red Desguace (marketplace con 176.000 piezas gestionadas) o ReciclaCAT (SaaS de gestión), así que operaciones complejas no nos asustan"
  };

  var INTENTS = [
    { id: "saludo", w: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "hey", "ey", "que tal", "hello", "hi"] },
    { id: "despedida", w: ["adios", "hasta luego", "chao", "nos vemos", "bye", "me voy"] },
    { id: "gracias", w: ["gracias", "thanks", "muchas gracias"] },
    { id: "si", w: ["si", "claro", "vale", "ok", "okey", "perfecto", "genial", "por supuesto", "eso es", "correcto", "exacto", "venga", "adelante", "me interesa", "preparalo"] },
    { id: "no", w: ["no", "nop", "nada", "todavia no", "aun no", "ninguna", "ninguno", "tampoco", "dudas"] },
    { id: "web", w: ["web", "pagina", "sitio", "landing", "presencia online", "dominio", "wordpress", "blog", "portfolio"] },
    { id: "tienda", w: ["tienda online", "ecommerce", "e-commerce", "vender online", "carrito", "shopify", "woocommerce", "prestashop"] },
    { id: "app", w: ["app", "aplicacion", "software", "programa", "plataforma", "panel", "gestion", "erp", "crm", "saas", "marketplace", "intranet", "excel"] },
    { id: "automatizar", w: ["automatizar", "automatizacion", "automatico", "integrar", "integracion", "api", "sincronizar", "stock", "conectar", "flujo", "zapier", "make"] },
    { id: "ia", w: ["ia", "inteligencia artificial", "chatbot", "bot", "asistente", "chatgpt", "gpt"] },
    { id: "rgpd", w: ["rgpd", "lopd", "proteccion de datos", "aepd", "datos personales", "privacidad", "cookies", "aviso legal", "inspeccion", "sancion", "multa"] },
    { id: "carta", w: ["carta digital", "carta", "menu", "qr", "codigo qr", "domicilio", "delivery", "glovo", "just eat", "uber eats"] },
    { id: "reservas", w: ["reservas", "reserva", "citas", "cita", "agenda", "turnos", "booking"] },
    { id: "seo", w: ["seo", "google", "posicionamiento", "primeros puestos", "google maps", "reseñas"] },
    { id: "precio", w: ["precio", "cuesta", "cuanto", "tarifa", "presupuesto", "coste", "caro", "barato", "€", "euros", "inversion"] },
    { id: "plazo", w: ["plazo", "tiempo", "cuando", "tardais", "tardan", "tarda", "semanas", "rapido", "urgente", "urge", "prisa"] },
    { id: "pago", w: ["pago", "pagar", "financiar", "cuotas", "adelantado", "señal", "factura"] },
    { id: "mantenimiento", w: ["mantenimiento", "hosting", "actualizaciones", "copias", "soporte", "mensual", "cuota"] },
    { id: "quien", w: ["quien eres", "que eres", "robot", "persona", "humano", "eres real", "eres ia", "quien esta detras", "gustavo", "quienes sois", "equipo"] },
    { id: "proyectos", w: ["proyectos", "trabajos", "ejemplos", "referencias", "habeis hecho", "casos", "muestras", "demos", "demo", "ver proyectos"] },
    { id: "contacto", w: ["contacto", "telefono", "whatsapp", "email", "correo", "llamar", "llamada", "hablar con alguien", "hablar con gustavo", "reunion"] },
    { id: "ubicacion", w: ["donde estais", "donde estan", "donde esta", "sois de", "estais en", "trabajais en", "trabajan en", "toda españa", "presencial", "remoto", "desplazais", "os desplazais", "en mi ciudad", "fuera de malaga"] },
    { id: "existente", w: ["ya tengo", "tengo web", "mi web", "mi pagina", "mejorar", "mejorarla", "renovar", "rediseño", "cambiar", "antigua", "vieja", "lenta", "fea", "no funciona", "actualizar", "redes", "instagram", "facebook"] },
    { id: "nada", w: ["no tengo", "desde cero", "cero", "empezar", "nuevo negocio", "acabo de abrir", "voy a abrir", "montar", "parto de cero"] },
    { id: "problema", w: ["problema", "pierdo", "perdemos", "lio", "caos", "manual", "a mano", "papel", "duplicado", "errores", "dependo", "pocos clientes", "no vendo", "no me encuentran", "mas clientes", "ahorrar tiempo", "vender online", "mejorar la imagen", "imagen", "requerimiento", "desactualizado"] },
    { id: "como", w: ["como trabajais", "proceso", "metodo", "fases", "como funciona", "como lo haceis"] }
  ];

  var LABEL = { web: "una web", tienda: "una tienda online", app: "una aplicación o software de gestión", automatizar: "automatizar procesos", ia: "un asistente inteligente", rgpd: "la implantación RGPD", carta: "una carta digital con pedidos", reservas: "un sistema de reservas", seo: "mejorar tu visibilidad en Google" };
  var ACK = ["Entendido.", "Vale, te sigo.", "Perfecto.", "Bien."];
  var BACK = ["Volviendo a lo tuyo:", "Y sobre tu proyecto:", "Retomo lo que me contabas:"];

  /* ================================================================ Estado */
  var S = load();
  function load() {
    try { var s = JSON.parse(sessionStorage.getItem(CFG.storageKey) || "null"); if (s && s.log) return s; } catch (e) {}
    return { log: [], intent: null, sector: null, situation: null, pain: null, name: null, rec: false, fallbacks: 0, stage: "start", pending: null };
  }
  function save() { try { S.log = S.log.slice(-40); sessionStorage.setItem(CFG.storageKey, JSON.stringify(S)); } catch (e) {} }

  /* ================================================================ Análisis */
  function analyze(raw) {
    var t = norm(raw);
    var r = { t: t, intents: [], sector: null, name: null, short: t.split(" ").length <= 3 };
    INTENTS.forEach(function (it) { if (has(t, it.w)) r.intents.push(it.id); });
    for (var i = 0; i < SECTORS.length; i++) { if (has(t, SECTORS[i].words)) { r.sector = SECTORS[i]; break; } }
    var m = t.match(/(?:me llamo|mi nombre es|soy)\s+([a-zñ]{3,})/);
    if (m && ["una", "un", "el", "la", "de", "autonomo", "autonoma", "empresario", "dueño"].indexOf(m[1]) < 0) r.name = m[1].charAt(0).toUpperCase() + m[1].slice(1);
    r.yes = r.intents.indexOf("si") >= 0 && r.short && r.intents.indexOf("no") < 0;
    r.no = r.intents.indexOf("no") >= 0 && r.short;
    var order = ["carta", "reservas", "tienda", "rgpd", "ia", "automatizar", "app", "web", "seo"];
    r.main = null;
    for (var k = 0; k < order.length; k++) { if (r.intents.indexOf(order[k]) >= 0) { r.main = order[k]; break; } }
    // "asistente"/"bot" cuando el usuario pregunta por mí, no por un producto
    if (r.main === "ia" && r.intents.indexOf("quien") >= 0) r.main = null;
    return r;
  }

  /* ================================================================ Diálogo */
  function nextQuestion() {
    if (!S.intent) return { key: "intent", text: "¿Qué te gustaría resolver ahora mismo?", chips: chips("Quiero una web", "Una app o software", "Automatizar / IA", "Protección de datos (RGPD)") };
    if (!S.sector) return { key: "sector", text: pick(["¿A qué se dedica tu negocio?", "Cuéntame qué tipo de negocio tienes.", "¿En qué sector estás?"]), chips: chips("Hostelería", "Taller / automoción", "Clínica o estética", "Otro sector") };
    if (S.situation === null && S.intent !== "rgpd") return { key: "situation", text: pick(["¿Ahora mismo tienes web o herramientas digitales, o partimos de cero?", "¿Qué tienes hoy: alguna web, redes, Excel, WhatsApp… o nada todavía?"]), chips: chips("Tengo web pero quiero mejorarla", "Solo redes sociales", "Parto de cero") };
    if (!S.pain) {
      if (S.intent === "rgpd") return { key: "pain", text: "¿Tenéis ya algo hecho de protección de datos o partís de cero?", chips: chips("Tenemos algo pero está desactualizado", "Nada todavía", "Hemos recibido un requerimiento") };
      return { key: "pain", text: pick(["¿Qué es lo que más te frena hoy? Pocos clientes, mucho trabajo manual, imagen anticuada…", "¿Qué te gustaría conseguir con esto: más clientes, ahorrar tiempo, vender online?"]), chips: chips("Más clientes", "Ahorrar tiempo y trabajo manual", "Vender online", "Mejorar la imagen") };
    }
    return null;
  }

  function summary() {
    var s = "Hola, " + (S.name ? "soy " + S.name + ", " : "") + "tengo un negocio" + (S.sector ? " de " + S.sector.label : "") + " y quiero " + (LABEL[S.intent] || "un proyecto digital") + ".";
    if (S.situation) s += " Situación actual: " + S.situation + ".";
    if (S.pain) s += " Objetivo: " + S.pain + ".";
    return s;
  }
  function subject() { return "Proyecto: " + (LABEL[S.intent] || "consulta") + (S.sector ? " · " + S.sector.label : ""); }
  function closing() { return { wa: summary(), mail: subject() }; }

  function recommend() {
    var sec = S.sector, i = S.intent;
    if (sec && sec.id === "desguace") return "Aquí jugamos en casa: 25 años en el sector. " + PROJECTS.reciclacat + ". Te lo enseño en una demo sin compromiso cuando quieras.";
    if (i === "carta" || (sec && sec.id === "hosteleria" && (i === "web" || i === "app"))) return "Para hostelería lo que mejor funciona es sencillo: " + PROJECTS.carta + ". Y una web ligera que lleve al cliente a reservar o pedir.";
    if (i === "reservas" || (sec && sec.demo === "reservas" && (i === "web" || i === "app"))) return "En tu sector la clave es que el cliente reserve solo, sin llamadas: " + PROJECTS.reservas + ". Se adapta con tu equipo y tus servicios.";
    if (sec && sec.id === "taller") return "Para un taller lo que convierte es cita directa y confianza: " + PROJECTS.mcmotor + ".";
    if (i === "tienda") return "Sobre vender online: " + PROJECTS.tienda + ". Lo importante es empezar por lo que de verdad se vende, no montar un catálogo enorme el primer día.";
    if (i === "rgpd") return "La implantación RGPD no es entregarte unos textos: preparamos la documentación adaptada a tu actividad, formamos al equipo y damos soporte si llega una inspección o requerimiento de la AEPD" + (sec && sec.demo === "rgpd" ? ". Además, " + PROJECTS.rgpd : "") + ".";
    if (i === "app" || i === "automatizar") return "Cuando Excel, WhatsApp y varias herramientas empiezan a frenar el negocio, toca un panel a medida. " + PROJECTS.app + ".";
    if (i === "ia") return "Un asistente como yo, pero entrenado con tu negocio: responde dudas, filtra clientes y los lleva al WhatsApp o a la reserva. Se integra en tu web o en tu app.";
    if (i === "seo") return "Lo primero es que la web esté bien construida: velocidad, estructura y SEO técnico de salida van incluidos en cualquier web nuestra. Después, ficha de Google y contenidos si hace falta.";
    return "Una web clara, rápida y pensada para que el cliente contacte: " + PROJECTS.web + ".";
  }

  function priceAnswer() {
    var i = S.intent;
    if (i === "app" || i === "automatizar" || i === "ia") return "Las apps y automatizaciones se presupuestan por alcance: definimos qué hace, lo dividimos en fases y te damos precio y entregables **por escrito** antes de empezar. Por eso prefiero entender el caso primero.";
    if (i === "rgpd") return "La implantación RGPD depende del tamaño de la empresa y de qué datos tratáis. Se presupuesta tras conocer el caso, siempre por escrito y sin cuotas escondidas.";
    if (i === "carta") return "La carta digital es de las soluciones más asequibles: parte de la base de una web sencilla (**desde 600 €**) y se amplía con pedidos, reservas o panel según lo que necesites.";
    return "Una landing o web sencilla parte de **600 €** (diseño responsive, formulario/WhatsApp, SEO técnico y publicación). Una web corporativa, tienda o plataforma se presupuesta por alcance, y siempre te lo dejamos por escrito antes de empezar.";
  }

  function faq(id) {
    switch (id) {
      case "precio": return priceAnswer();
      case "plazo": return "Una landing o web sencilla suele salir en días o pocas semanas. Apps y plataformas van por fases, con fechas fijadas en el plan. Si te urge, dímelo y lo priorizamos.";
      case "pago": return "En proyectos pequeños, 50 % al inicio y 50 % a la entrega. En proyectos grandes se paga por hitos, a medida que se entregan cosas.";
      case "mantenimiento": return "Sí. Tras el lanzamiento puedes tener una cuota mensual que cubre hosting, actualizaciones, copias de seguridad y pequeños cambios. O pagar por intervención, como prefieras.";
      case "seo": return "Toda web nuestra sale con estructura, velocidad y SEO técnico de serie. El trabajo recurrente de contenidos o campañas se plantea aparte si hace falta.";
      case "quien": return "Soy Limón, el asistente de Limonada Web. No soy una persona, pero quien construye los proyectos sí: **Gustavo Molina**, fundador, con más de 25 años dirigiendo empresas y desarrollando software. Con él hablas directamente, sin intermediarios.";
      case "proyectos": return "Todo lo que enseñamos está online y funcionando: **Red Desguace** (marketplace, 176.000 piezas), **ReciclaCAT** (SaaS de gestión), **MediBitácora**, **Hola ITV Málaga**, **MC Motor Premium** y dos demos abiertas: la app de reservas (limonadaweb.com/demos/victormonio/) y la carta digital con pedidos (limonadaweb.com/demos/carta-digital/).";
      case "ubicacion": return "Estamos en Málaga, pero trabajamos online con empresas de toda España. Reuniones por videollamada o en persona si estás cerca.";
      case "como": return "Cinco pasos, sin reuniones eternas: **diagnóstico** (objetivo y proceso actual), **plan** (alcance y coste por escrito), **construcción**, **lanzamiento** (pruebas, analítica, SEO técnico) y **mejora** solo cuando aporta valor.";
      case "ia": return "Sí, se puede. Asistentes como yo entrenados con tu negocio, integrados en tu web o tu app: responden, filtran y llevan al cliente al siguiente paso.";
      case "contacto": return "Puedes escribir a Gustavo directamente por WhatsApp al **628 482 475** o a **hola@limonadaweb.com**. Te dejo el mensaje preparado con lo que me has contado.";
    }
    return null;
  }

  function reply(raw) {
    var a = analyze(raw);
    var out = [], ch = null, learned = false, answered = false;
    if (a.name && !S.name) { S.name = a.name; out.push("Encantado, " + S.name + "."); }

    // Cortesía
    if (a.intents.indexOf("despedida") >= 0 && a.short) return { text: pick(["Hasta luego. Aquí me tienes cuando quieras retomarlo.", "¡Hasta pronto! Si te surge algo, escríbeme."]) };
    if (a.intents.indexOf("gracias") >= 0 && a.short) { var c1 = closing(); c1.text = pick(["A ti. Te dejo preparado el mensaje para Gustavo con lo que hemos hablado.", "De nada. Si quieres, aquí tienes el resumen para enviárselo a Gustavo."]); return c1; }
    if (a.intents.indexOf("saludo") >= 0 && a.short) { var q0 = nextQuestion(); return { text: pick(["¡Hola! ¿Qué negocio tienes o qué te gustaría mejorar?", "Buenas. Cuéntame qué tienes entre manos."]), chips: q0 ? q0.chips : null }; }

    // ¿Hay una pregunta directa (FAQ) en el mensaje?
    var faqIds = ["contacto", "precio", "plazo", "pago", "mantenimiento", "quien", "proyectos", "ubicacion", "como", "seo"];
    var hit = null;
    for (var i = 0; i < faqIds.length; i++) { if (a.intents.indexOf(faqIds[i]) >= 0 && !(faqIds[i] === "seo" && a.main === "seo" && !S.intent)) { hit = faqIds[i]; break; } }
    if (!hit && a.intents.indexOf("ia") >= 0 && a.main !== "ia" && /como tu|como este|un bot|asistente/.test(a.t)) hit = "ia";

    // Respuesta a la pregunta pendiente
    if (hit) { /* no capturamos texto libre si es una pregunta */ }
    else if (S.pending === "situation") {
      if (a.intents.indexOf("nada") >= 0 || a.no) { S.situation = "parte de cero"; answered = true; }
      else if (a.intents.indexOf("existente") >= 0) { S.situation = /redes|instagram|facebook/.test(a.t) ? "solo redes sociales" : "ya tiene web y quiere mejorarla"; answered = true; }
      else if (!a.main && !a.sector && a.t.length < 80 && /excel|whatsapp|papel|libreta|programa|hoja|agenda|nada|poco|solo|tengo|usamos|uso/.test(a.t)) { S.situation = raw.trim().replace(/\.$/, ""); answered = true; }
    } else if (S.pending === "pain") {
      if ((!a.main || a.intents.indexOf("problema") >= 0 || a.short) && /[aeiou]{1}[a-zñ]*\s|cliente|tiempo|vender|imagen|manual|requerimiento|nada|desactualizado/.test(a.t) && a.t.length > 3) { S.pain = raw.trim().replace(/\.$/, ""); answered = true; }
    } else if (S.pending === "sector" && !a.sector && !a.main && !a.yes && !a.no && a.t.length < 60 && a.t !== "otro sector") {
      S.sector = { id: "otro", label: raw.trim().toLowerCase(), demo: "web" }; answered = true;
    } else if (S.pending === "confirm") {
      if (a.yes) { S.stage = "done"; S.pending = null; var c2 = closing(); c2.text = "Genial. Aquí tienes el botón con el resumen para enviárselo a Gustavo; te responde él en persona."; return c2; }
      if (a.no) { S.pending = null; return { text: "Sin problema. ¿Qué quieres saber antes de dar el paso?", chips: chips("Precios", "Plazos", "Ver proyectos", "Cómo trabajáis") }; }
    }
    if (S.pending === "sector" && a.t === "otro sector") { S.pending = "sector2"; return { text: "Dime en dos palabras a qué os dedicáis.", chips: null }; }
    if (S.pending === "sector2" && !a.sector) { S.sector = { id: "otro", label: raw.trim().toLowerCase(), demo: "web" }; answered = true; }

    // Datos nuevos
    if (a.main && a.main !== S.intent && !(answered && (S.pending === "situation" || S.pending === "pain") && a.main === "web")) { S.intent = a.main; learned = true; }
    if (a.sector && (!S.sector || S.sector.id === "otro")) { S.sector = a.sector; learned = true; }
    if (!S.situation && a.intents.indexOf("existente") >= 0 && S.pending !== "pain") S.situation = /redes|instagram|facebook/.test(a.t) ? "solo redes sociales" : "ya tiene web y quiere mejorarla";
    if (!S.situation && a.intents.indexOf("nada") >= 0) S.situation = "parte de cero";
    if (!S.pain && a.intents.indexOf("problema") >= 0 && a.t.length > 15 && S.pending !== "pain") S.pain = raw.trim().replace(/\.$/, "");

    // FAQ intercalada
    if (hit === "contacto") { var c3 = closing(); c3.text = faq("contacto"); return c3; }
    if (hit) {
      out.push(faq(hit));
      S.fallbacks = 0;
      var q1 = nextQuestion();
      if (q1 && S.stage !== "done") { out.push(pick(BACK) + " " + q1.text.charAt(0).toLowerCase() + q1.text.slice(1)); ch = q1.chips; S.pending = q1.key; }
      else if (S.stage !== "done") { S.pending = "confirm"; out.push("¿Se lo paso a Gustavo con lo que me has contado?"); ch = chips("Sí, prepáralo", "Aún tengo dudas"); }
      return { text: out.join("\n\n"), chips: ch };
    }

    // Reconocimiento
    if (learned || answered) {
      S.fallbacks = 0;
      if (learned && S.intent && S.sector && !S.rec) out.push(pick(["Vale:", "Perfecto:", "Entendido:"]) + " " + LABEL[S.intent] + " para un negocio de " + S.sector.label + ".");
      else if (learned && S.intent && !S.sector) out.push(pick(["Vale, ", "Perfecto, ", "Entendido, "]) + LABEL[S.intent] + ".");
      else if (learned && S.sector && !S.intent) out.push(pick(["Vale, ", "Perfecto, ", "Bien, "]) + "un negocio de " + S.sector.label + ".");
      else out.push(pick(ACK));
      if (S.intent && S.sector && !S.rec) { S.rec = true; out.push(recommend()); }
    } else if (a.yes) {
      out.push(pick(ACK));
    } else {
      S.fallbacks = (S.fallbacks || 0) + 1;
      if (S.fallbacks >= 2) { S.fallbacks = 0; var c4 = closing(); c4.text = "Creo que esto lo resolvemos mejor hablando. Escríbele a Gustavo por WhatsApp y le cuentas con calma; te responde él directamente."; c4.chips = chips("Quiero una web", "Una app o software", "Protección de datos (RGPD)"); return c4; }
      var q2 = nextQuestion();
      var t2 = pick(["No estoy seguro de haberlo entendido bien.", "Creo que no te he pillado del todo."]) + " " + (q2 ? q2.text : "¿Me lo cuentas de otra forma?");
      if (q2) S.pending = q2.key;
      return { text: t2, chips: q2 ? q2.chips : null };
    }

    // Siguiente pregunta o cierre
    var q = nextQuestion();
    if (q) { out.push(q.text); ch = q.chips; S.pending = q.key; return { text: out.join("\n\n"), chips: ch }; }
    if (S.stage !== "done") {
      S.stage = "closing"; S.pending = "confirm";
      out.push("Con esto ya tengo una idea clara. Resumen: **" + (LABEL[S.intent] || "proyecto digital") + "** para un negocio de " + S.sector.label + (S.situation ? ", " + S.situation : "") + (S.pain ? ". Objetivo: " + S.pain.toLowerCase() : "") + ".\n\nEl siguiente paso es una conversación corta con Gustavo para cerrar alcance y precio por escrito. ¿Te preparo el mensaje?");
      return { text: out.join("\n\n"), chips: chips("Sí, prepáralo", "Aún tengo dudas") };
    }
    var c5 = closing(); c5.text = out.concat(["¿Algo más que quieras saber antes de hablar con Gustavo?"]).join(" "); return c5;
  }

  /* ================================================================ DOM */
  var ICON_X = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  var ICON_WA = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2 .6 2.7.5a2.3 2.3 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3z"/></svg>';
  var ICON_MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';

  var root = document.createElement("div");
  root.id = "lb-root";
  root.innerHTML =
    '<div id="lb-nudge" role="status">' + esc(CFG.nudge) + "</div>" +
    '<button id="lb-launch" type="button" aria-label="Abrir chat con ' + esc(CFG.name) + '"><img src="' + CFG.img + '" alt="' + esc(CFG.name) + ', asistente de Limonada Web" width="118" height="118" loading="lazy"></button>' +
    '<section id="lb-panel" role="dialog" aria-label="Chat con ' + esc(CFG.name) + '" aria-hidden="true">' +
      '<header id="lb-head"><img src="' + CFG.imgMini + '" alt=""><div class="lb-t"><b>' + esc(CFG.name) + '</b><span>Asistente de Limonada Web</span></div><button type="button" id="lb-close" aria-label="Cerrar chat">' + ICON_X + "</button></header>" +
      '<div id="lb-log" aria-live="polite"></div>' +
      '<form id="lb-form"><textarea id="lb-in" rows="1" placeholder="Escribe aquí…" aria-label="Tu mensaje" maxlength="800"></textarea><button id="lb-send" type="submit" aria-label="Enviar">' + ICON_SEND + "</button></form>" +
      '<div id="lb-foot">Asistente de Limonada Web · <a href="/politica-privacidad">Privacidad</a></div>' +
    "</section>";
  document.body.appendChild(root);

  var $ = function (id) { return document.getElementById(id); };
  var launch = $("lb-launch"), panel = $("lb-panel"), log = $("lb-log"), form = $("lb-form"), input = $("lb-in"), send = $("lb-send"), nudge = $("lb-nudge"), closeBtn = $("lb-close");
  var busy = false, opened = false;

  function md(text) {
    var h = esc(text);
    h = h.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    h = h.replace(/(^|[\s(:])((?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:com|es|app|net|org)(?:\/[^\s<)]*)?)/gi, function (m, pre, url) {
      var href = /^https?:\/\//i.test(url) ? url : "https://" + url;
      return pre + '<a href="' + href + '" target="_blank" rel="noopener">' + url + "</a>";
    });
    h = h.replace(/(\d{3} \d{3} \d{3})/g, function (m) { return '<a href="tel:+34' + m.replace(/ /g, "") + '">' + m + "</a>"; });
    return h;
  }

  function addMsg(role, text, typing) {
    var wrap = document.createElement("div");
    wrap.className = "lb-msg " + (role === "user" ? "user" : "bot");
    if (role !== "user") wrap.innerHTML = '<img class="lb-av" src="' + CFG.imgMini + '" alt="">';
    var b = document.createElement("div");
    b.className = "lb-b";
    b.innerHTML = typing ? '<span class="lb-typing"><i></i><i></i><i></i></span>' : (role === "user" ? esc(text) : md(text));
    wrap.appendChild(b);
    log.appendChild(wrap);
    scroll();
    return b;
  }

  function addChips(r) {
    clearChips();
    if (!(r.chips && r.chips.length) && !r.wa && !r.mail) return;
    var box = document.createElement("div");
    box.className = "lb-chips";
    (r.chips || []).forEach(function (c) {
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "lb-chip"; btn.textContent = c;
      btn.addEventListener("click", function () { clearChips(); ask(c); });
      box.appendChild(btn);
    });
    if (r.wa) {
      var wa = document.createElement("a");
      wa.className = "lb-chip wa"; wa.target = "_blank"; wa.rel = "noopener";
      wa.href = "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(r.wa);
      wa.innerHTML = ICON_WA + "Enviar a Gustavo por WhatsApp";
      box.appendChild(wa);
    }
    if (r.mail) {
      var ml = document.createElement("a");
      ml.className = "lb-chip";
      ml.href = "mailto:" + CFG.email + "?subject=" + encodeURIComponent(r.mail) + "&body=" + encodeURIComponent(r.wa || summary());
      ml.innerHTML = ICON_MAIL + "Por email";
      box.appendChild(ml);
    }
    log.appendChild(box);
    scroll();
  }
  function clearChips() { var c = log.querySelectorAll(".lb-chips"); for (var i = 0; i < c.length; i++) c[i].remove(); }
  function scroll() { log.scrollTop = log.scrollHeight; }

  function renderHistory() {
    log.innerHTML = "";
    if (!S.log.length) {
      var w = { text: "¡Hola! Soy **Limón**, del equipo de Limonada Web. Cuéntame qué negocio tienes o qué te gustaría mejorar y te digo cómo lo resolveríamos.", chips: chips("Quiero una web", "Una app o software", "Automatizar / IA", "Protección de datos (RGPD)") };
      S.pending = "intent";
      addMsg("bot", w.text); addChips(w);
      S.log.push({ role: "bot", text: w.text, chips: w.chips }); save();
      return;
    }
    var last = null;
    S.log.forEach(function (m) { addMsg(m.role, m.text); if (m.role === "bot") last = m; });
    if (last) addChips(last);
  }

  function typeOut(bubble, text, done) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { bubble.innerHTML = md(text); return done(); }
    var i = 0, step = Math.max(2, Math.round(text.length / 60));
    (function tick() {
      i = Math.min(text.length, i + step);
      bubble.innerHTML = md(text.slice(0, i));
      scroll();
      if (i < text.length) setTimeout(tick, 18); else done();
    })();
  }

  function ask(text) {
    text = String(text || "").trim();
    if (!text || busy) return;
    busy = true; send.disabled = true;
    clearChips();
    addMsg("user", text);
    S.log.push({ role: "user", text: text }); save();
    input.value = ""; autosize();

    var bubble = addMsg("bot", "", true);
    var r = reply(text);
    var think = 500 + Math.min(1300, r.text.length * 6) + Math.random() * 300;
    setTimeout(function () {
      typeOut(bubble, r.text, function () {
        addChips(r);
        S.log.push({ role: "bot", text: r.text, chips: r.chips || null, wa: r.wa || null, mail: r.mail || null }); save();
        busy = false; send.disabled = false; scroll();
        if (window.innerWidth > 520) input.focus();
      });
    }, think);
  }

  /* ================================================================ UI */
  function open() {
    if (opened) return;
    opened = true;
    root.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    nudge.classList.remove("on");
    renderHistory();
    setTimeout(function () { if (window.innerWidth > 520) input.focus(); }, 250);
    try { sessionStorage.setItem(CFG.storageKey + "_opened", "1"); } catch (e) {}
  }
  function close() { opened = false; root.classList.remove("open"); panel.setAttribute("aria-hidden", "true"); launch.focus(); }
  function autosize() { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 120) + "px"; }

  launch.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && opened) close(); });
  form.addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); });
  input.addEventListener("input", autosize);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(input.value); } });

  var seen = false;
  try { seen = !!sessionStorage.getItem(CFG.storageKey + "_opened"); } catch (e) {}
  if (!seen) {
    setTimeout(function () { if (!opened) nudge.classList.add("on"); }, CFG.nudgeDelay);
    setTimeout(function () { nudge.classList.remove("on"); }, CFG.nudgeDelay + 9000);
  }

  window.LimonBot = { open: open, close: close, ask: function (t) { open(); ask(t); } };
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-limon]");
    if (!el) return;
    e.preventDefault(); e.stopPropagation();
    open(); var t = el.getAttribute("data-limon"); if (t) ask(t);
  }, true);
})();
