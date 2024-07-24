import { ContentPickerOptions } from "@/components/Editor/Menubar/MenuContentTypePicker";
import { useEditorStore } from "@/store/editor.store";
import { useMemo } from "react";

export const useContentTypes = () => {
  const { editor } = useEditorStore();
  const options = useMemo<ContentPickerOptions>(() => {
    return [
      {
        type: "category",
        label: "포맷",
        id: "hierarchy",
      },
      {
        icon: "Pilcrow",
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setParagraph()
            .run(),
        id: "paragraph",
        disabled: () => !editor?.can().setParagraph(),
        isActive: () =>
          editor?.isActive("paragraph") &&
          !editor?.isActive("orderedList") &&
          !editor?.isActive("bulletList") &&
          !editor?.isActive("taskList"),
        label: "본문",
        type: "option",
      },
      {
        icon: "Heading1",
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 1 })
            .run(),
        id: "heading1",
        disabled: () => !editor?.can().setHeading({ level: 1 }),
        isActive: () => editor?.isActive("heading", { level: 1 }),
        label: "타이틀 1",
        type: "option",
      },
      {
        icon: "Heading2",
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 2 })
            .run(),
        id: "heading2",
        disabled: () => !editor?.can().setHeading({ level: 2 }),
        isActive: () => editor?.isActive("heading", { level: 2 }),
        label: "타이틀 2",
        type: "option",
      },
      {
        icon: "Heading3",
        onClick: () =>
          editor
            ?.chain()
            .focus()
            .lift("taskItem")
            .liftListItem("listItem")
            .setHeading({ level: 3 })
            .run(),
        id: "heading3",
        disabled: () => !editor?.can().setHeading({ level: 3 }),
        isActive: () => editor?.isActive("heading", { level: 3 }),
        label: "타이틀 3",
        type: "option",
      },
      {
        type: "category",
        label: "리스트",
        id: "lists",
      },
      {
        icon: "List",
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        id: "bulletList",
        disabled: () => !editor?.can().toggleBulletList(),
        isActive: () => editor?.isActive("bulletList"),
        label: "불렛 리스트",
        type: "option",
      },
      {
        icon: "ListOrdered",
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        id: "orderedList",
        disabled: () => !editor?.can().toggleOrderedList(),
        isActive: () => editor?.isActive("orderedList"),
        label: "숫자 리스트",
        type: "option",
      },
      {
        icon: "ListTodo",
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        id: "todoList",
        disabled: () => !editor?.can().toggleTaskList(),
        isActive: () => editor?.isActive("taskList"),
        label: "체크 리스트",
        type: "option",
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, editor?.state]);

  return options;
};
