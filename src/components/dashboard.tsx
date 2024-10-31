"use client"

import { Job } from "@/app/api/[...route]/route"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EyeIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useEffect, useState } from "react"

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const localJobs = localStorage.getItem("jobs")

    if (localJobs) {
      setJobs(JSON.parse(localJobs))

      return
    }

    const fetchJobs = async () => {
      const res = await fetch("http://localhost:3000/api/jobs")

      if (res.ok) {
        const { jobs }: { jobs: Job[] } = await res.json()

        localStorage.setItem("jobs", JSON.stringify(jobs))

        setJobs(jobs)
      }
    }

    fetchJobs()
  }, [])

  return (
    <Table className="bg-card overflow-hidden rounded-md">
      <TableCaption>A list of the available jobs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Publish Date</TableHead>
          <TableHead>Job Name</TableHead>
          <TableHead>Job Description</TableHead>
          <TableHead className="text-right">Salary</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map(({ id, publishDate, jobName, jobDescription, salary }) => (
          <TableRow key={id}>
            <TableCell>{publishDate}</TableCell>
            <TableCell>{jobName}</TableCell>
            <TableCell className="truncate max-w-96">
              {jobDescription}
            </TableCell>
            <TableCell className="text-right">{salary}</TableCell>
            <TableCell className="text-right">
              <Button asChild>
                <Link href={`/jobs/${id}`}>
                  <EyeIcon />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Dashboard
