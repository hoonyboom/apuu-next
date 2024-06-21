import { z } from "zod";
import { PASSWORD_REGEX } from "./const";

export const formSchema = z.object({
  email: z.string().email({ message: "올바른 이메일을 입력해 주세요" }),
  password: z
    .string()
    .min(8, { message: "8자리 이상 입력해 주세요" })
    .max(15, { message: "15자리 이하로 입력해 주세요" })
    .regex(PASSWORD_REGEX, {
      message: "영문, 숫자, 특수문자(~!@#$%^&*)를 포함해 주세요",
    }),
});

export type LoginForm = z.infer<typeof formSchema>;
