"use client"

import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hook"
import { authAPI } from "@/service/auth/AuthService"
import { useUserStore } from "@/store/user.store"
import { LoginFormType, loginFormSchema, userSchema } from "@/types/zod.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { setCookie } from "cookies-next"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { FloatingLabelInput } from "../ui/floating-input"
import { LoginFormProps } from "./types"

export default function LoginForm({ setOpen, switchMode }: LoginFormProps) {
  const { toast } = useToast()
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { setLoginUser } = useUserStore()

  const submitForm = useCallback(
    async ({ email, password }: LoginFormType) => {
      const data = await authAPI.postLogin(email, password)

      if ("user" in data) {
        const user = userSchema.parse(data.user)
        setCookie("user", user)
        setLoginUser(user)
        setOpen(false)
      } else if (data.error) {
        return toast({
          title: data.message,
          description: "확인 후 다시 시도해주세요",
          variant: "destructive",
        })
      }
    },
    [setOpen, setLoginUser, toast],
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="py-4">
        <FormField
          control={form.control}
          name="email"
          // eslint-disable-next-line react/jsx-no-bind
          render={({ field }) => (
            <FormItem className="space-y-0">
              <div className="h-14 rounded-t-md border px-1 py-2 focus-within:border focus-within:border-blue-700">
                <FormControl>
                  <FloatingLabelInput
                    {...field}
                    id="email"
                    label="이메일"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          // eslint-disable-next-line react/jsx-no-bind
          render={({ field }) => {
            return (
              <FormItem className="space-y-0">
                <div className="h-14 rounded-b-md border border-t-transparent px-1 py-2 focus-within:border focus-within:border-blue-700">
                  <FormControl>
                    <FloatingLabelInput
                      {...field}
                      label="비밀번호"
                      id="password"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )
          }}
        />
        <DialogFooter className="mt-4 flex-row !justify-between">
          <Button
            className="justify-start p-0 text-2xs text-primary hover:text-amber-400/80"
            onClick={switchMode}
            tabIndex={-1}
            type="button"
          >
            아직 계정이 없으신가요?
          </Button>
          <Button
            variant="default"
            type="submit"
            className="min-w-24"
            disabled={!form.getValues("email") || !form.getValues("password")}
          >
            확인
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
