import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enumValuesMap } from "@/lib/zod.schema";
import { RegisterFormFieldProps } from "./types";

export const RegisterFormSelectBox = ({
  form,
  name,
  label,
  values,
}: RegisterFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      // eslint-disable-next-line react/jsx-no-bind
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value?.toString() ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {enumValuesMap[name]
                ? enumValuesMap[name].map(value => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))
                : values?.map(value => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

RegisterFormSelectBox.displayname = "RegisterFormSelectBox"
