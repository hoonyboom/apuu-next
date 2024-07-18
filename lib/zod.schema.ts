import { z } from "zod";
import { PASSWORD_REGEX } from "./const";

export const signUpFormSchema = z.object({
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
export const loginFormSchema = signUpFormSchema.pick({ email: true, password: true });
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

export const registerFormSchema = z.object({
  sort: z.enum(["챌린지", "훈련팀", "피드백"]),
  method: z.enum(["온라인", "오프라인", "온/오프라인"]),
  size: z.string(),
  period: z.string(),
  level: z.array(z.string()).refine(value => value.some(level => level), {
    message: "하나 이상 선택해주세요",
  }),
  style: z.array(z.string()).refine(value => value.some(style => style), {
    message: "하나 이상 선택해주세요",
  }),
  goal: z.array(z.string()).refine(value => value.some(goal => goal), {
    message: "하나 이상 선택해주세요",
  }),
  deadline: z.date(),
});

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
export type LoginFormType = Pick<SignUpFormType, "email" | "password">;
export type UserType = z.infer<typeof userSchema>;
export type RegisterFormType = z.infer<typeof registerFormSchema>;

type ExtractEnumValues<T> = T extends z.ZodEnum<infer U> ? U[number] : never;
type EnumValuesMap = {
  [K in keyof RegisterFormType]: ExtractEnumValues<(typeof registerFormSchema.shape)[K]>;
};
export const enumValuesMap: { [K in keyof EnumValuesMap]?: EnumValuesMap[K][] } = {
  sort: registerFormSchema.shape.sort.options,
  method: registerFormSchema.shape.method.options,
};
