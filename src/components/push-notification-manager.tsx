"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BellAlertIcon,
  BellSlashIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"

const PushNotificationManager = () => {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  )

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  const registerServiceWorker = async () => {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    })

    const sub = await registration.pushManager.getSubscription()

    setSubscription(sub)
  }

  const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready

    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    })

    await fetch("http://localhost:3000/api/subscribe", {
      method: "POST",
      body: JSON.stringify(sub),
      headers: {
        "Content-Type": "application/json",
      },
    })

    setSubscription(sub)
  }

  const unsubscribeFromPush = async () => {
    await subscription?.unsubscribe()

    setSubscription(null)

    await fetch("http://localhost:3000/api/unsubscribe", {
      method: "POST",
    })
  }

  if (!isSupported) {
    return (
      <p className="bg-card px-6 py-4 rounded-md w-fit font-medium flex flex-row gap-2 items-center border">
        <FaceFrownIcon className="size-6" />
        Push notifications are not supported in this browser.
      </p>
    )
  }

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Push Notifications Panel</CardTitle>
        <CardDescription>
          {subscription
            ? "You are subscribed to push notifications."
            : "You are not subscribed to push notifications."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {subscription ? (
            <Button onClick={unsubscribeFromPush} className="w-fit">
              <BellSlashIcon />
              Unsubscribe
            </Button>
          ) : (
            <Button onClick={subscribeToPush} className="w-fit">
              <BellAlertIcon />
              Subscribe
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PushNotificationManager
