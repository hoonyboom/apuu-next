import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex justify-end gap-10 bg-purple-300 p-4 pr-10">
      <Link href="/" className="flex-1 font-bold">
        Apuu
      </Link>
      <Link href="/register">모집하기</Link>
      <Link href="/login">로그인</Link>
    </nav>
  );
}
