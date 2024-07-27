import { env } from "@/lib/config/env";
import Bold from "@tiptap/extension-bold";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import BulletList from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import DropCursor from "@tiptap/extension-dropcursor";
import GapCursor from "@tiptap/extension-gapcursor";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import History from "@tiptap/extension-history";
import Separator from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Youtube from "@tiptap/extension-youtube";
import { ImageUpload } from "./ImageUpload";

export const limit = 120;

export const ExtensionKit = () => [
  Document,
  Paragraph,
  Text,
  Color,
  BubbleMenu,
  Bold,
  DropCursor,
  GapCursor,
  Separator,
  TextStyle,
  History.configure({
    depth: 50,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
  Image,
  ImageUpload,
  // FileHandler.configure({
  //   allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  //   onDrop: (currentEditor, files, pos) => {
  //     files.forEach(async () => {
  //       const url = "/assets/images/test.jpg";

  //       currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run();
  //     });
  //   },
  //   onPaste: (currentEditor, files) => {
  //     files.forEach(async () => {
  //       const url = "/assets/images/test.jpg";

  //       return currentEditor
  //         .chain()
  //         .setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url })
  //         .focus()
  //         .run();
  //     });
  //   },
  // }),
  Italic,
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  Highlight.configure({ multicolor: true }),
  CharacterCount.configure({ limit }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "list-decimal",
    },
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc",
    },
  }),
  ListItem,
  TaskList,
  TaskItem.configure({
    nested: true,
    HTMLAttributes: {
      class: "flex items-center",
    },
  }),
  Youtube.configure({
    enableIFrameApi: true,
    origin: env.NODE_ENV === "development" ? "localhost:3001" : env.NEXT_PUBLIC_BASE_URL,
    HTMLAttributes: {
      class: "w-full",
    },
  }),
];
