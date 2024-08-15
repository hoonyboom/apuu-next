"use client"

import useSyncKakaoUser from "@/hook/useSyncKakaoUser"

export default function OauthLogin() {
  useSyncKakaoUser()

  return null
}
