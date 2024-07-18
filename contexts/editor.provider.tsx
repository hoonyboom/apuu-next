"use client";

import { Editor } from "@tiptap/react";
import { createContext, PropsWithChildren, useContext } from "react";

const EditorContext = createContext<{ editor: Editor | null }>({ editor: null });

export function useCurrentEditor() {
  return useContext(EditorContext);
}

export default function EditorProvider({ children }: PropsWithChildren) {
  const editor = window.editor;

  return <EditorContext.Provider value={{ editor }}>{children}</EditorContext.Provider>;
}
