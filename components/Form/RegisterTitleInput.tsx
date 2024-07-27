import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { RegisterDefaultProps } from "./types";

export const RegisterTitleInput = ({ form }: RegisterDefaultProps) => {
  return (
    <FormField
      control={form.control}
      name="title"
      // eslint-disable-next-line react/jsx-no-bind
      render={({ field }) => (
        <FormItem className="flex items-center space-y-0 rounded-md border focus-within:ring-2 focus-within:ring-blue-300">
          <VisuallyHidden>
            <FormLabel>제목</FormLabel>
          </VisuallyHidden>
          <FormControl>
            <Input
              {...field}
              placeholder="제목을 입력해주세요"
              className="h-10 w-full border-none bg-transparent py-0 shadow-none focus-visible:bg-transparent focus-visible:ring-0"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

RegisterTitleInput.displayname = "RegisterTitleInput";
