"use client"

import { useEditorStore } from "@/store/editor.store"
import { useCallback } from "react"

export default function useEditorCallbacks() {
  const { editor } = useEditorStore()

  const toggleBold = useCallback(
    () => editor?.chain().focus().toggleBold().run(),
    [editor],
  )
  const toggleItalic = useCallback(
    () => editor?.chain().focus().toggleItalic().run(),
    [editor],
  )
  const toggleTaskList = useCallback(
    () => editor?.chain().focus().toggleTaskList().run(),
    [editor],
  )
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href
    const url = prompt("URL", previousUrl)

    if (url === null) return
    else if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  const addYoutubeVideo = useCallback(() => {
    const url = prompt("Enter YouTube URL")

    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
      })
    }
  }, [editor])

  const setImage = useCallback(() => {
    editor?.chain().focus().setImageUpload().run()
  }, [editor])

  const setSeparator = useCallback(() => {
    editor?.chain().focus().setHorizontalRule().run()
  }, [editor])

  const setUndo = useCallback(() => {
    editor?.chain().focus().undo().run()
  }, [editor])

  const setRedo = useCallback(() => {
    editor?.chain().focus().redo().run()
  }, [editor])

  const onChangeColor = useCallback(
    (color: string) => editor?.chain().setColor(color).run(),
    [editor],
  )
  const onClearColor = useCallback(
    () => editor?.chain().focus().unsetColor().run(),
    [editor],
  )

  const onChangeHighlight = useCallback(
    (color: string) => editor?.chain().setHighlight({ color }).run(),
    [editor],
  )
  const onClearHighlight = useCallback(
    () => editor?.chain().focus().unsetHighlight().run(),
    [editor],
  )

  return {
    setImage,
    setLink,
    setUndo,
    setRedo,
    setSeparator,
    toggleBold,
    toggleItalic,
    toggleTaskList,
    addYoutubeVideo,
    onChangeColor,
    onClearColor,
    onChangeHighlight,
    onClearHighlight,
  }
}
