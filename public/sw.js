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
