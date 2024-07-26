"use client";

import { Editor } from "@/components/Editor";
import MobileRegisterForm from "@/components/Form/TestForm";

// const Test = dynamic(() => import("@/components/Form/TestForm"));

export default function Page() {
  return (
    <div>
      {/* <RegisterForm>
            <Editor />
          </RegisterForm> */}
      <MobileRegisterForm>
        <Editor />
      </MobileRegisterForm>
    </div>
  );
}
