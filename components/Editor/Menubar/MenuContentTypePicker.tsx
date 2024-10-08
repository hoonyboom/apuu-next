import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icon, IconProps } from "@/components/ui/Icon"
import { memo, useMemo } from "react"
import { MenubarBtn } from "./MenubarBtn"

export type ContentTypePickerOption = {
  label: string
  id: string
  type: "option"
  disabled: () => boolean | undefined
  isActive: () => boolean | undefined
  onClick: () => void
  icon: IconProps["name"]
}

export type ContentTypePickerCategory = {
  label: string
  id: string
  type: "category"
}

export type ContentPickerOptions = Array<
  ContentTypePickerOption | ContentTypePickerCategory
>

export type ContentTypePickerProps = {
  options: ContentPickerOptions
}

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerOption => option.type === "option"
const isCategory = (
  option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerCategory => option.type === "category"

export const ContentTypePicker = memo(({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(
    () => options.find(option => option.type === "option" && option.isActive()),
    [options],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenubarBtn
          tooltip="문단 설정"
          icon={(activeItem?.type === "option" && activeItem.icon) || "Pilcrow"}
        >
          <Icon name="ChevronDown" className="size-2" />
        </MenubarBtn>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild className="bg-white">
        <DropdownMenuItem className="flex flex-col items-start gap-1 bg-white px-2 py-4">
          {options.map(option => {
            if (isOption(option)) {
              return (
                <Button
                  key={option.id}
                  variant="ghost"
                  className="flex w-full items-center justify-start gap-1 hover:bg-accent"
                  onClick={option.onClick}
                >
                  <Icon name={option.icon} className="mr-1 h-4 w-4" />
                  {option.label}
                </Button>
              )
            } else if (isCategory(option)) {
              return (
                <div className="mt-2 first:mt-0" key={option.id}>
                  <DropdownMenuLabel className="text-xs" key={option.id}>
                    {option.label}
                  </DropdownMenuLabel>
                </div>
              )
            }
          })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
ContentTypePicker.displayName = "ContentTypePicker"
