"use client"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icon } from "@/components/ui/Icon"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useToast } from "@/hook/useToast"
import { authAPI } from "@/service/auth/AuthService"
import { SignUpFormType, signUpFormSchema } from "@/types/zod.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { MouseEventHandler, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { FloatingLabelInput } from "../ui/floating-input"
import Timer from "./Timer"
import { RegisterFormProps } from "./types"

export default function SignUpForm({ setOpen, switchMode }: RegisterFormProps) {
  const [count, setCount] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [isGetCode, setIsGetCode] = useState(false)
  const [isTimer, setIsTimer] = useState(false)
  const { toast } = useToast()
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      verification_code: "",
      nickname: "",
    },
  })
  const submitForm = useCallback(
    async ({ verification_code, ...values }: SignUpFormType) => {
      const data = await authAPI.postRegister(values)

      if ("id" in data) {
        setOpen(false)
        return toast({
          title: data.nickname + "님!",
          description: "회원가입이 완료되었습니다",
        })
      } else if (data.error) {
        return toast({
          title: data.message,
          description: "다시 시도해주세요.",
        })
      }
    },
    [setOpen, toast],
  )

  // TODO:  전송을 성공했다는 가정하에 optimistic UI 적용
  const sendVerificationCode: MouseEventHandler = useCallback(
    async e => {
      e.preventDefault()

      // 이메일 중복 체크시 UI부터 변경
      const data = await authAPI.postCheckEmail(form.getValues("email"))

      if ("success" in data) {
        setCount(120)
        setIsTimer(true)
        setIsGetCode(true)
        toast({
          title: "인증 코드가 발송되었습니다.",
          description: "이메일을 확인해주세요.",
        })
      } else if (data.error) {
        return toast({
          title: "이미 가입된 이메일입니다.",
          description: "다른 이메일을 입력해주세요.",
        })
      } else {
        return toast({
          title: "올바른 이메일 형식이 아닙니다.",
          description: "이메일을 확인해주세요.",
        })
      }

      const send_code = await authAPI.postSendCode(form.getValues("email"))
      if ("error" in send_code) {
        // Redis 저장, 이메일 전송이 실패할 경우
        setCount(0)
        setIsTimer(false)
        return toast({
          description: "올바른 이메일을 입력해주세요.",
        })
      }
    },
    [form, toast],
  )

  const verifyCode = useCallback(async () => {
    try {
      const res = await authAPI.postVerifyCode(
        form.getValues("email"),
        form.getValues("verification_code"),
      )

      if ("success" in res) {
        setIsTimer(false)
        setIsChecked(true)
        setIsGetCode(false)
      } else if (res.statusCode === 401) {
        return toast({ description: res.message })
      }
    } catch (err) {
      console.error(err)
    }
  }, [form, toast])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="email"
          // eslint-disable-next-line react/jsx-no-bind
          render={({ field }) => (
            <FormItem className="space-y-0">
              <div className="flex h-14 w-full items-center justify-between gap-2 rounded-md border p-1 pr-2 focus-within:ring-1 focus-within:ring-blue-700">
                <FormControl>
                  <FloatingLabelInput
                    {...field}
                    id="email"
                    label="이메일"
                    className="border-none bg-transparent px-2 pt-5 shadow-none focus-visible:bg-transparent focus-visible:ring-0"
                    disabled={isChecked || isTimer}
                  />
                </FormControl>
                {isChecked ? (
                  <Icon name="Check" className="size-6 text-green-500" />
                ) : (
                  <Button
                    disabled={isChecked || isTimer}
                    variant="outline"
                    className={`min-w-20 text-2xs hover:bg-black hover:text-white focus-visible:ring-1 focus-visible:ring-black ${isTimer && "text-emerald-600"}`}
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
              </div>
            </FormItem>
          )}
        />

        {isGetCode ? (
          <FormField
            control={form.control}
            name="verification_code"
            // eslint-disable-next-line react/jsx-no-bind
            render={({ field }) => {
              return (
                <FormItem className="grid grid-cols-5 items-center gap-4 space-y-0">
                  <FormLabel>인증코드</FormLabel>
                  <div className="col-span-4 flex items-center justify-stretch gap-2 rounded-md pr-1 focus-within:ring-0">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <Button
                      type="button"
                      variant="default"
                      disabled={field.value.length !== 6}
                      className="w-full"
                      onClick={verifyCode}
                    >
                      확인
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
        ) : null}

        {isChecked ? (
          <>
            <FormField
              control={form.control}
              name="password"
              // eslint-disable-next-line react/jsx-no-bind
              render={({ field }) => {
                return (
                  <FormItem className="grid grid-cols-5 items-center gap-4 space-y-0">
                    <FormLabel>비밀번호</FormLabel>
                    <div className="col-span-4 flex items-center rounded-md border p-1 focus-within:ring-1 focus-within:ring-blue-700">
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="border-none bg-transparent px-1 py-3 shadow-none focus-visible:bg-transparent focus-visible:ring-0"
                          placeholder="영문, 숫자, 특수문자를 섞어서 만들어주세요"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="nickname"
              // eslint-disable-next-line react/jsx-no-bind
              render={({ field }) => {
                return (
                  <FormItem className="grid grid-cols-5 items-center gap-4 space-y-0">
                    <FormLabel>닉네임</FormLabel>
                    <div className="col-span-4 flex items-center rounded-md border p-1 focus-within:ring-1 focus-within:ring-blue-700">
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="border-none bg-transparent px-2 py-4 shadow-none focus-visible:bg-transparent focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )
              }}
            />
          </>
        ) : null}
        <DialogFooter className="flex-row !justify-between">
          <Button
            className="justify-start p-0 text-2xs text-primary hover:text-amber-400/80"
            onClick={switchMode}
            tabIndex={-1}
            type="button"
          >
            이미 계정이 있으신가요?
          </Button>
          {isChecked && (
            <Button
              type="submit"
              variant="default"
              className="min-w-28"
              disabled={!form.getValues("nickname") || !form.getValues("password")}
            >
              확인
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  )
}
