
let CACHE_NAME = 'oxi.cx-site-v0.1';
let urlsToCache = [
    '/',
    'index.html'
];

self.addEventListener('install', (event) => {

    // Perform install steps - Register the URLs
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {

    // Respond with internally cached URLs
    event.respondWith(
        caches.match(event.request)
            .then((response) => {

                    // Cache hit, return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});

self.addEventListener('activate', function(event) {

    // Remove the old caches
    let cacheAllowList = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheAllowList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});