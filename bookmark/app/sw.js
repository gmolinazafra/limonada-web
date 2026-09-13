/* BookMark · service worker
   Objetivo: que la app se pueda instalar y abra rápido.
   Nunca cachea las llamadas a Supabase: los datos siempre vienen frescos. */

const CACHE = 'bookmark-v1';
const BASE  = '/bookmark/';

const ESENCIALES = [
  BASE + 'app/',
  BASE + 'img/bookmark-logo@1x.png',
  BASE + 'img/bookmark-icono-96.png',
  BASE + 'img/icono-192.png'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ESENCIALES).catch(() => null))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(
        claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  const req = evento.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Datos de la cuenta y del usuario: siempre a la red, nunca cacheados
  if (url.hostname.endsWith('supabase.co') || url.hostname.endsWith('stripe.com')) return;

  // El HTML de la app: red primero, y si no hay conexión, la copia guardada
  if (req.mode === 'navigate') {
    evento.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copia));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match(BASE + 'app/')))
    );
    return;
  }

  // Imágenes y tipografías: primero la copia, y se refresca por detrás
  evento.respondWith(
    caches.match(req).then((guardada) => {
      const red = fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copia));
        }
        return res;
      }).catch(() => guardada);
      return guardada || red;
    })
  );
});
