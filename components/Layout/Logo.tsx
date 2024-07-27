import { cn } from "@/lib/util"
import Image from "next/image"
import Link from "next/link"
import { LogoProps } from "./types"

export default function Logo({
  className,
  alt = "Apuu Logo",
  src = "/assets/svgs/logo-fish.svg",
  ...props
}: LogoProps) {
  return (
    <Link href="/">
      <div className="relative flex place-items-center gap-1 font-bold">
        <Image
          height={32}
          width={32}
          className={cn("size-10", className)}
          alt={alt}
          src={src}
          {...props}
        />
        <span className="hidden sm:block">puu</span>
      </div>
    </Link>
  )
}
