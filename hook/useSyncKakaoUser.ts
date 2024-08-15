"use client"

import { useUserStore } from "@/store/user.store"
import { userSchema } from "@/types/zod.schema"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function useSyncKakaoUser() {
  const params = useSearchParams()
  const { setLoginUser } = useUserStore()
  const userParam = params.get("user")

  useEffect(
    function syncKakaoUser() {
      if (userParam) {
        const user = userSchema.parse(JSON.parse(userParam))
        setLoginUser(user)
      }
    },
    [userParam],
  )
}
