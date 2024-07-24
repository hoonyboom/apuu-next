"use client";

import { Separator } from "@/components/ui/separator";
import { useContentTypes } from "@/hook/useContentType";
import useEditorCallbacks from "@/hook/useEditorCallbacks";
import { useEditorStates } from "@/hook/useEditorStates";
import { BoldBtn } from "./BoldBtn";
import { ColorPicker } from "./ColorPicker";
import { ImageBtn } from "./ImageBtn";
import { ItalicBtn } from "./ItalicBtn";
import { LinkBtn } from "./LinkBtn";
import { ContentTypePicker } from "./MenuContentTypePicker";
import PopoverBtn from "./PopoverBtn";
import { YoutubeBtn } from "./YoutubeBtn";

export default function EditorMenubar() {
  const commands = useEditorCallbacks();
  const states = useEditorStates();
  const blockOptions = useContentTypes();

  return (
    <div className="flex h-10 items-center gap-2 border-b border-gray-200 px-2 py-2">
      <ContentTypePicker options={blockOptions} />
      <Separator orientation="vertical" className="h-full" />
      <BoldBtn />
      <ItalicBtn />
      <YoutubeBtn />
      <LinkBtn />
      <ImageBtn />
      <PopoverBtn icon="Palette" tooltip="폰트 색상">
        <ColorPicker
          color={states.currentColor}
          onChange={commands.onChangeColor}
          onClear={commands.onClearColor}
        />
      </PopoverBtn>
      <PopoverBtn icon="Highlighter" tooltip="형광펜">
        <ColorPicker
          color={states.currentHighlight}
          onChange={commands.onChangeHighlight}
          onClear={commands.onClearHighlight}
        />
      </PopoverBtn>
    </div>
  );
}
