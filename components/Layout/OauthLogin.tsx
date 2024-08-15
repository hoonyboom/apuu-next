"use client"

import useSyncKakaoUser from "@/hook/useSyncKakaoUser"
import { Suspense } from "react"

export default function OauthLogin() {
  useSyncKakaoUser()

  return <Suspense>null</Suspense>
}
