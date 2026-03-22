const CACHE = 'algocards-v14';
const ASSETS = ['./index.html', './problems.js', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

/**
 * Для своих файлов: сначала сеть (свежие данные после деплоя), при офлайне — кэш.
 * Внешние CDN не кладём в CACHE через fetch (только прямой fetch).
 */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) {
    e.respondWith(fetch(e.request));
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
