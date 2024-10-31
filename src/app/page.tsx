"use client";

import { useEffect } from "react";
import PushNotificationManager from "@/app/components/push-notification-manager";
import Accueil from "@/components/accueil";

const Page = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registered"))
        .catch((error) => console.error("Service Worker registration failed:", error));
    }
  }, []);

  return (
    <div>
      <PushNotificationManager />
      <Accueil />
    </div>
  );
};

export default Page;