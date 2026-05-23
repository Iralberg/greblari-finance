
// Novo
const CACHE_NAME = "meu-app-v1";



const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./estilos/style.css",
  "./estilos/media-query.css",
  "./js/app.js",

  "./paginas/pag01.html",
  "./paginas/pag02.html",


  "./icons/icon-512.png",
  "./icons/icon-192.png"
];



/* =========================
   INSTALL
========================= */

self.addEventListener("install", event => {

  self.skipWaiting();

  event.waitUntil(

    caches.open(STATIC_CACHE)
      .then(cache => {

        console.log("Cache estático criado");

        return cache.addAll(ASSETS);

      })

  );

});



/* =========================
   ACTIVATE
========================= */

self.addEventListener("activate", event => {

  clients.claim();

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if (
            key !== STATIC_CACHE &&
            key !== DYNAMIC_CACHE
          ) {

            console.log("Cache removido:", key);

            return caches.delete(key);

          }

        })

      );

    })

  );

});



/* =========================
   FETCH
========================= */

self.addEventListener("fetch", event => {

  const req = event.request;



  /* ===== APIs ===== */

  if (req.url.includes("/api/")) {

    event.respondWith(networkFirst(req));

    return;

  }



  /* ===== Arquivos estáticos ===== */

  event.respondWith(cacheFirst(req));

});



/* =========================
   CACHE FIRST
========================= */

async function cacheFirst(req) {

  const cache = await caches.match(req);

  return cache || fetch(req);

}



/* =========================
   NETWORK FIRST
========================= */

async function cacheFirst(req) {

  const cache = await caches.match(req);

  if (cache) {
    return cache;
  }

  try {

    const networkResponse = await fetch(req);

    return networkResponse;

  } catch (error) {

    if (req.mode === "navigate") {
      return caches.match("./offline.html");
    }

  }

}