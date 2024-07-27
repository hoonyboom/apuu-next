import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/util"
import { useEditorStore } from "@/store/editor.store"
import { useMemo } from "react"
import { limit } from "./extensions"

export default function TextCounter() {
  const { editor } = useEditorStore()
  const characterCount: number = editor?.storage.characterCount.characters()
  const wordCount = editor?.storage.characterCount.words()
  const percentage = useMemo(
    () => Math.round((100 / limit) * characterCount),
    [characterCount],
  )

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "absolute bottom-0 right-0 mb-1 mr-1 flex items-center text-2xs [&_svg]:text-emerald-500",
            characterCount === limit && "text-red-500 [&_svg]:text-red-500",
          )}
        >
          <svg height="20" width="20" viewBox="0 0 20 20">
            <circle r="10" cx="10" cy="10" fill="#e9ecef" />
            <circle
              r="5"
              cx="10"
              cy="10"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
              transform="rotate(-90) translate(-20)"
            />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col">
          <span>
            {characterCount} / {limit} characters
          </span>
          <span>{wordCount} words</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
