"use client";

import useTiptapInitializer from "@/hook/useTiptapInitializer";
import "@/styles/editor.css";
import { EditorContent } from "@tiptap/react";
import { memo } from "react";
import { EditorMenubar } from ".";

export const Editor = memo(() => {
  const { editor } = useTiptapInitializer();

  return (
    <div className="relative w-full rounded-md border border-gray-300">
      <EditorMenubar />
      <EditorContent editor={editor} />
      {/* <TextCounter /> */}
    </div>
  );
});

Editor.displayName = "Editor";
