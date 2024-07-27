import { Button } from "@/components/ui/button"
import { cn } from "@/lib/util"
import { memo, useCallback } from "react"

export type ColorButtonProps = {
  color: string
  active: boolean
  onColorChange?: (color: string) => void // eslint-disable-line no-unused-vars
}

export const ColorBtn = memo(({ active, color, onColorChange }: ColorButtonProps) => {
  const handleClick = useCallback(() => {
    if (onColorChange) {
      onColorChange(color || "")
    }
  }, [onColorChange, color])

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={handleClick}
      className={cn(
        "group flex size-7 items-center justify-center rounded",
        !active && "hover:bg-neutral-100",
        active && "bg-neutral-100 hover:!bg-none",
      )}
    >
      <div
        style={{ backgroundColor: color, color }}
        className={cn(
          "size-4 rounded bg-slate-100 shadow-sm ring-current ring-offset-2",
          !active && `hover:ring-1`,
          active && `ring-1`,
        )}
      />
    </Button>
  )
})

ColorBtn.displayName = "ColorBtn"
