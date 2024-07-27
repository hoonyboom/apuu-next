import useEditorCallbacks from "@/hook/useEditorCallbacks"
import { memo } from "react"
import { MenubarBtn } from "./MenubarBtn"

export const YoutubeBtn = memo(() => {
  const { addYoutubeVideo } = useEditorCallbacks()

  return <MenubarBtn onClick={addYoutubeVideo} icon="Youtube" tooltip="유튜브 링크" />
})

YoutubeBtn.displayName = "YoutubeBtn"
