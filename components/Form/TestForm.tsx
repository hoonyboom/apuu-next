"use client";

import { Form } from "@/components/ui/form";
import { useToast } from "@/hook/useToast";
import { CHECK_BOX_LIST, SELECT_BOX_LIST } from "@/lib/const";
import { useCreatePostMutation } from "@/service/posts/usePostsService";
import { useEditorStore } from "@/store/editor.store";
import { registerFormSchema } from "@/types/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { RegisterFormCheckBox } from "./RegisterCheckBox";
import { RegisterDatePicker } from "./RegisterDatePicker";
import { RegisterFormSelectBox } from "./RegisterSelectBox";
import { RegisterTitleInput } from "./RegisterTitleInput";
import { RegisterFormDataType } from "./types";

export default function MobileRegisterForm({ children }: PropsWithChildren) {
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

  const numberOfListItem = useMemo(
    () => SELECT_BOX_LIST.length + CHECK_BOX_LIST.length,
    [],
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [transition, setTransition] = useState(() =>
    Array.from({ length: numberOfListItem + 2 }, (_, i) => (i === 0 ? true : false)),
  );

  const currentNameRef = useRef<keyof RegisterFormDataType | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !currentNameRef.current) return;

    setTransition(state => {
      const tmp = [...state];
      tmp[currentStep] = true;
      return tmp;
    });

    // form.setFocus(currentNameRef.current);

    if (currentStep === numberOfListItem) {
      currentNameRef.current = "deadline";
    } else if (currentStep === numberOfListItem + 1) {
      currentNameRef.current = "title";
    } else {
      currentNameRef.current = undefined;
    }

    containerRef.current.scrollTop = -containerRef.current.scrollHeight;
  }, [containerRef, currentNameRef, setTransition, numberOfListItem, currentStep]);

  const handleNext = useCallback(
    function setNextStep() {
      if (!currentNameRef.current) return;
      let data = form.getValues()[currentNameRef.current];
      if ((Array.isArray(data) ? data.length > 0 : data !== "") && data) {
        setCurrentStep(prevStep => prevStep + 1);
      }
    },
    [form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
        <div
          ref={containerRef}
          className="relative flex max-h-form flex-col-reverse gap-6 overflow-y-scroll px-2 pb-10"
        >
          {SELECT_BOX_LIST.map((s, i) => {
            if (i <= currentStep) {
              currentNameRef.current = s.name;
              return (
                <RegisterFormSelectBox
                  key={s.name}
                  form={form}
                  label={s.label}
                  name={s.name}
                  values={s.values}
                  unit="명"
                  isShow={transition[i]}
                />
              );
            }
          })}

          {CHECK_BOX_LIST.map((s, i) => {
            if (i <= currentStep - SELECT_BOX_LIST.length) {
              currentNameRef.current = s.name;
              return (
                <RegisterFormCheckBox
                  key={s.name}
                  form={form}
                  label={s.label}
                  name={s.name}
                  values={s.values}
                  isShow={transition[i + SELECT_BOX_LIST.length]}
                />
              );
            }
          })}

          {currentStep >= numberOfListItem && (
            <RegisterDatePicker form={form} isShow={transition[numberOfListItem]} />
          )}

          {currentStep >= numberOfListItem + 1 && (
            <div className="space-y-2">
              <RegisterTitleInput form={form} isShow={transition[numberOfListItem + 1]} />
              {children}
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-4 mx-auto w-full px-5">
          {currentStep > SELECT_BOX_LIST.length + CHECK_BOX_LIST.length + 1 ? (
            <Button
              type="submit"
              disabled={currentStep <= SELECT_BOX_LIST.length + CHECK_BOX_LIST.length + 1}
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!form.getValues(currentNameRef.current!)}
              className="w-full"
            >
              다음
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
