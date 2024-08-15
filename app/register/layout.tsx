"use client"

import SignupModal from "@/components/Form/SignupModal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/store/user.store"
import { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren) {
  const { user } = useUserStore()
  if (!user) return <SignupModal />

  return (
    <div className="h-fullscreen w-full overflow-hidden px-3 pb-2 @container/register">
      <Card className="scrollbar-thin mx-auto size-full max-h-full overflow-y-scroll pb-10 @lg/register:max-h-none @lg/register:max-w-5xl @lg/register:pb-0">
        <CardHeader>
          <CardTitle>기본 정보를 입력해주세요</CardTitle>
        </CardHeader>
        <CardContent className="mt-2 px-0 @lg/register:px-4">{children}</CardContent>
      </Card>
    </div>
  )
}
