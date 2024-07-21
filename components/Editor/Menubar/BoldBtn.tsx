import useEditorCallbacks from "@/hooks/useEditorCallbacks";
import { memo } from "react";
import { MenubarBtn } from "./MenubarBtn";

export const BoldBtn = memo(() => {
  const { toggleBold } = useEditorCallbacks();

  return <MenubarBtn icon="Bold" onClick={toggleBold} />;
});

BoldBtn.displayName = "BoldBtn";
