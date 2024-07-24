import useEditorCallbacks from "@/hook/useEditorCallbacks";
import { memo } from "react";
import { MenubarBtn } from "./MenubarBtn";

export const LinkBtn = memo(() => {
  const { setLink } = useEditorCallbacks();

  return <MenubarBtn onClick={setLink} icon="Link2" tooltip="사이트 링크" />;
});

LinkBtn.displayName = "LinkBtn";
