"use client";

import { useEditorStore } from "@/store/editor.store";
import { DependencyList, useCallback } from "react";

export default function useEditorCallbacks(deps: DependencyList = []) {
  const { editor } = useEditorStore();

  const toggleBlockquote = useCallback(
    () => editor?.chain().focus().toggleBlockquote().run(),
    [editor, ...deps],
  );
  const toggleBold = useCallback(
    () => editor?.chain().focus().toggleBold().run(),
    [editor, ...deps],
  );
  const toggleItalic = useCallback(
    () => editor?.chain().focus().toggleItalic().run(),
    [editor, ...deps],
  );
  const toggleTaskList = useCallback(
    () => editor?.chain().focus().toggleTaskList().run(),
    [editor, ...deps],
  );
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    else if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor, ...deps]);

  const addYoutubeVideo = useCallback(() => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  }, [editor, ...deps]);

  const onChangeColor = useCallback(
    (color: string) => editor?.chain().setColor(color).run(),
    [editor],
  );
  const onClearColor = useCallback(
    () => editor?.chain().focus().unsetColor().run(),
    [editor],
  );

  const onChangeHighlight = useCallback(
    (color: string) => editor?.chain().setHighlight({ color }).run(),
    [editor],
  );
  const onClearHighlight = useCallback(
    () => editor?.chain().focus().unsetHighlight().run(),
    [editor],
  );

  return {
    toggleBlockquote,
    toggleBold,
    toggleItalic,
    toggleTaskList,
    setLink,
    addYoutubeVideo,
    onChangeColor,
    onClearColor,
    onChangeHighlight,
    onClearHighlight,
  };
}
