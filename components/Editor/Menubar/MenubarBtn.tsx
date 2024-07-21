import { Button, ButtonProps } from "@/components/ui/button";
import { Icon, IconProps } from "@/components/ui/Icon";
import { cn } from "@/lib/util";
import { forwardRef } from "react";

export type MenubarBtnProps = {
  icon: IconProps["name"];
} & ButtonProps;

export const MenubarBtn = forwardRef<HTMLButtonElement, MenubarBtnProps>(
  ({ children, className, icon, ...props }: MenubarBtnProps, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn("p-0 hover:bg-neutral-100 hover:text-black", className)}
        {...props}
      >
        <Icon name={icon} className="size-4" />
        {children}
      </Button>
    );
  },
);
MenubarBtn.displayName = "MenubarBtn";
