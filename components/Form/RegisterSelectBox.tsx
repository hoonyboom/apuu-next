import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/util";
import { RegisterFormFieldProps } from "./types";

export const RegisterFormSelectBox = ({
  form,
  name,
  label,
  values,
  unit,
}: RegisterFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      // eslint-disable-next-line react/jsx-no-bind
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mb-3 text-xs font-semibold">{label}</FormLabel>
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
              {values?.map(value => (
                    <SelectItem
                      key={value}
                      value={value.toString()}
                      unit-value={unit}
                      className={cn(
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
  );
};

RegisterFormSelectBox.displayname = "RegisterFormSelectBox";
