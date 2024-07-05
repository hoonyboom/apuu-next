import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/assets/svgs/logo-fish.svg"
      alt="Apuu Logo"
      fill
      className="!relative max-w-10"
    />
  );
}
