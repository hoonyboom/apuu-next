import { cn } from "@/lib/util";
import { HTMLProps, forwardRef } from "react";

export const Spinner = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        className={cn(
          "animate-spin h-4 w-4 rounded-full border-2 border-current border-t-transparent",
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);

Spinner.displayName = "Spinner";
