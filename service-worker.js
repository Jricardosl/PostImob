var cacheName = 'Postimoveis';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        './index.html',

        //'./manifest.json',

     
        './assets/img/114.webp',

        './assets/img/128.webp',

        './assets/img/144.webp',

        './assets/img/152.webp',

        './assets/img/167.webp',

        './assets/img/172.webp',

        './assets/img/180.webp',

        './assets/img/196.webp',

        './assets/img/216.webp',

        './assets/img/256.webp',

        './assets/img/512.webp',

        './assets/img/512.png',

        './assets/img/1024.webp',

        //'./assets/images/120.webp',

        //'./assets/js/jquery.min.js',

        //'./assets/js/browser.min.js',

        //'./assets/js/breakpoints.min.js',

        //'./ssets/js/util.js',

        //'./assets/js/main.js',


      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
     try {
       return await fetch(event.request);
     } catch (err) {
       return caches.match(event.request);
     }
   }());




});