import LoginModal from "@/components/Form/LoginModal"
import Link from "next/link"
import { Logo } from "."
import { Button } from "../ui/button"
import Sidebar from "./Sidebar"

export default function Nav() {
  return (
    <nav className="flex h-nav max-w-full items-center justify-between px-4">
      <Logo />
      <div className="flex items-center gap-10">
        <Button asChild className="hidden rounded-xl sm:block">
          <Link href="/register">파티모집</Link>
        </Button>
        <Sidebar />
        <LoginModal />
      </div>
    </nav>
  )
}
