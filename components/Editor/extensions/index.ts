import FileHandler from "@tiptap-pro/extension-file-handler";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import BulletList from "@tiptap/extension-bullet-list";
import CharacterCount from "@tiptap/extension-character-count";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
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
import Typography from "@tiptap/extension-typography";
import Youtube from "@tiptap/extension-youtube";

export const limit = 120;

export const ExtensionKit = () => [
  Document,
  Paragraph,
  Text,
  TextStyle,
  Blockquote,
  Typography,
  Color,
  BubbleMenu,
  Bold,
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
  Image,
  FileHandler.configure({
    allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(file => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(pos, {
              type: "image",
              attrs: {
                src: fileReader.result,
              },
            })
            .focus()
            .run();
        };
      });
    },
    onPaste: (currentEditor, files, htmlContent) => {
      files.forEach(file => {
        if (htmlContent) {
          // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
          // you could extract the pasted file from this url string and upload it to a server for example
          console.log(htmlContent); // eslint-disable-line no-console
          return false;
        }

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(currentEditor.state.selection.anchor, {
              type: "image",
              attrs: {
                src: fileReader.result,
              },
            })
            .focus()
            .run();
        };
      });
    },
  }),
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
    controls: false,
    nocookie: true,
  }),
];
