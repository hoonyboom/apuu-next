import { z } from "zod";
import { PASSWORD_REGEX } from "./const";

export const registerFormSchema = z.object({
  email: z.string().email({ message: "올바른 이메일을 입력해 주세요" }),
  password: z
    .string()
    .min(8, { message: "8자리 이상 입력해 주세요" })
    .max(15, { message: "15자리 이하로 입력해 주세요" })
    .regex(PASSWORD_REGEX, {
      message: "영문, 숫자, 특수문자(~!@#$%^&*)를 포함해 주세요",
    }),
  verification_code: z.string().length(6, { message: "6자리를 입력해 주세요" }),
  nickname: z.string().min(2, { message: "2자리 이상 입력해 주세요" }),
});
export const loginFormSchema = registerFormSchema.pick({ email: true, password: true });
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  role: z.enum(["admin", "user"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  followerCount: z.number(),
  followeeCount: z.number(),
});

export type RegisterFormType = z.infer<typeof registerFormSchema>;
export type LoginFormType = Pick<RegisterFormType, "email" | "password">;
export type UserType = z.infer<typeof userSchema>;
