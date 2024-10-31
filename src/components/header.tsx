import { Button } from "@/components/ui/button"
import {
  UserCircleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <nav className="flex flex-row justify-between items-center px-8 py-4 bg-black">
      <Link href="/" className="hover:scale-110 transition duration-200">
        <Image
          alt="logo"
          src="/icon-512x512.png"
          className="bg-secondary p-1 rounded-md"
          width={40}
          height={40}
        />
      </Link>
      <div className="flex flex-row space-x-4">
        <Button variant="secondary" asChild>
          <Link href="/jobs">
            <ClipboardDocumentListIcon />
            List of jobs
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/profile">
            <UserCircleIcon />
            User profile
          </Link>
        </Button>
      </div>
    </nav>
  )
}

export default Header
