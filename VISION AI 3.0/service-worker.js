const CACHE_NAME = "vision-v2.0.0";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",

    "./css/style.css",

    "./js/questions.js",
    "./js/app.js",

    "./assets/icons/icon-192.png",
    "./assets/icons/icon-512.png"
];


/* ==========================================
   INSTALL
========================================== */

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(
                    FILES_TO_CACHE
                );

            })

    );

    self.skipWaiting();

});


/* ==========================================
   ACTIVATE
========================================== */

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(keys => {

                return Promise.all(

                    keys
                        .filter(key =>
                            key !== CACHE_NAME
                        )
                        .map(key =>
                            caches.delete(key)
                        )

                );

            })

    );

    self.clients.claim();

});


/* ==========================================
   FETCH
========================================== */

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                if (cachedResponse) {

                    return cachedResponse;

                }


                return fetch(event.request)
                    .then(response => {

                        return response;

                    })
                    .catch(() => {

                        return caches.match(
                            "./index.html"
                        );

                    });

            })

    );

});