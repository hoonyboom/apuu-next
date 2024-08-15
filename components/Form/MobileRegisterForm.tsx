"use client"

import { Form } from "@/components/ui/form"
import { useToast } from "@/hook"
import { CHECK_BOX_LIST, DEFAULT_REGISTER_VALUE, SELECT_BOX_LIST } from "@/lib/const"
import { usePostsMutation } from "@/service/posts/usePostsService"
import { useEditorStore } from "@/store/editor.store"
import { registerFormSchema } from "@/types/zod.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { AreaCombobox } from "./AreaCombobox"
import { RegisterFormCheckBox } from "./RegisterCheckBox"
import { RegisterDatePicker } from "./RegisterDatePicker"
import { RegisterFormSelectBox } from "./RegisterSelectBox"
import { RegisterTitleInput } from "./RegisterTitleInput"
import { RegisterFormDataType } from "./types"

export default function MobileRegisterForm({ children }: PropsWithChildren) {
  const form = useForm<RegisterFormDataType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: DEFAULT_REGISTER_VALUE,
  })
  const { toast } = useToast()
  const router = useRouter()
  const { mutate } = usePostsMutation()
  const { editor } = useEditorStore()
  const onSubmit = useCallback(
    (data: RegisterFormDataType) => {
      if (!editor) return

      const images: string[] = []
      const content = editor
        .getHTML()
        .replace(/\/public\/temp\/([^"]*)/g, (original, src) => {
          const newSrc = `/public/posts/${src}`
          images.push(src)
          return newSrc
        })

      mutate({
        ...data,
        content,
        images,
      })

      router.push("/")
    },
    [mutate, editor, router],
  )
  const numberOfListItem = useMemo(
    () => SELECT_BOX_LIST.length + CHECK_BOX_LIST.length,
    [],
  )

  const [currentStep, setCurrentStep] = useState(0)
  const [transition, setTransition] = useState(() =>
    Array.from({ length: numberOfListItem + 3 }, (_, i) => (i === 0 ? true : false)),
  )
  const currentNameRef = useRef<keyof RegisterFormDataType | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(
    function scrollToTop() {
      if (!containerRef.current || !currentNameRef.current) return

      setTransition(state => {
        const tmp = [...state]
        tmp[currentStep] = true
        return tmp
      })

      if (currentStep === numberOfListItem) {
        currentNameRef.current = "deadline"
      } else if (currentStep === numberOfListItem + 1) {
        currentNameRef.current = "area"
      } else if (currentStep === numberOfListItem + 2) {
        currentNameRef.current = "title"
      } else {
        currentNameRef.current = undefined
      }

      containerRef.current.scrollTop = -containerRef.current.scrollHeight
    },
    [containerRef, currentNameRef, setTransition, numberOfListItem, currentStep],
  )

  const handleNext = useCallback(
    function setNextStep() {
      if (!currentNameRef.current) return
      let data = form.getValues()[currentNameRef.current]
      if ((Array.isArray(data) ? data.length > 0 : data !== "") && data) {
        setCurrentStep(prevStep => prevStep + 1)
      }
    },
    [form],
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
        <div
          ref={containerRef}
          className="relative flex flex-col-reverse gap-6 overflow-y-scroll px-2"
        >
          {SELECT_BOX_LIST.map((s, i) => {
            if (i <= currentStep) {
              currentNameRef.current = s.name
              return (
                <RegisterFormSelectBox
                  key={s.name}
                  form={form}
                  label={s.label}
                  name={s.name}
                  values={s.values}
                  unit="명"
                  isShow={transition[i]}
                  isMobile
                />
              )
            }
          })}

          {CHECK_BOX_LIST.map((s, i) => {
            if (i <= currentStep - SELECT_BOX_LIST.length) {
              currentNameRef.current = s.name
              return (
                <RegisterFormCheckBox
                  key={s.name}
                  form={form}
                  label={s.label}
                  name={s.name}
                  values={s.values}
                  isShow={transition[i + SELECT_BOX_LIST.length]}
                  isMobile
                />
              )
            }
          })}

          {currentStep >= numberOfListItem && (
            <RegisterDatePicker
              form={form}
              isShow={transition[numberOfListItem]}
              isMobile
            />
          )}

          {currentStep >= numberOfListItem + 1 && (
            <AreaCombobox
              form={form}
              isShow={transition[numberOfListItem + 1]}
              isMobile
            />
          )}

          {currentStep === numberOfListItem + 2 && (
            <div className="space-y-2 pt-1">
              <RegisterTitleInput
                form={form}
                isShow={transition[numberOfListItem + 2]}
                isMobile
              />
              {children}
            </div>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-4 mx-auto w-full px-5">
          {currentStep === numberOfListItem + 2 ? (
            <Button type="submit" className="w-full" variant="default">
              저장
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!form.getValues(currentNameRef.current!)}
              className="w-full"
              variant="default"
            >
              다음
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
