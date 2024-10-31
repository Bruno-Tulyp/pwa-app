"use client"

import { Job } from "@/app/api/[...route]/route"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { faker } from "@faker-js/faker"
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface UserProfile {
  name: string
  email: string
  bio: string
  location: string
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null)

  const handleAddNewJob = async () => {
    const res = await fetch("http://localhost:3000/api/jobs", {
      method: "POST",
    })

    if (res.ok) {
      toast.success("New job offer added successfully!")

      const { job }: { job: Job } = await res.json()

      const jobs = localStorage.getItem("jobs")

      if (!jobs) {
        localStorage.setItem("jobs", JSON.stringify([job]))

        return
      }

      const parsedJobs: Job[] = JSON.parse(jobs)

      localStorage.setItem("jobs", JSON.stringify([...parsedJobs, job]))
    }
  }

  useEffect(() => {
    setUser({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      bio: faker.hacker.phrase(),
      location: `${faker.location.city()}, ${faker.location.country()}`,
    })
  }, [])

  if (!user) return null

  return (
    <div className="flex flex-col space-y-4 items-center">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={faker.image.avatar()} alt="User Avatar" />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {user.name}
              </CardTitle>
              <p className="text-gray-500">{user.location}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <p className="mt-4 text-gray-700">{user.bio}</p>
            <div className="flex flex-wrap justify-between items-center space-y-2">
              <div className="flex flex-row space-x-2">
                <Button className="w-fit flex items-center space-x-2">
                  <PencilSquareIcon />
                  <span>Edit Profile</span>
                </Button>
                <Button
                  onClick={handleAddNewJob}
                  className="flex items-center space-x-2"
                >
                  <PlusIcon />
                  <span>Add New Job</span>
                </Button>
              </div>
              <Button
                variant="destructive"
                className="flex items-center space-x-2 w-full sm:w-auto"
              >
                <TrashIcon />
                <span>Delete Account</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Only visible on read-only</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div>
              <Label>Name :</Label>
              <p>{user.name}</p>
            </div>
            <div>
              <Label>Email :</Label>
              <p>{user.email}</p>
            </div>
            <div>
              <Label>Location :</Label>
              <p>{user.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
