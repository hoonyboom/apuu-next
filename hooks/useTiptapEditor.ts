"use client";

import { EditorConfig } from "@/components/Editor/config";
import { useEditor } from "@tiptap/react";
import { useEffect } from "react";

export default function useTiptapEditor() {
  const editor = useEditor(
    {
      extensions: EditorConfig(),
      content: [`<p>Hello</p>`],
      immediatelyRender: false,
      shouldRerenderOnTransaction: true,
      autofocus: true,
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          spellcheck: "false",
          class: "min-h-full",
        },
      },
    },
    [],
  );

  useEffect(() => {
    window.editor = editor;
  }, [editor]);

  const characterCount: number = editor?.storage.characterCount.characters() || 0;

  return { editor, characterCount };
}
