import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RegisterCheckBoxProps } from "./types";

export const RegisterFormCheckBox = ({
  form,
  name,
  values,
  label,
}: RegisterCheckBoxProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      // eslint-disable-next-line react/jsx-no-bind
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel>{label}</FormLabel>
          </div>
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
                        onCheckedChange={checked => {
                          return checked
                            ? field.onChange(field.value?.push(item))
                            : field.onChange(
                                field.value?.filter(value => value !== item),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item}</FormLabel>
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
