// Micron service worker — chạy offline, tự cập nhật khi có bản mới.
const VERSION = 'micron-v6';
const SHELL = ['./', './index.html', './assets/brand/apple-touch-icon.png', './manifest.webmanifest', './plugins/catalog.json',
  './assets/app/icon-192.png', './assets/app/icon-512.png', './assets/app/icon-maskable-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  // Chỉ xử lý file của chính Micron; mọi lời gọi AI / API bên ngoài đi thẳng ra mạng.
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  // Mạng trước (luôn lấy bản mới), mất mạng thì dùng bản đã lưu.
  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))));
});
