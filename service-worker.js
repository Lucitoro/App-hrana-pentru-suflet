self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("hrana-cache-v1").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/offline.html",
        "/style.css",
        "/nav2.js",
        "/manifest.json"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== "hrana-cache-v1") {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(resp => resp || caches.match("/offline.html")))
  );
});
