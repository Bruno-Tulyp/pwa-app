const CACHE_NAME = "my-cache-v1"; // Un cache général pour toutes les pages
const URLS_TO_CACHE = ["/", "/dashboard", "/myprofile", "/styles/global.css"]; // Ajoutez la page d'accueil et d'autres ressources nécessaires

// Installation du service worker et mise en cache des URLs
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE); // Mise en cache de toutes les URLs nécessaires
    })
  );
});

// Activation du service worker et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  const cacheAllowlist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheAllowlist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Gestion des requêtes pour le cache spécifique
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === "/dashboard") {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(event.request).then((networkResponse) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            }).catch(() => {
              // Retourner le fichier offline.html si hors ligne
          return caches.match("/offline.html").then((offlineResponse) => {
            return offlineResponse;
          });
            })
          );
        })
      )
    );
  } else if (url.pathname === "/myprofile") {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(event.request).then((networkResponse) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            }).catch(() => {
              // Si le réseau échoue, retourner la page d'accueil
              return cache.match("/");
            })
          );
        })
      )
    );
  } else {
    // Pour les autres requêtes, essayer de répondre à partir du cache ou retourner la page d'accueil
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).catch(() => {
            // Retourner la page d'accueil si hors ligne
            return caches.match("/").then((homePageResponse) => {
              return homePageResponse;
            });
          })
        );
      })
    );
  }
});

// Gestion des notifications push
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = JSON.stringify({ message: "Test push" });
    const parsedData = JSON.parse(data);

    const options = {
      body: parsedData.message,
      icon: "/icon-192x192.png",
      badge: "/icon-192x192.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        route: parsedData.route || "/",
        primaryKey: "2",
      },
    };

    event.waitUntil(self.registration.showNotification(parsedData.title || "Notification", options));
  }
});

// Gérer le clic sur la notification
self.addEventListener("notificationclick", (event) => {
  const { route } = event.notification.data;

  event.notification.close();
  event.waitUntil(clients.openWindow(route || "/"));
});
