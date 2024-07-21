import useEditorCallbacks from "@/hooks/useEditorCallbacks";
import { memo } from "react";
import { MenubarBtn } from "./MenubarBtn";

export const LinkBtn = memo(() => {
  const { setLink } = useEditorCallbacks();

  return <MenubarBtn onClick={setLink} icon="Link2" />;
});

LinkBtn.displayName = "LinkBtn";
