"use client";

import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hook/useToast";
import { CHECK_BOX_LIST, SELECT_BOX_LIST } from "@/lib/const";
import { useCreatePostMutation } from "@/service/posts/usePostsService";
import { useEditorStore } from "@/store/editor.store";
import { registerFormSchema } from "@/types/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useCallback } from "react";
import { useForm } from "react-hook-form";
import { RegisterFormCheckBox } from "./RegisterCheckBox";
import { RegisterDatePicker } from "./RegisterDatePicker";
import { RegisterFormSelectBox } from "./RegisterSelectBox";
import { RegisterTitleInput } from "./RegisterTitleInput";
import { RegisterFormDataType } from "./types";

export default function RegisterForm({ children }: PropsWithChildren) {
  const { toast } = useToast();
  const form = useForm<RegisterFormDataType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      title: "",
      level: [],
      style: [],
      goal: [],
    },
  });
  const { mutate } = useCreatePostMutation();
  const { editor } = useEditorStore();

  const onSubmit = useCallback(
    (data: RegisterFormDataType) => {
      mutate({
        ...data,
        content: editor?.getHTML() || "",
      });

      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify({ ...data, content: editor?.getHTML() }, null, 2)}
            </code>
          </pre>
        ),
      });
    },
    [mutate, editor, toast],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="mb-14 grid gap-6 sm:grid-cols-2">
          {SELECT_BOX_LIST.map(s => (
            <RegisterFormSelectBox
              key={s.name}
              form={form}
              label={s.label}
              name={s.name}
              values={s.values}
            />
          ))}

          {CHECK_BOX_LIST.map(c => (
            <RegisterFormCheckBox
              form={form}
              key={c.label}
              label={c.label}
              name={c.name}
              values={c.values}
            />
          ))}
          <RegisterDatePicker form={form} />
        </div>

        <div className="space-y-2">
          <CardTitle className="mb-6">모임에 대해 소개해주세요</CardTitle>
          <RegisterTitleInput form={form} />
          {children}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
