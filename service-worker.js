var cacheName = 'MyNoteAppShell';

var filesToCache = [
  '/',
  '/index.html',
  '/css/angular-material.min.css',
  '/js/MyNoteController.js',
  '/js/libs/angular.js',
  '/js/libs/angular-material.min.js',
  '/js/libs/angular-resourse.min.js',
  '/js/libs/angular-route.min.js',
  '/js/libs/angular-animate.min.js',
  '/js/libs/angular-aria.min.js',
  '/img/menu.svg'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});