"use client"

import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AREA } from "@/lib/const"
import { cn } from "@/lib/util"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { RegisterDefaultProps } from "./types"

export function AreaCombobox({ form, isShow, isMobile = false }: RegisterDefaultProps) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={form.control}
      name="area"
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex w-full flex-col transition duration-1000",
            isMobile && isShow && "pointer-events-auto translate-y-0 opacity-100",
            isMobile && !isShow && "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          <FormLabel className="text-xs font-semibold">교류 지역</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between px-3 text-xs",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? field.value : "지역을 선택해주세요"}
                  <CaretSortIcon className="size-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="min-w-[400px] p-0">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>찾을 수 없습니다.</CommandEmpty>
                  <CommandGroup>
                    {AREA.map(v => (
                      <CommandItem
                        key={v}
                        value={v}
                        onSelect={() => {
                          form.setValue("area", v)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            v === field.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {v}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
