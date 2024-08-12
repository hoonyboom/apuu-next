import { cn } from "@/lib/util"
import Image, { ImageProps } from "next/image"
import Link from "next/link"

export type LogoProps = Partial<ImageProps>

export default function Logo({
  className,
  alt = "Apuu Logo",
  src = "/assets/svgs/logo.svg",
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
          priority
          {...props}
        />
        <span className="hidden font-dovemayo text-lg sm:block">푸</span>
      </div>
    </Link>
  )
}
