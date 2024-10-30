import { generateJob } from "@/app/utils/generate-job"
import { Hono } from "hono"
import { handle } from "hono/vercel"

const app = new Hono().basePath("/api")

type Job = {
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

app.post("/jobs", (c) => c.json({ job: generateJob() }))

export const GET = handle(app)
export const POST = handle(app)
