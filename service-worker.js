self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("hrana-cache-v1").then(cache => {
      return cache.addAll([
        "/App-hrana-pentru-suflet/",
        "/App-hrana-pentru-suflet/index.html",
        "/App-hrana-pentru-suflet/offline.html",
        "/App-hrana-pentru-suflet/style.css",
        "/App-hrana-pentru-suflet/nav2.js",
        "/App-hrana-pentru-suflet/manifest.json"
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
    fetch(event.request).catch(() =>
      caches.match(event.request).then(resp => resp || caches.match("/App-hrana-pentru-suflet/offline.html"))
    )
  );
});
