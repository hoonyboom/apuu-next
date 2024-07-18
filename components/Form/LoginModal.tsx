"use client";

import { Button } from "%/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "%/ui/dialog";
import { ModeType } from "@/lib/types";
import { useUserStore } from "@/store/user.store";
import { useCallback, useState } from "react";
import { LoginForm, SignUpForm } from ".";

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ModeType>("login");
  const { user } = useUserStore();

  const switchMode = useCallback(() => {
    setMode(prev => (prev === "login" ? "register" : "login"));
  }, [setMode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {user ? null : (
        <DialogTrigger asChild>
          <Button variant="ghost">로그인</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg">
            {mode === "login" ? "로그인" : "회원가입"}
          </DialogTitle>
          <DialogDescription className="pt-4 text-xs">
            {mode === "login"
              ? "가입하신 이메일과 패스워드를 입력해주세요."
              : "이메일로 회원가입을 진행해주세요."}
          </DialogDescription>
        </DialogHeader>
        {mode === "login" ? (
          <LoginForm setOpen={setOpen} switchMode={switchMode} />
        ) : (
          <SignUpForm setOpen={setOpen} switchMode={switchMode} />
        )}
      </DialogContent>
    </Dialog>
  );
}
