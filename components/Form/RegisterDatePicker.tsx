import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/util";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useCallback } from "react";
import { DateFormatter } from "react-day-picker";
import { RegisterDefaultProps } from "./types";

export const RegisterDatePicker = ({ form }: RegisterDefaultProps) => {
  const onDisabled = useCallback((date: Date) => {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return date < today || date > thirtyDaysFromNow;
  }, []);

  return (
    <FormField
      control={form.control}
      name="deadline"
      // eslint-disable-next-line react/jsx-no-bind
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>모집 마감일</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-64 pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPPP", {locale: ko})
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
                onSelect={field.onChange}
                disabled={onDisabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

RegisterDatePicker.displayname = "RegisterDatePicker";

const formatCaption: DateFormatter = (date: Date) => {
  const formattedDate = format(date, "yyyy년 M월", { locale: ko });
  return <span className="text-sm">{formattedDate}</span>;
};
