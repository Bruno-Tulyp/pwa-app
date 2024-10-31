const cacheName = "pwa-app-v1"
const contentToCache = ["/"]

self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()

    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/icon-192x192.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        route: data.route,
        primaryKey: "2",
      },
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received.")

  const { route } = event.notification.data

  event.notification.close()
  event.waitUntil(clients.openWindow(route))
})

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install")
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName)

      console.log("[Service Worker] Caching all: app shell and content")

      await cache.addAll(contentToCache)
    })(),
  )
})

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const cachedRequest = await caches.match(e.request)

      console.log(`[Service Worker] Fetching Resource: ${e.request.url}`)

      if (cachedRequest) {
        return cachedRequest
      }

      const response = await fetch(e.request)

      if (e.request.url.includes("_next/static/")) {
        const cache = await caches.open(cacheName)

        console.log(`[Service Worker] Caching Next Resource: ${e.request.url}`)

        cache.put(e.request, response.clone())
      }

      return response
    })(),
  )
})

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return
          }

          return caches.delete(key)
        }),
      )
    }),
  )
})
