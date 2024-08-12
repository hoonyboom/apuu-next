"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { authAPI } from "@/service/auth/AuthService"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function SignupModal() {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!open) {
      router.back()
    }
  }, [open, router])

  const kakaoLogin = useCallback(async () => {
    await authAPI.postLoginKakao()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col items-center py-12 sm:max-w-[30rem]">
        <DialogHeader className="flex flex-col items-center gap-5">
          <Image
            src="/assets/svgs/logo.svg"
            alt="로고"
            width={1000}
            height={1000}
            className="size-16"
            priority
          />
          <DialogTitle>Apuu에 오신 것을 환영합니다</DialogTitle>
          <DialogDescription asChild>
            <div className="text-center text-sm [&_*]:text-foreground">
              <b>수영을 즐기는 가장 확실한 방법!</b>
              <p>Apuu에서 함께 할 친구들을 찾으세요</p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex w-full flex-col place-items-center gap-2 px-10 sm:px-16">
          <Button className="w-full rounded-3xl py-5 text-sm" variant="outline">
            이메일 로그인
          </Button>
          <Button
            className="w-full rounded-3xl py-5 text-sm"
            onClick={kakaoLogin}
            variant="outline"
          >
            카카오 로그인
          </Button>
          <Button className="w-full rounded-3xl py-5 text-sm" variant="outline">
            네이버 로그인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
