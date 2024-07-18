import { useCurrentEditor } from "@/contexts/editor.provider";
import clsx from "clsx";
import MenubarBtn from "./MenubarBtn";

export default function TaskListBtn() {
  const { editor } = useCurrentEditor();

  return (
    <MenubarBtn
      onClick={() => editor?.chain().focus().toggleTaskList().run()}
      className={clsx("active:bg-transparent", {
        "active:bg-red-400": editor?.isActive("taskList"),
      })}
    >
      Toggle List
    </MenubarBtn>
  );
}
