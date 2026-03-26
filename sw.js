const CACHE = 'algocards-v21';
/** problems.js и theory.js часто меняются через API — не включаем в precache (устаревает мгновенно) */
const ASSETS = ['./index.html', './manifest.json'];

function isDynamicJs(url) {
  const p = url.pathname || '';
  return p.endsWith('/problems.js') || p.endsWith('problems.js') ||
         p.endsWith('/theory.js') || p.endsWith('theory.js');
}

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) {
    e.respondWith(fetch(e.request));
    return;
  }

  // problems.js и theory.js: всегда сеть без HTTP-кэша; на GitHub Pages иначе часто виден старый файл
  if (isDynamicJs(url)) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(e.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
