"use client"

import { Editor } from "@/components/Editor"
import { DesktopRegisterForm, MobileRegisterForm } from "@/components/Form"

export default function Page() {
  return (
    <>
      <div className="hidden @lg/register:block">
        <DesktopRegisterForm>
          <Editor />
        </DesktopRegisterForm>
      </div>
      <div className="h-full @lg/register:hidden">
        <MobileRegisterForm>
          <Editor />
        </MobileRegisterForm>
      </div>
    </>
  )
}
