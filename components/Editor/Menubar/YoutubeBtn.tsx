import { useCurrentEditor } from "@/contexts/editor.provider";
import { useCallback, useState } from "react";
import MenubarBtn from "./MenubarBtn";

export default function YoutubeBtn() {
  const { editor } = useCurrentEditor();
  const [height, setHeight] = useState(480);
  const [width, setWidth] = useState(640);

  const addYoutubeVideo = useCallback(() => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, width) || 640,
        height: Math.max(180, height) || 480,
      });
    }
  }, [editor]);

  return <MenubarBtn onClick={addYoutubeVideo}>Youtube</MenubarBtn>;
}
