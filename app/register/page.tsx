"use client";

import { Button } from "@/components/ui/button";
import authAPI from "@/services/auth/AuthService";
import { useUserStore } from "@/store/user.store";
import { useCallback } from "react";

export default function Page() {
  const { user, setLogoutUser } = useUserStore();
  const logoutHandler = useCallback(async () => {
    await authAPI.postLogout();
    setLogoutUser();
  }, [setLogoutUser]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{user?.nickname}</h1>
      <p className="text-gray-500">This is the register page</p>
      {user && <Button onClick={logoutHandler}>로그아웃</Button>}
    </div>
  );
}
