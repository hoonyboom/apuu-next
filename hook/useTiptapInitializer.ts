import { ExtensionKit } from "@/components/Editor/extensions";
import { useEditorStore } from "@/store/editor.store";
import { useEditor } from "@tiptap/react";
import { useEffect } from "react";

export default function useTiptapInitializer() {
  const { setEditor } = useEditorStore();
  const editor = useEditor(
    {
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
    },
    [],
  );

  useEffect(() => {
    if (editor) setEditor(editor);
  }, [editor]);

  return { editor };
}
