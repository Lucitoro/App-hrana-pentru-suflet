// ===============================
// SERVICE WORKER FINAL PREMIUM
// ===============================

const CACHE_NAME = "hrana-cache-v20240419";

// Toate fișierele importante ale aplicației
const FILES_TO_CACHE = [
  "/App-hrana-pentru-suflet/",
  "/App-hrana-pentru-suflet/index.html",
  "/App-hrana-pentru-suflet/setari.html",
  "/App-hrana-pentru-suflet/pravila.html",
  "/App-hrana-pentru-suflet/psaltirea.html",
  "/App-hrana-pentru-suflet/acatiste.html",
  "/App-hrana-pentru-suflet/resurse.html",

  "/App-hrana-pentru-suflet/style.css",
  "/App-hrana-pentru-suflet/settings.js",
  "/App-hrana-pentru-suflet/tts-full.js",

  "/App-hrana-pentru-suflet/manifest.json",

  "/App-hrana-pentru-suflet/icons/icon-192.png",
  "/App-hrana-pentru-suflet/icons/icon-512.png"
];

// ===============================
// INSTALL — pune fișierele în cache
// ===============================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// ===============================
// ACTIVATE — șterge cache-urile vechi
// ===============================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ===============================
// FETCH — servește din cache, apoi din rețea
// ===============================
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("/App-hrana-pentru-suflet/index.html")
        )
      );
    })
  );
});
