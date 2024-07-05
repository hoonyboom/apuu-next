"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"register" | "login">("login");

  const switchMode = useCallback(() => {
    setMode(prev => (prev === "login" ? "register" : "login"));
  }, [setMode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>로그인</button>
      </DialogTrigger>
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
          <RegisterForm setOpen={setOpen} switchMode={switchMode} />
        )}
      </DialogContent>
    </Dialog>
  );
}
