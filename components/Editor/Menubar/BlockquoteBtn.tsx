import { memo } from "react";
import useEditorCallbacks from "@/hooks/useEditorCallbacks";
import { MenubarBtn } from "./MenubarBtn";

export const BlockquoteBtn = memo(() => {
  const { toggleBlockquote } = useEditorCallbacks();

  return <MenubarBtn icon="Quote" onClick={toggleBlockquote} />;
});

BlockquoteBtn.displayName = "BlockquoteBtn";
