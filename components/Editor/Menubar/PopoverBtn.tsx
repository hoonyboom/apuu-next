import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PropsWithChildren } from "react";
import { MenubarBtn, MenubarBtnProps } from "./MenubarBtn";

export default function PopoverBtn({
  icon,
  className,
  children,
  ...props
}: PropsWithChildren<MenubarBtnProps>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenubarBtn icon={icon} {...props} />
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
}
