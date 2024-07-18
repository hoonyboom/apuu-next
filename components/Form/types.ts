import { registerFormSchema } from "@/lib/zod.schema";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type RegisterFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  switchMode: () => void;
};

export type LoginFormProps = RegisterFormProps;
export type RegisterFormType = UseFormReturn<z.infer<typeof registerFormSchema>>;
export type RegisterFormFieldProps = {
  form: RegisterFormType;
  name: keyof z.infer<typeof registerFormSchema>;
  label: string;
  values?: string[];
};
export type RegisterCheckBoxProps = {
  form: RegisterFormType;
  name: keyof Pick<z.infer<typeof registerFormSchema>, "goal" | "level" | "style">;
  label: string;
  values: readonly string[];
};
export type DatePickerProps = {
  form: RegisterFormType;
};
