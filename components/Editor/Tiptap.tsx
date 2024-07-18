"use client";

import { useTiptapEditor } from "@/hooks";
import "@/styles/editor.css";
import { EditorContent } from "@tiptap/react";
import Menubar from "./Menubar";
import TextCounter from "./TextCounter";

export default function Tiptap() {
  const { editor, characterCount } = useTiptapEditor();

  if (!editor) return null;
  else
    return (
      <>
        <Menubar />
        <TextCounter editor={editor} characterCount={characterCount} />
        <EditorContent editor={editor} />
      </>
    );
}
