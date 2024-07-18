import LoginModal from "@/components/Form/LoginModal";
import Link from "next/link";
import { Logo, Menu } from ".";

export default function Nav() {
  return (
    <nav className="mb-5 flex max-w-full items-center justify-between px-4 py-2">
      <div className="relative flex place-items-center gap-1 font-bold">
        <Logo />
        <span className="hidden sm:block">puu</span>
      </div>
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
