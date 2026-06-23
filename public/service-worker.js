const CACHE_NAAM = 'pokedex-cache-v1';
const BESTANDEN_OM_TE_CACHEN = [
    '/pokedex-pwa/',
    '/pokedex-pwa/index.html',
    '/pokedex-pwa/manifest.json',
    '/pokedex-pwa/offline.html',
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAAM).then((cache) => cache.addAll(BESTANDEN_OM_TE_CACHEN))
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((gecachedAntwoord) => {
            return gecachedAntwoord || fetch(event.request).catch(() => caches.match('/offline.html'))
        })
    )
})