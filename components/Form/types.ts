import { registerFormSchema } from "@/types/zod.schema";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type RegisterFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  switchMode: () => void;
};
export type LoginFormProps = RegisterFormProps;
export type RegisterFormDataType = z.infer<typeof registerFormSchema>;
export type RegisterFormReturnType = UseFormReturn<RegisterFormDataType>;

export type RegisterDefaultProps = {
  form: RegisterFormReturnType;
};

export type RegisterFormFieldProps = {
  name: keyof RegisterFormDataType;
  label: string;
  values?: number[] | readonly string[];
  unit?: string;
} & RegisterDefaultProps;

export type RegisterCheckBoxProps = {
  name: keyof Pick<RegisterFormDataType, "level" | "style" | "goal">;
  label: string;
  values: readonly string[];
} & RegisterDefaultProps;
