import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon, IconProps } from "@/components/ui/Icon";
import { useMemo } from "react";
import { MenubarBtn } from "./MenubarBtn";

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: "option";
  disabled: () => boolean | undefined;
  isActive: () => boolean | undefined;
  onClick: () => void;
  icon: IconProps["name"];
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: "category";
};

export type ContentPickerOptions = Array<
  ContentTypePickerOption | ContentTypePickerCategory
>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerOption => option.type === "option";
const isCategory = (
  option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerCategory => option.type === "category";

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(
    () => options.find(option => option.type === "option" && option.isActive()),
    [options],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenubarBtn
          icon={(activeItem?.type === "option" && activeItem.icon) || "Pilcrow"}
        >
          <Icon name="ChevronDown" className="size-2" />
        </MenubarBtn>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild>
        <DropdownMenuItem className="flex flex-col items-start gap-1 px-2 py-4">
          {options.map(option => {
            if (isOption(option)) {
              return (
                <Button
                  key={option.id}
                  className="flex items-center gap-1"
                  onClick={option.onClick}
                >
                  <Icon name={option.icon} className="mr-1 h-4 w-4" />
                  {option.label}
                </Button>
              );
            } else if (isCategory(option)) {
              return (
                <div className="mt-2 text-sm first:mt-0" key={option.id}>
                  <DropdownMenuLabel key={option.id}>{option.label}</DropdownMenuLabel>
                </div>
              );
            }
          })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
