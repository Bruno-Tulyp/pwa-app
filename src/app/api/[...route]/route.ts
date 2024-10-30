import { generateJob } from "@/app/utils/generate-job"
import { Hono } from "hono"
import { handle } from "hono/vercel"
import webpush, { PushSubscription } from "web-push"

let sub: PushSubscription | null = null

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

const app = new Hono().basePath("/api")

type Job = {
  id: string
  jobName: string
  jobDescription: string
  salary: string
  skills: string[]
  publishDate: string
}

app.get("/jobs", (c) => {
  const jobs: Job[] = []

  for (let i = 0; i < 10; i += 1) {
    jobs.push(generateJob())
  }

  return c.json({ jobs })
})

app.post("/jobs", async (c) => {
  const job = generateJob()

  if (sub) {
    console.log("There is a subscription!")

    const data = {
      title: "New job offer!",
      body: "A new job offer is available, click on the notification to access.",
      route: `http://localhost:3000/jobs/${job.id}`,
    }

    await webpush.sendNotification(sub, JSON.stringify(data), { TTL: 60 })
  }

  return c.json({ job })
})

app.post("/subscribe", async (c) => {
  sub = await c.req.json()

  return c.json({ success: true })
})

app.post("/unsubscribe", (c) => {
  sub = null

  return c.json({ success: true })
})

export const GET = handle(app)
export const POST = handle(app)
