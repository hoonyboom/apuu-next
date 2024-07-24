import { isTextSelected } from "@/lib/util";
import { useEditorStore } from "@/store/editor.store";
import { Editor as CoreEditor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { useCallback } from "react";

export interface ShouldShowProps {
  editor?: CoreEditor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
}

export const useEditorStates = () => {
  const { editor } = useEditorStore();

  const shouldShow = useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (!view) return false;

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement;
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement;
      const node = nodeDOM || domAtPos;

      // if (isCustomNodeSelected(editor, node)) {
      //   return false;
      // }

      if (!editor) return;
      return isTextSelected({ editor });
    },
    [editor],
  );

  return {
    isBold: editor?.isActive("bold"),
    isItalic: editor?.isActive("italic"),
    isStrike: editor?.isActive("strike"),
    isUnderline: editor?.isActive("underline"),
    isCode: editor?.isActive("code"),
    isSubscript: editor?.isActive("subscript"),
    isSuperscript: editor?.isActive("superscript"),
    isAlignLeft: editor?.isActive({ textAlign: "left" }),
    isAlignCenter: editor?.isActive({ textAlign: "center" }),
    isAlignRight: editor?.isActive({ textAlign: "right" }),
    isAlignJustify: editor?.isActive({ textAlign: "justify" }),
    currentColor: editor?.getAttributes("textStyle")?.color || undefined,
    currentHighlight: editor?.getAttributes("highlight")?.color || undefined,
    currentFont: editor?.getAttributes("textStyle")?.fontFamily || undefined,
    currentSize: editor?.getAttributes("textStyle")?.fontSize || undefined,
    shouldShow,
  };
};
