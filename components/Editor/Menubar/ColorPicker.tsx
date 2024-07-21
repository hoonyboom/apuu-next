import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";
import { themeColors } from "@/lib/const";
import { cn } from "@/lib/util";
import { ChangeEvent, memo, useCallback, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ColorBtn } from "./ColorBtn";

export type ColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
};

export const ColorPicker = memo(
  ({ color = "#000000", onChange, onClear }: ColorPickerProps) => {
    const [colorInputValue, setColorInputValue] = useState(color || "");

    const handleColorUpdate = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setColorInputValue(e.target.value);
      },
      [setColorInputValue],
    );

    const handleColorChange = useCallback(() => {
      const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);

      if (!isCorrectColor) {
        if (onChange) {
          onChange("");
        }
        return;
      }

      if (onChange) {
        onChange(colorInputValue);
      }
    }, [colorInputValue, onChange]);

    return (
      <div className="flex flex-col gap-2">
        <HexColorPicker className="w-full" color={color || ""} onChange={onChange} />
        <input
          type="text"
          className="w-full rounded border border-neutral-200 bg-white p-2 text-black focus:outline-1 focus:outline-neutral-300 focus:ring-0 dark:border-neutral-800 dark:bg-black dark:text-white dark:focus:outline-neutral-700"
          placeholder="#000000"
          value={colorInputValue}
          onChange={handleColorUpdate}
          onBlur={handleColorChange}
        />
        <div className="flex flex-wrap items-center gap-1">
          {themeColors.map(currentColor => (
            <ColorBtn
              active={currentColor === color}
              color={currentColor}
              key={currentColor}
              onColorChange={onChange}
            />
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className={cn(
              "flex items-center justify-center rounded p-px hover:bg-neutral-100 hover:text-black",
            )}
          >
            <Icon name="Undo" />
          </Button>
        </div>
      </div>
    );
  },
);

ColorPicker.displayName = "ColorPicker";
