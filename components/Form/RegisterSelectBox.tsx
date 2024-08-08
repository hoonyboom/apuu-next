import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/util"
import { RegisterFormFieldProps } from "./types"

export const RegisterFormSelectBox = ({
  form,
  name,
  label,
  values,
  unit,
  isShow,
  isMobile = false,
}: RegisterFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      // eslint-disable-next-line react/jsx-no-bind
      render={({ field }) => (
        <FormItem
          className={cn(
            "transition duration-1000",
            isMobile && isShow && "pointer-events-auto translate-y-0 opacity-100",
            isMobile && !isShow && "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          <FormLabel className={"mb-3 text-xs font-semibold"}>{label}</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                unit-value={unit}
                className={cn(
                  "relative text-xs hover:bg-accent hover:text-accent-foreground focus:ring-0",
                  !field.value && "text-muted-foreground",
                )}
              >
                <SelectValue placeholder="Select">
                  {!form.getFieldState(field.name).isDirty
                    ? "Select"
                    : field.name === "size" && unit
                      ? field.value + unit
                      : field.value}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values?.map(value => (
                <SelectItem
                  key={value}
                  value={value.toString()}
                  unit-value={unit}
                  className={cn(
                    "hover:text-primary-foreground",
                    typeof value === "number" &&
                      unit &&
                      "after:content-[attr(unit-value)]",
                  )}
                >
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}

RegisterFormSelectBox.displayname = "RegisterFormSelectBox"
