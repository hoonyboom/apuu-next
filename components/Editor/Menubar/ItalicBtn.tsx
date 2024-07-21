import useEditorCallbacks from "@/hooks/useEditorCallbacks";
import { memo } from "react";
import { MenubarBtn } from "./MenubarBtn";

export const ItalicBtn = memo(() => {
  const { toggleItalic } = useEditorCallbacks();

  return <MenubarBtn onClick={toggleItalic} icon="Italic" />;
});

ItalicBtn.displayName = "ItalicBtn";
