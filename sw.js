/* Service worker for the Electronics Toolkit.
   Bump CACHE_VERSION whenever you publish a new index.html so devices drop the old copy. */
const CACHE_VERSION = 'toolkit-v6';
const CORE = ['./', './index.html', './site.css', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];
const NEVER_CACHE = /googlesyndication|doubleclick|google-analytics|googletagmanager|adservice/;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || NEVER_CACHE.test(req.url)) return;       // ads and non-GET go straight to the network
  const url = new URL(req.url);

  // Pages: network first (new versions arrive immediately); each page is cached under its own address,
  // and the cached app shell is the fallback when a page was never visited while online.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put(req, copy)); } return res; })
        .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // Everything else (own files, Google Fonts): serve the cached copy at once, refresh it in the background.
  if (url.origin === self.location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(cache =>
        cache.match(req).then(hit => {
          const fresh = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => hit);
          return hit || fresh;
        })
      )
    );
  }
});
