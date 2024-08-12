"use client"

import { Editor } from "@/components/Editor"
import { DesktopRegisterForm, MobileRegisterForm } from "@/components/Form"
import SignupModal from "@/components/Form/SignupModal"
import { useUserStore } from "@/store/user.store"

export default function Page() {
  return (
    <>
      <div className="hidden @lg/register:block">
        <DesktopRegisterForm>
          <Editor />
        </DesktopRegisterForm>
      </div>
      <div className="@lg/register:hidden">
        <MobileRegisterForm>
          <Editor />
        </MobileRegisterForm>
      </div>
    </>
  )
}
