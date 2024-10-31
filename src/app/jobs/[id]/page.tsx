"use client"

import { Job } from "@/app/api/[...route]/route"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ArrowPathIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
  const { id } = useParams<{ id: string }>()

  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)

    const jobs = localStorage.getItem("jobs")

    if (!jobs) {
      return
    }

    const parsedJobs: Job[] = JSON.parse(jobs)

    const potentialJob = parsedJobs.find(({ id: jobId }) => jobId === id)

    if (potentialJob) {
      setJob(potentialJob)
    }
  }, [])

  if (isLoading) {
    return (
      <p className="bg-card px-6 py-4 rounded-md w-fit font-medium flex flex-row gap-2 items-center border">
        <ArrowPathIcon className="size-6 animate-spin" />
        Loading...
      </p>
    )
  }

  if (!job) {
    return (
      <p className="bg-card px-6 py-4 rounded-md w-fit font-medium flex flex-row gap-2 items-center border">
        <InformationCircleIcon className="size-6" />
        This job offer does not exist!
      </p>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-1">
            <CardTitle>{job.jobName}</CardTitle>
            <CardDescription>Job ID: {job.id}</CardDescription>
          </div>

          <Badge className="flex flex-row items-center gap-2">
            <CalendarIcon className="size-3" />
            {job.publishDate}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <CurrencyDollarIcon className="size-6" />
          <span className="font-semibold">{job.salary}</span>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="size-6" />
            <span className="font-semibold">Job Description</span>
          </div>
          <p className="text-justify">{job.jobDescription}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <CheckBadgeIcon className="size-6" />
            <span className="font-semibold">Required Skills</span>
          </div>
          <div className="flex flex-row space-x-2">
            {job.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Page
