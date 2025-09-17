self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const clientsArr = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
    clientsArr.forEach(c => c.navigate(c.url));
  })());
});
self.addEventListener('fetch', event => event.respondWith(fetch(event.request)));
