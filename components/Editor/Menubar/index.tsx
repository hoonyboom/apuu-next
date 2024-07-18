"use client";

import EditorProvider from "@/contexts/editor.provider";
import TaskListBtn from "./TaskListBtn";
import YoutubeBtn from "./YoutubeBtn";

export default function Menubar() {
  return (
    <EditorProvider>
      <div className="flex w-full gap-2">
        <TaskListBtn />
        <YoutubeBtn />
      </div>
    </EditorProvider>
  );
}
