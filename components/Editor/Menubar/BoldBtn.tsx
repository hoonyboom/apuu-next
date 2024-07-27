import useEditorCallbacks from "@/hook/useEditorCallbacks"
import { memo } from "react"
import { MenubarBtn } from "./MenubarBtn"

export const BoldBtn = memo(() => {
  const { toggleBold } = useEditorCallbacks()

  return <MenubarBtn icon="Bold" onClick={toggleBold} tooltip="볼드체" />
})

BoldBtn.displayName = "BoldBtn"
