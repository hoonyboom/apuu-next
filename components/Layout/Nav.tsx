import LoginModal from "@/components/Form/LoginModal";
import Link from "next/link";
import { Logo, Menu } from ".";

export default function Nav() {
  return (
    <nav className="flex h-nav max-w-full items-center justify-between px-4">
      <Logo />
      <div className="flex items-center gap-10">
        <Link href="/register" className="hidden sm:block">
          팀원 모집하기
        </Link>
        <Menu />
        <LoginModal />
      </div>
    </nav>
  );
}
