// ============================================================
// Hrana pentru suflet – Service Worker FINAL (v12)
// ============================================================

const CACHE_NAME = "hrana-cache-v12";  // <<< SCHIMBAT pentru a forța update

const FILES_TO_CACHE = [
  "/App-hrana-pentru-suflet/",
  "/App-hrana-pentru-suflet/index.html",
  "/App-hrana-pentru-suflet/style.css",
  "/App-hrana-pentru-suflet/header.js",
  "/App-hrana-pentru-suflet/menu.js",
  "/App-hrana-pentru-suflet/settings.js",
  "/App-hrana-pentru-suflet/settings-loader.js",
  "/App-hrana-pentru-suflet/manifest.json",

  // PAGINI APLICAȚIE
  "/App-hrana-pentru-suflet/pravila.html",
  "/App-hrana-pentru-suflet/rugaciuni-dimineata.html",
  "/App-hrana-pentru-suflet/rugaciuni-inserare.html",
  "/App-hrana-pentru-suflet/rugaciuni-seara.html",
  "/App-hrana-pentru-suflet/rugaciuni-saptamana.html",
  "/App-hrana-pentru-suflet/psaltirea.html",
  "/App-hrana-pentru-suflet/acatiste.html",
  "/App-hrana-pentru-suflet/calendar.html",
  "/App-hrana-pentru-suflet/taine.html",
  "/App-hrana-pentru-suflet/resurse.html",
  "/App-hrana-pentru-suflet/despre.html",
  "/App-hrana-pentru-suflet/contact.html",
  "/App-hrana-pentru-suflet/termeni.html",

  // FALLBACK OFFLINE
  "/App-hrana-pentru-suflet/offline.html"
];

// ------------------------------------------------------------
// INSTALL – curăță și instalează imediat
// ------------------------------------------------------------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.delete(CACHE_NAME).then(() =>
      caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    )
  );
  self.skipWaiting();
});

// ------------------------------------------------------------
// ACTIVATE – șterge TOT cache-ul vechi
// ------------------------------------------------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// ------------------------------------------------------------
// FETCH – Online first + fallback offline
// ------------------------------------------------------------
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => caches.match(event.request).then((resp) => resp || caches.match("/App-hrana-pentru-suflet/offline.html")))
  );
});
