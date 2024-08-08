import { useEditorStore } from "@/store/editor.store"
import { useEffect } from "react"
import { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form"

export default function useResetFormValue<T extends FieldValues>(
  form: UseFormReturn<T>,
  defaultValues?: DefaultValues<T>,
) {
  const { formState, reset } = form
  const { editor } = useEditorStore()

  useEffect(
    function resetFormValue() {
      if (formState.isSubmitSuccessful) {
        reset(defaultValues, { keepDefaultValues: true })
        editor?.commands.clearContent()
      }
    },
    [editor, formState, reset, defaultValues],
  )
}
