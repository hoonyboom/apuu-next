"use client";

import { ExtensionKit } from "@/components/Editor/extensions";
import { Editor, useEditor } from "@tiptap/react";
import { createContext, PropsWithChildren, useContext } from "react";

type Tiptap = {
  editor: Editor | null;
  characterCount: {
    characters: () => number;
    words: () => number;
  };
};

const EditorContext = createContext<Tiptap>({
  editor: null,
  characterCount: {
    characters: () => 0,
    words: () => 0,
  },
});

export function useTiptap() {
  return useContext(EditorContext);
}

export default function EditorProvider({ children }: PropsWithChildren) {
  const editor = useEditor({
    extensions: ExtensionKit(),
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    autofocus: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false",
        class: "min-h-full",
      },
    },
  });

  const characterCount = editor?.storage.characterCount;

  return (
    <EditorContext.Provider value={{ editor, characterCount }}>
      {children}
    </EditorContext.Provider>
  );
}
