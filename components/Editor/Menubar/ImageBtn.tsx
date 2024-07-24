import useEditorCallbacks from "@/hook/useEditorCallbacks";
import { memo } from "react";
import { MenubarBtn } from "./MenubarBtn";

export const ImageBtn = memo(() => {
  const { setImage } = useEditorCallbacks();

  return <MenubarBtn icon="Image" onClick={setImage} tooltip="이미지" />;
});

ImageBtn.displayName = "ImageBtn";
