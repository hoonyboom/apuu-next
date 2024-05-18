import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { PropsWithChildren } from "react";

type MaxWidthWrapperProps = {
  className?: ClassValue;
};

export default function MaxWidthWrapper({
  className,
  children,
}: PropsWithChildren<MaxWidthWrapperProps>) {
  return (
    <div className={cn("mx-auto h-full w-full max-w-screen-xl px-2 md:px-20", className)}>
      {children}
    </div>
  );
}
