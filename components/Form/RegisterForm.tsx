"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/useToast";
import { GOAL, LEVEL, MEMBER_SIZE, PERIOD, STYLE } from "@/lib/const";
import { registerFormSchema } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterFormCheckBox } from "./RegisterCheckBox";
import { RegisterDatePicker } from "./RegisterDatePicker";
import { RegisterFormSelectBox } from "./RegisterSelectBox";

export default function RegisterForm({ children }: PropsWithChildren) {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });
  const { toast } = useToast();

  const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>기본 정보를 입력해주세요</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="mb-14 grid gap-6 sm:grid-cols-2">
              <RegisterFormSelectBox form={form} label="모집 종류" name="sort" />
              <RegisterFormSelectBox form={form} label="교류 방식" name="method" />
              <RegisterFormSelectBox
                form={form}
                label="모집 인원"
                name="size"
                values={MEMBER_SIZE}
              />
              <RegisterFormSelectBox
                form={form}
                label="진행 기간"
                name="period"
                values={PERIOD}
              />
              <RegisterFormCheckBox
                form={form}
                label="모집 수준"
                name="level"
                values={LEVEL}
              />
              <RegisterFormCheckBox
                form={form}
                label="메인 영법"
                name="style"
                values={STYLE}
              />
              <RegisterFormCheckBox
                form={form}
                label="훈련 목표"
                name="goal"
                values={GOAL}
              />
              <RegisterDatePicker form={form} />
            </div>

            <CardTitle>모임에 대해 소개해주세요</CardTitle>
            {children}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
