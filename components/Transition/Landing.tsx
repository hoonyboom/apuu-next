"use client";

import useMount from "@/hooks/useMount";
import useTimer from "@/hooks/useTimer";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Landing() {
  const [isExiting, setIsExiting] = useState(false);
  const { isLoading } = useTimer(3);
  const { mount } = useMount();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (!isLoading) {
        const timeout = setTimeout(() => {
          setIsExiting(true);
        }, 1000); // Match this duration with your exit animation duration
        return () => clearTimeout(timeout);
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  if (!mount || isExiting) return null;
  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-50 flex h-full w-full min-w-full flex-col items-center justify-between bg-orange-50 transition duration-1000",
        {
          "animate-in": isLoading,
          "animate-out fade-out-0": !isLoading && !isExiting,
        },
      )}
    >
      <div className="relative flex size-full -translate-y-12 scale-150 justify-center">
        <Image
          src="/assets/svgs/letter.svg"
          alt="letter"
          fill
          className="animate-wiggle"
        />
      </div>
      <div className="relative flex size-full translate-y-[50%] justify-center">
        <Image src="/assets/svgs/hand.svg" alt="hand" fill className="animate-up" />
      </div>
    </div>,
    document.body,
  );
}
