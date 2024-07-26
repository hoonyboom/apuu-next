"use client";

import { Editor } from "@/components/Editor";
import TestForm from "@/components/Form/TestForm";

// const Test = dynamic(() => import("@/components/Form/TestForm"));

export default function Page() {
  return (
    <div>
      {/* <RegisterForm>
            <Editor />
          </RegisterForm> */}
      <TestForm>
        <Editor />
      </TestForm>
    </div>
  );
}
