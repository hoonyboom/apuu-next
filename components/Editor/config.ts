import Bold from "@tiptap/extension-bold";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Paragraph from "@tiptap/extension-paragraph";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import Youtube from "@tiptap/extension-youtube";

export const limit = 500;

export const EditorConfig = () => [
  Document,
  Paragraph,
  Text,
  Bold,
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  Highlight.configure({ multicolor: true }),
  CharacterCount.configure({ limit }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
];
