import { Editor } from "@tiptap/react";

export type DefaultEditorProps = {
  editor: Editor;
};

export type TextCounterProps = {
  characterCount: number;
} & DefaultEditorProps;
