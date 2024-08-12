"use client"

import { useTimer } from "@/hook"
import { cn } from "@/lib/util"
import Image from "next/image"
import { useEffect } from "react"

export default function Transition() {
  const [isTransition] = useTimer(3)

  useEffect(() => {
    const body = document.querySelector("body")!
    if (isTransition) body.style.overflow = "hidden"
    else if (!isTransition) body.style.overflow = ""
    return () => {
      body.style.overflow = ""
    }
  }, [isTransition])

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 size-full min-w-full transform-gpu overflow-hidden transition-transform will-change-transform",
          {
            "animate-page-outside-layer": isTransition,
            hidden: !isTransition,
          },
        )}
      >
        <Image
          src="/assets/images/wave-blue.svg"
          alt="wave blue"
          width={1000}
          height={1000}
          className="w-full object-cover"
        />

        <div className="h-full bg-[#1111d3]" />
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 size-full min-w-full translate-y-full transform-gpu bg-white transition-transform will-change-transform",
          {
            "animate-page-inside-layer": isTransition,
            // "hidden": !isTransition,
          },
        )}
      >
        <Image
          src="/assets/images/wave-white.svg"
          alt="wave white"
          width={1000}
          height={1000}
          className="h-24 w-full -translate-y-full object-cover transition-transform"
        />
        {/* <div className="relative flex size-full scale-150 justify-center">
          <Image
            src="/assets/svgs/letter.svg"
            alt="letter"
            fill
            className="animate-wiggle"
          />
        </div> */}
      </div>
    </>
  )
}
