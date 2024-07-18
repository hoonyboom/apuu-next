"use client";

import useScrollLock from "@/hooks/useScrollLock";
import { stopPropagation } from "@/lib/utils";
import { authAPI } from "@/services/auth/AuthService";
import { useUserStore } from "@/store/user.store";
import clsx from "clsx";
import Link from "next/link";
import { MouseEventHandler, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Avatar from "../ui/Avatar";
import Icons from "../ui/Icons";
import { Separator } from "../ui/separator";

export default function Menu() {
  const { user, setLogoutUser } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = useCallback(async () => {
    await authAPI.postLogout();
    setLogoutUser();
  }, [setLogoutUser]);

  const toggleMenu: MouseEventHandler = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, [setIsMenuOpen]);

  useScrollLock(isMenuOpen);

  if (!user) null;
  else
    return (
      <div>
        <Icons.hamburger
          className={clsx("size-7 transition-opacity", {
            "opacity-0": isMenuOpen,
            "opacity-100": !isMenuOpen,
          })}
          onClick={toggleMenu}
        />

        {createPortal(
          <div
            className={clsx(
              "fixed inset-0 z-10 h-full w-screen transition-all duration-300",
              {
                "blurred bg-black/10": isMenuOpen,
                "pointer-events-none": !isMenuOpen,
              },
            )}
            onClick={toggleMenu}
          >
            <div
              className={clsx(
                "absolute right-0 top-0 flex h-full w-full max-w-64 flex-col gap-6 bg-white py-6 transition-transform duration-300 ease-in-out sm:max-w-96",
                {
                  "translate-x-0": isMenuOpen,
                  "translate-x-full": !isMenuOpen,
                },
              )}
              onClick={stopPropagation}
            >
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  {/* TODO: user에 profileImg 로우 추가 */}
                  <Avatar className="size-12" onClick={toggleMenu} />
                  <span>{user.nickname}</span>
                </div>
                <Icons.close className="size-6" onClick={toggleMenu} />
              </div>
              <Separator />
              <div className="flex flex-col justify-around gap-4 px-4">
                <p>대시보드</p>
                <Link href="/register" onClick={toggleMenu}>
                  <p>파티모집</p>
                </Link>
                <p>프로필</p>
              </div>
              <Separator />
              <div className="flex flex-col justify-around px-4">
                <p onClick={logoutHandler}>로그아웃</p>
              </div>
            </div>
          </div>,
          document.body,
        )}
      </div>
    );
}
