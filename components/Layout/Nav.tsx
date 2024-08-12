import LoginModal from "@/components/Form/LoginModal"
import Link from "next/link"
import { Logo } from "."
import Sidebar from "./Sidebar"

export default function Nav() {
  return (
    <nav className="flex h-nav max-w-full items-center justify-between px-4">
      <Logo />
      <div className="flex items-center gap-10">
        <Link href="/register" className="hidden sm:block">
          파티모집
        </Link>
        <Sidebar />
        <LoginModal />
      </div>
    </nav>
  )
}
