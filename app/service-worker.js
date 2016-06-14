var staticCacheName = 'static-cache-v1';
var filesToCache = [
  "/",
  "/index.html",
  "/style/main.css",
  "/images/cockatoos-1600_large_2x.jpg",
  "/images/cockatoos-800_large_1x.jpg",
  "/images/cockatoos_medium.jpg",
  "/images/cockatoos_small.jpg",
  "/images/grasshopper-1600_large_2x.jpg",
  "/images/grasshopper-800_large_1x.jpg",
  "/images/grasshopper_medium.jpg",
  "/images/grasshopper_small.jpg",
  "/images/horses-1600_large_2x.jpg",
  "/images/horses-800_large_1x.jpg",
  "/images/horses_medium.jpg",
  "/images/horses_small.jpg",
  "/images/icon.png",
  "/images/postcard-1600_large_2x.jpg",
  "/images/postcard-800_large_1x.jpg",
  "/images/postcard_large.jpg",
  "/images/postcard_medium.jpg",
  "/images/postcard_small.jpg",
  "/images/rosella-1600_large_2x.jpg",
  "/images/rosella-800_large_1x.jpg",
  "/images/rosella_medium.jpg",
  "/images/rosella_small.jpg",
  "/images/sfo-1600_large_2x.jpg",
  "/images/sfo-800_large_1x.jpg",
  "/images/sfo_medium.jpg",
  "/images/sfo_small.jpg",
  "/images/still_life-1600_large_2x.jpg",
  "/images/still_life-800_large_1x.jpg",
  "/images/still_life_medium.jpg",
  "/images/still_life_small.jpg",
  "/images/volt-1600_large_2x.jpg",
  "/images/volt-800_large_1x.jpg",
  "/images/volt_medium.jpg",
  "/images/volt_small.jpg"
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('static-cache') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('[ServiceWorker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
