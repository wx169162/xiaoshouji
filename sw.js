const CACHE = 'xiaoshouji-v1';
const URLS = [
  '/xiaoshouji/',
  '/xiaoshouji/index.html',
  '/xiaoshouji/manifest.json',
  '/xiaoshouji/apps/chat/index.html',
  '/xiaoshouji/apps/chat/room.html',
  '/xiaoshouji/apps/setting/index.html',
  '/xiaoshouji/apps/theme/index.html',
  '/xiaoshouji/apps/worldbook/index.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
