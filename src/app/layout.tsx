import Header from "@/components/header"
import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-red-50">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="p-8">{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  )
}
