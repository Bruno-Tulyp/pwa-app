"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge" // Import the Badge component
import { generateJob } from "@/app/utils/generate-job"
import { Job } from "@/app/api/[...route]/route"

const Page = () => {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)

  useEffect(() => {
    const generatedJob = generateJob()
    setJob(generatedJob)
  }, [id])

  if (!job) return <p className="text-center text-gray-500 mt-8">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Job Details - {job.jobName}
      </h1>
      <Table className="bg-card overflow-hidden rounded-md">
        <TableCaption>Details of the selected job position.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Detail</TableHead>
            <TableHead>Information</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b border-gray-200">
            <TableCell className="font-medium text-gray-700 px-4 py-3">
              Job Name
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-800">
              {job.jobName}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-gray-200">
            <TableCell className="font-medium text-gray-700 px-4 py-3">
              Publish Date
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-800">
              {job.publishDate}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-gray-200">
            <TableCell className="font-medium text-gray-700 px-4 py-3">
              Job Description
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-800">
              {job.jobDescription}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-gray-200">
            <TableCell className="font-medium text-gray-700 px-4 py-3">
              Skills
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-800">
              {/* Render each skill as a badge */}
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} className="bg-black text-white">
                    {skill}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium text-gray-700 px-4 py-3">
              Salary
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-800">
              {job.salary}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Page
