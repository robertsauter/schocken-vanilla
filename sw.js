const CACHE_VERSION = 'v2'

async function addResourcesToCache(resources) {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(resources);
}

async function cacheFirst(request) {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
}

async function putInCache(request, response) {
    const cache = await caches.open(CACHE_VERSION);
    await cache.put(request, response);
}

async function deleteCache(key) {
    await caches.delete(key);
}

async function deleteOldCaches() {
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => key !== CACHE_VERSION);
    await Promise.all(cachesToDelete.map(deleteCache));
}

self.addEventListener('install', (e) => {
    e.waitUntil(
        addResourcesToCache([
            '/',
            '/index.html',
            '/globals.css',
            '/favicon.ico',
            '/manifest.json',
            '/Components.js',
            '/App.js',
            '/services/StoreService.js',
            '/pages/Game.js',
            '/lib/Observable.js',
            '/impressum/index.html',
            '/components/menu/Menu.js',
            '/components/menu/SpecialModeSwitch.js',
            '/components/menu/ThemeSelection.js',
            '/components/Dices.js',
            '/components/Einsen.js',
            '/components/FunnyLines.js',
            '/components/RauslegenButton.js',
            '/components/ResetButton.js',
            '/components/RevealButton.js',
            '/assets/icons/180.png',
            '/assets/icons/192.png',
            '/assets/icons/384.png',
            '/assets/icons/512-maskable.png',
            '/assets/icons/512.png',
            '/assets/icons/1024.png',
            '/assets/screenshots/screenshot1.png',
            '/assets/screenshots/screenshot2.png',
            '/Rubik-VariableFont_wght.ttf'
        ])
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (e) => {
    e.respondWith(cacheFirst(e.request));
});