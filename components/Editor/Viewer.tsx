"use client";

import { EditorContent, HTMLContent, useEditor } from "@tiptap/react";

type ViewerProps = {
  content: HTMLContent;
};

export default function Viewer({ content }: ViewerProps) {
  const editor = useEditor({
    editable: false,
    content,
  });
  return <EditorContent editor={editor} />;
}
