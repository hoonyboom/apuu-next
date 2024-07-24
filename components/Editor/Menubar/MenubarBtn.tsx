import { Button, ButtonProps } from "@/components/ui/button";
import { Icon, IconProps } from "@/components/ui/Icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/util";
import { forwardRef } from "react";

export type MenubarBtnProps = {
  icon: IconProps["name"];
  tooltip: string;
} & ButtonProps;

export const MenubarBtn = forwardRef<HTMLButtonElement, MenubarBtnProps>(
  ({ children, className, tooltip, icon, ...props }: MenubarBtnProps, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent className="text-silk border bg-white text-2xs">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);
MenubarBtn.displayName = "MenubarBtn";
