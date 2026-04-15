const CACHE_NAME = "hrana-cache-v1";
const FILES_TO_CACHE = [
  "index.html",
  "style.css2",
  "setari.html",
  "calendar.html",
  "rugaciuni.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// Instalare SW
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activare SW
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
});

// Interceptare request-uri
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
