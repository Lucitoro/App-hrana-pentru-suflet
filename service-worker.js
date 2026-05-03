// ============================================================
// Hrana pentru suflet – Service Worker FINAL (v4)
// ============================================================

const CACHE_NAME = "hrana-cache-v4";

const FILES_TO_CACHE = [
  "/App-hrana-pentru-suflet/",
  "/App-hrana-pentru-suflet/index.html",
  "/App-hrana-pentru-suflet/style.css",
  "/App-hrana-pentru-suflet/header.js",
  "/App-hrana-pentru-suflet/menu.js",
  "/App-hrana-pentru-suflet/settings-loader.js",
  "/App-hrana-pentru-suflet/manifest.json",
  "/App-hrana-pentru-suflet/offline.html"
];

// ------------------------------------------------------------
// INSTALL – cache nou + notificare update
// ------------------------------------------------------------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );

  self.skipWaiting();

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) =>
      client.postMessage({ type: "NEW_VERSION_AVAILABLE" })
    );
  });
});

// ------------------------------------------------------------
// ACTIVATE – șterge cache vechi
// ------------------------------------------------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

// ------------------------------------------------------------
// FETCH – online first, fallback offline
// ------------------------------------------------------------
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => response)
      .catch(() =>
        caches.match(event.request).then((resp) =>
          resp || caches.match("/App-hrana-pentru-suflet/offline.html")
        )
      )
  );
});

// ------------------------------------------------------------
// Mesaj din pagină → aplicăm update imediat
// ------------------------------------------------------------
self.addEventListener("message", (event) => {
  if (event.data === "checkForUpdate") {
    self.skipWaiting();
  }
});
