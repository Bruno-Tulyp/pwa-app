// offline.js
document.addEventListener("DOMContentLoaded", () => {
    // Exemple : récupérer des données à partir du cache ou d'IndexedDB
    const offlineDataContainer = document.getElementById("offline-data");
    
    // Simuler la récupération des données (vous devrez remplacer cela par votre logique réelle)
    const offlineData = localStorage.getItem("offlineData"); // Exemple avec localStorage
    if (offlineData) {
        offlineDataContainer.innerHTML = offlineData; // Afficher les données
    } else {
        offlineDataContainer.innerHTML = "<p>Aucune donnée disponible.</p>";
    }
});
