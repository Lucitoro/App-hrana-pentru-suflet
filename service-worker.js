// ============================================================
// Hrana pentru suflet – Service Worker FINAL (v11)
// ============================================================

const CACHE_NAME = "hrana-cache-v11";

const FILES_TO_CACHE = [
  "/App-hrana-pentru-suflet/",
  "/App-hrana-pentru-suflet/index.html",
  "/App-hrana-pentru-suflet/style.css",
  "/App-hrana-pentru-suflet/header.js",
  "/App-hrana-pentru-suflet/menu.js",
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
// INSTALL
// ------------------------------------------------------------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// ------------------------------------------------------------
// ACTIVATE
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
// FETCH – Offline first
// ------------------------------------------------------------
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("/App-hrana-pentru-suflet/offline.html")
        )
      );
    })
  );
});
