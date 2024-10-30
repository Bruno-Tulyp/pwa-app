"use client"

import { useState, useEffect } from "react"
import { faker } from "@faker-js/faker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface UserProfile {
  name: string
  email: string
  bio: string
  location: string
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)

  useEffect(() => {
    setUser({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      bio: faker.hacker.phrase(),
      location: `${faker.address.city()}, ${faker.address.country()}`,
    })
  }, [])

  if (!user) return null // Render nothing until user data is set

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Profile Header */}
      <Card className="max-w-xl w-full p-6 bg-white shadow-md rounded-lg">
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
          <p className="mt-4 text-gray-700">{user.bio}</p>
          <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 bg-blue-500 text-white">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Personal Information Section */}
      <div className="mt-8 max-w-xl w-full space-y-4">
        <Card className="p-4 bg-white shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <Label className="block text-gray-600">Name</Label>
              <p>{user.name}</p>
            </div>
            <div className="mt-2">
              <Label className="block text-gray-600">Email</Label>
              <p>{user.email}</p>
            </div>
            <div className="mt-2">
              <Label className="block text-gray-600">Location</Label>
              <p>{user.location}</p>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings Section */}
        <Card className="p-4 bg-white shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="mt-2 bg-red-500 text-white">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profile
