import useEditorCallbacks from "@/hook/useEditorCallbacks"
import { memo } from "react"
import { MenubarBtn } from "./MenubarBtn"

export const ItalicBtn = memo(() => {
  const { toggleItalic } = useEditorCallbacks()

  return <MenubarBtn onClick={toggleItalic} icon="Italic" tooltip="이탤릭체" />
})

ItalicBtn.displayName = "ItalicBtn"
