import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { cn } from "@/lib/util"
import { RegisterCheckBoxProps } from "./types"

export const RegisterFormCheckBox = ({
  form,
  label,
  values,
  name,
  isShow,
  isMobile = false,
}: RegisterCheckBoxProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      // eslint-disable-next-line react/jsx-no-bind
      render={() => (
        <FormItem
          className={cn(
            "transition duration-1000",
            isMobile && isShow && "pointer-events-auto translate-y-0 opacity-100",
            isMobile && !isShow && "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          <div className="mb-4 text-xs font-semibold">{label}</div>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          {values.map(item => (
            <FormField
              key={item}
              control={form.control}
              name={name}
              // eslint-disable-next-line react/jsx-no-bind
              render={({ field }) => {
                return (
                  <FormItem key={item} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item)}
                        // eslint-disable-next-line react/jsx-no-bind
                        onCheckedChange={checked => {
                          return checked
                            ? field.onChange([...field.value, item])
                            : field.onChange(field.value?.filter(value => value !== item))
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item}</FormLabel>
                  </FormItem>
                )
              }}
            />
          ))}
        </FormItem>
      )}
    />
  )
}

RegisterFormCheckBox.displayname = "RegisterFormCheckBox"
