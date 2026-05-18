const CACHE_NAME = "meu-app-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./estilos/style.css",
  "./js/app.js",

  "./paginas/pag01.html",
  "./paginas/pag02.html",

 
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});