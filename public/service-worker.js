const APP_PREFIX = 'BudgetApp-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
const FILES_TO_CACHE = [
    "./public/index.html",
    "./routes/api.js",
    "./public/css/styles.css",
    "./public/js/index.js",
    "./public/js/idb.js",
    "server.js"
];

//respond with caches resources
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                //if cache avail, respond with cach
                console.log('responding with cache : ' + e.request.url)
                return request
            } else {
                //if no cache, fetch req
                console.log('file is not caches, fetching : ' + e.request.url)
                return fetch(e.request)
            }
        })
    )
})

//cache resources
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

//delete outdated caches
self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeepList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            //add current cache name to keep list
            cacheKeepList.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function (key, i) {
                    if (cacheKeepList.indexOf(key) === -1) {
                        console.log('deleting cache : ' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            );
        })
    );
});