"use client"

import Avatar from "@/components/ui/Avatar"
import { Icon } from "@/components/ui/Icon"
import { Separator } from "@/components/ui/separator"
import useScrollLock from "@/hook/useScrollLock"
import { cn, stopPropagation } from "@/lib/util"
import { authAPI } from "@/service/auth/AuthService"
import { useUserStore } from "@/store/user.store"
import { useRouter } from "next/navigation"
import { MouseEventHandler, useCallback, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "../ui/button"
import SidebarLink from "./SidebarLink"

export default function Sidebar() {
  const { user, setLogoutUser } = useUserStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const logoutHandler = useCallback(async () => {
    await authAPI.postLogout()
    setLogoutUser()
    router.push("/")
  }, [setLogoutUser, router])

  const toggleMenu: MouseEventHandler = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [setIsMenuOpen])

  useScrollLock(isMenuOpen)

  if (!user) null
  else
    return (
      <div>
        <Icon
          name="Menu"
          className={cn("size-7 transition-opacity", {
            "opacity-0": isMenuOpen,
            "opacity-100": !isMenuOpen,
          })}
          onClick={toggleMenu}
        />

        {createPortal(
          <div
            className={cn(
              "fixed inset-0 z-10 h-full w-screen transition-all duration-300",
              {
                "blurred bg-black/10": isMenuOpen,
                "pointer-events-none": !isMenuOpen,
              },
            )}
            onClick={toggleMenu}
          >
            <div
              className={cn(
                "absolute right-0 top-0 flex size-full max-w-56 flex-col items-start justify-start gap-1 bg-white px-4 py-6 transition-transform duration-300 ease-in-out sm:max-w-80",
                {
                  "translate-x-0": isMenuOpen,
                  "translate-x-full": !isMenuOpen,
                },
              )}
              onClick={stopPropagation}
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* TODO: user에 profileImg 로우 추가 */}
                  <Avatar className="size-12" onClick={toggleMenu} />
                  <span>{user.nickname}</span>
                </div>
                <Button
                  size="icon"
                  className="rounded-xl transition duration-300 hover:bg-accent hover:font-semibold hover:text-accent-foreground"
                >
                  <Icon name="X" className="size-6" onClick={toggleMenu} />
                </Button>
              </div>
              <Separator className="my-3" />
              <SidebarLink href="/dashboard" text="대시보드" icon="Gauge" />
              <SidebarLink
                href="/register"
                text="파티모집"
                icon="UsersRound"
                onClick={toggleMenu}
              />
              <SidebarLink href="/dashboard/profile" text="프로필" icon="UserRoundCog" />
              <Separator className="my-3" />
              <SidebarLink
                href="/"
                text="로그아웃"
                icon="LogOut"
                onClick={logoutHandler}
              />
            </div>
          </div>,
          document.body,
        )}
      </div>
    )
}
