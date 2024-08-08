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
import { Input } from "@/components/ui/input"
import { useToast } from "@/hook"
import { authAPI } from "@/service/auth/AuthService"
import { useUserStore } from "@/store/user.store"
import { LoginFormType, UserType, loginFormSchema, userSchema } from "@/types/zod.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { setCookie } from "cookies-next"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
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

      if ("id" in data) {
        const user = userSchema.parse(data)
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
      <form onSubmit={form.handleSubmit(submitForm)} className="grid gap-4 py-4">
        <FormField
          control={form.control}
          name="email"
          // eslint-disable-next-line react/jsx-no-bind
          render={({ field }) => (
            <FormItem className="grid grid-cols-5 items-center gap-4 space-y-0">
              <FormLabel>이메일</FormLabel>
              <div className="col-span-4 flex items-center rounded-md border p-1 focus-within:ring-2 focus-within:ring-blue-300">
                <FormControl>
                  <Input
                    {...field}
                    className="border-none bg-transparent py-4 pl-2 pr-10 shadow-none focus-visible:bg-transparent focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage className="shrink-0" />
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
              <FormItem className="grid grid-cols-5 items-center gap-4 space-y-0">
                <FormLabel>비밀번호</FormLabel>
                <div className="col-span-4 flex items-center rounded-md border p-1 focus-within:ring-2 focus-within:ring-blue-300">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="border-none bg-transparent px-2 py-4 shadow-none focus-visible:bg-transparent focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )
          }}
        />
        <DialogFooter className="flex-row !justify-between">
          <Button
            variant="ghost"
            className="justify-start p-0 text-2xs text-blue-500 hover:bg-transparent hover:text-accent"
            onClick={switchMode}
            tabIndex={-1}
            type="button"
          >
            아직 계정이 없으신가요?
          </Button>
          <Button
            type="submit"
            className="min-w-28"
            disabled={!form.getValues("email") || !form.getValues("password")}
          >
            확인
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
