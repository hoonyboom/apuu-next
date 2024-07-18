"use client";

import { Timer } from "@/components/Transition";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Icons from "@/components/ui/Icons";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { api } from "@/lib/api.route";
import { fetcher } from "@/lib/utils";
import { SignUpFormType, UserType, signUpFormSchema } from "@/lib/zod.schema";
import { authAPI } from "@/services/auth/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEventHandler, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterFormProps } from "./types";

export default function SignUpForm({ setOpen, switchMode }: RegisterFormProps) {
  const [count, setCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isGetCode, setIsGetCode] = useState(false);
  const [isTimer, setIsTimer] = useState(false);
  const { toast } = useToast();
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      verification_code: "",
      nickname: "",
    },
  });
  const submitForm = useCallback(
    async ({ verification_code, ...values }: SignUpFormType) => {
      const data = await authAPI.postRegister<UserType>(values);

      if ("id" in data) {
        setOpen(false);
        return toast({
          description: "회원가입이 완료되었습니다",
        });
      } else if (data.error) {
        return toast({
          title: "회원가입에 실패했습니다.",
          description: "다시 시도해주세요.",
        });
      }
    },
    [setOpen, toast],
  );

  // TODO:  전송을 성공했다는 가정하에 optimistic UI 적용
  const sendVerificationCode: MouseEventHandler = useCallback(
    async e => {
      e.preventDefault();

      // 이메일 중복 체크시 UI부터 변경
      const data = await authAPI.postCheckEmail(form.getValues("email"));

      if ("success" in data) {
        setCount(120);
        setIsTimer(true);
        setIsGetCode(true);
        toast({
          title: "인증 코드가 발송되었습니다.",
          description: "이메일을 확인해주세요.",
        });
      } else if (data.error) {
        return toast({
          title: "이미 가입된 이메일입니다.",
          description: "다른 이메일을 입력해주세요.",
        });
      } else {
        return toast({
          title: "올바른 이메일 형식이 아닙니다.",
          description: "이메일을 확인해주세요.",
        });
      }

      const send_code = await authAPI.postSendCode(form.getValues("email"));
      if ("error" in send_code) {
        // Redis 저장, 이메일 전송이 실패할 경우
        setCount(0);
        setIsTimer(false);
        return toast({
          description: "올바른 이메일을 입력해주세요.",
        });
      }
    },
    [form, toast],
  );

  const verifyCode: MouseEventHandler = useCallback(
    async e => {
      e.preventDefault();

      try {
        const res = await fetcher(api.verify_code, {
          email: form.getValues("email"),
          verify_code: form.getValues("verification_code"),
        });

        if (res.status === 201) {
          setIsTimer(false);
          setIsChecked(true);
          setIsGetCode(false);
        } else if (res.status === 401) {
          alert("인증 코드가 일치하지 않습니다.");
        }
      } catch (err) {
        console.error(err);
      }
    },
    [form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-5 items-center gap-4 space-y-0">
              <FormLabel>이메일</FormLabel>
              <div className="col-span-4 flex items-center rounded-md border p-1 focus-within:ring-2 focus-within:ring-blue-300">
                <FormControl>
                  <Input
                    {...field}
                    className="border-none bg-transparent py-4 pl-2 pr-10 shadow-none focus-visible:bg-transparent focus-visible:ring-0"
                    disabled={isChecked}
                  />
                </FormControl>
                {isChecked ? (
                  <Icons.check className="size-6 text-green-500" />
                ) : (
                  <Button
                    disabled={isChecked || isTimer}
                    className={`min-w-20 ${isTimer && "bg-emerald-600"}`}
                    type="button"
                    onClick={sendVerificationCode}
                  >
                    {isTimer ? (
                      <Timer count={count} setCount={setCount} setIsTimer={setIsTimer} />
                    ) : (
                      "이메일 인증"
                    )}
                  </Button>
                )}
                <FormMessage className="shrink-0" />
              </div>
            </FormItem>
          )}
        />

        {isGetCode ? (
          <FormField
            control={form.control}
            name="verification_code"
            render={({ field }) => {
              return (
                <FormItem className="grid grid-cols-5 items-center gap-4 space-y-0">
                  <FormLabel>인증코드</FormLabel>
                  <div className="col-span-4 flex items-center rounded-md border p-1 focus-within:ring-2 focus-within:ring-blue-300">
                    <FormControl>
                      <Input
                        {...field}
                        className="border-none bg-transparent py-4 pl-2 pr-10 shadow-none focus-visible:bg-transparent focus-visible:ring-0"
                      />
                    </FormControl>
                    <Button type="button" onClick={verifyCode}>
                      확인
                    </Button>
                    <FormMessage className="shrink-0" />
                  </div>
                </FormItem>
              );
            }}
          />
        ) : null}

        {isChecked ? (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem className="grid grid-cols-5 items-center gap-4 space-y-0">
                    <FormLabel>비밀번호</FormLabel>
                    <div className="col-span-4 flex items-center rounded-md border p-1 focus-within:ring-2 focus-within:ring-blue-300">
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="border-none bg-transparent px-2 py-4 shadow-none focus-visible:bg-transparent focus-visible:ring-0"
                          placeholder="영문, 숫자, 특수문자를 섞어서 만들어주세요"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => {
                return (
                  <FormItem className="grid grid-cols-5 items-center gap-4 space-y-0">
                    <FormLabel>닉네임</FormLabel>
                    <div className="col-span-4 flex items-center rounded-md border p-1 focus-within:ring-2 focus-within:ring-blue-300">
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="border-none bg-transparent px-2 py-4 shadow-none focus-visible:bg-transparent focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage className="shrink-0" />
                    </div>
                  </FormItem>
                );
              }}
            />
          </>
        ) : null}
        <DialogFooter className="flex-row !justify-between">
          <Button
            variant="ghost"
            className="justify-start p-0 text-2xs text-blue-500 hover:bg-transparent hover:text-accent"
            onClick={switchMode}
            tabIndex={-1}
            type="button"
          >
            이미 계정이 있으신가요?
          </Button>
          {isChecked && (
            <Button type="submit" className="min-w-28">
              확인
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}
