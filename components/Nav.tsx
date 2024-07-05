import Link from "next/link";
import LoginModal from "./LoginModal";
import Logo from "./Logo";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 pr-10">
      <Link href="/" className="relative flex place-items-center gap-1 font-bold">
        <Logo />
        puu
      </Link>
      <div className="flex gap-10">
        <Link href="/register" className="justify-self-end">
          팀원 모집하기
        </Link>
        <LoginModal />
      </div>
    </nav>
  );
}
