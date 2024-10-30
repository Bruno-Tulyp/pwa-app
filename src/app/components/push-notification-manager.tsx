"use client"

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

  const testNotification = async () =>
    await fetch("http://localhost:3000/api/jobs", { method: "POST" })

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }

  return (
    <div className="m-10 bg-neutral-100 border border-neutral-300 w-fit p-10 rounded-xl flex flex-col space-y-4">
      <h3 className="text-xl">Push Notifications Panel</h3>
      <div className="flex flex-col space-y-2">
        {subscription ? (
          <>
            <p>You are subscribed to push notifications.</p>
            <div className="flex flex-row space-x-2">
              <button
                className="bg-black px-4 py-2 rounded-lg text-white font-bold"
                onClick={unsubscribeFromPush}
              >
                Unsubscribe
              </button>
              <button
                className="bg-blue-500 px-4 py-2 rounded-lg text-white font-bold"
                onClick={testNotification}
              >
                Send Test Notification
              </button>
            </div>
          </>
        ) : (
          <>
            <p>You are not subscribed to push notifications.</p>
            <button
              className="bg-black px-4 py-2 rounded-lg text-white font-bold"
              onClick={subscribeToPush}
            >
              Subscribe
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PushNotificationManager
