import { Icon } from "@/components/ui/Icon"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/util"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { useCallback, useState } from "react"
import { DateFormatter } from "react-day-picker"
import { RegisterDefaultProps } from "./types"

export const RegisterDatePicker = ({
  form,
  isShow,
  isMobile = false,
}: RegisterDefaultProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const onDisabled = useCallback((date: Date) => {
    const today = new Date()
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)
    return date < today || date > thirtyDaysFromNow
  }, [])

  return (
    <FormField
      control={form.control}
      name="deadline"
      // eslint-disable-next-line react/jsx-no-bind
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-col transition duration-1000",
            isMobile && isShow && "pointer-events-auto translate-y-0 opacity-100",
            isMobile && !isShow && "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          <FormLabel className="text-xs font-semibold">모집 마감일</FormLabel>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left text-xs font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPPP", { locale: ko })
                  ) : (
                    <span>마감일을 선택해주세요</span>
                  )}
                  <Icon name="Calendar" className="ml-auto size-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={ko}
                formatters={{ formatCaption }}
                mode="single"
                selected={field.value}
                onSelect={e => {
                  field.onChange(e)
                  setCalendarOpen(false)
                }}
                disabled={onDisabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}

RegisterDatePicker.displayname = "RegisterDatePicker"

const formatCaption: DateFormatter = (date: Date) => {
  const formattedDate = format(date, "yyyy년 M월", { locale: ko })
  return <span className="text-sm">{formattedDate}</span>
}
