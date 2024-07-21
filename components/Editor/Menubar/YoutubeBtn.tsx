import useEditorCallbacks from "@/hooks/useEditorCallbacks";
import { memo } from "react";
import { MenubarBtn } from "./MenubarBtn";

export const YoutubeBtn = memo(() => {
  const { addYoutubeVideo } = useEditorCallbacks();

  return <MenubarBtn onClick={addYoutubeVideo} icon="Youtube" />;
});

YoutubeBtn.displayName = "YoutubeBtn";
