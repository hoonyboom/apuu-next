import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterCheckBoxProps } from "./types";

export const RegisterFormCheckBox = ({
  form,
  label,
  values,
  name,
}: RegisterCheckBoxProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      // eslint-disable-next-line react/jsx-no-bind
      render={() => (
        <FormItem>
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
                            : field.onChange(
                                field.value?.filter(value => value !== item),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item}</FormLabel>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}
        </FormItem>
      )}
    />
  );
};

RegisterFormCheckBox.displayname = "RegisterFormCheckBox";
