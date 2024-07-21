import { cn } from "@/lib/util";
import { icons } from "lucide-react";
import { HTMLProps, memo } from "react";

export type IconProps = {
  name: keyof typeof icons;
  strokeWidth?: number;
} & HTMLProps<SVGSVGElement>;

export const Icon = memo(({ name, className, strokeWidth, ...props }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) return null;
  return (
    <IconComponent
      className={cn("size-5", className)}
      strokeWidth={strokeWidth || 1.5}
      {...props}
    />
  );
});

Icon.displayName = "Icon";
