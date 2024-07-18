import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MenubarBtn({ children, className, ...props }: ButtonProps) {
  return (
    <Button variant="outline" className={cn("", className)} {...props}>
      {children}
    </Button>
  );
}
