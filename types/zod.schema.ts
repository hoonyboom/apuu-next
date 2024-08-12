import { AREA, METHOD, PASSWORD_REGEX, PERIOD, SORT } from "@/lib/const"
import { z } from "zod"

/* 회원가입폼 스키마 */
export const signUpFormSchema = z.object({
  email: z.string().email({ message: "이메일이 필요해요" }),
  password: z
    .string()
    .min(8, { message: "8자리 이상 입력해 주세요" })
    .max(15, { message: "15자리 이하로 입력해 주세요" })
    .regex(PASSWORD_REGEX, {
      message: "영문, 숫자, 특수문자(~!@#$%^&*)를 포함해 주세요",
    }),
  verification_code: z.string().length(6, { message: "6자리를 입력해 주세요" }),
  nickname: z.string().min(2, { message: "2자리 이상 입력해 주세요" }),
})

/* 로그인폼 스키마 */
export const loginFormSchema = signUpFormSchema.pick({ email: true, password: true })

/* 모집폼 스키마 */
export const registerFormSchema = z.object({
  sort: z.enum(SORT),
  method: z.enum(METHOD),
  size: z.string().refine(value => parseInt(value) <= 10),
  period: z.enum(PERIOD),
  level: z.array(z.string()).nonempty({
    message: "하나 이상 선택해주세요",
  }),
  style: z.array(z.string()).nonempty({
    message: "하나 이상 선택해주세요",
  }),
  goal: z.array(z.string()).nonempty({
    message: "하나 이상 선택해주세요",
  }),
  deadline: z.date(),
  title: z.string().min(1),
  area: z.enum(AREA),
})

/* BASE 엔티티 모델 */
export const baseEntitySchema = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

/**
 * Image 엔티티 모델
 * - Relation(post, user)은 제외했음
 */
export const imageEntitySchema = z.object({
  order: z.number(),
  type: z.enum(["POST_IMAGE", "USER_IMAGE"]),
  src: z.string(),
})

export const imageSchema = baseEntitySchema.merge(imageEntitySchema)

/* User 엔티티 모델 */
export const userEntitySchema = z.object({
  email: z.string().email(),
  nickname: z.string(),
  role: z.enum(["admin", "freetier", "prime"]),
  followerCount: z.number(),
  followeeCount: z.number(),
  image: imageSchema.nullable(),
})

export const userSchema = baseEntitySchema.merge(userEntitySchema)

/* Post 엔티티 모델 */
export const postEntitySchema = z.object({
  content: z.string(),
  images: z.array(imageSchema),
  deadline: z.string().datetime(),
  author: userSchema,
})

export const postSchema = baseEntitySchema
  .merge(postEntitySchema)
  .merge(registerFormSchema.omit({ deadline: true }))

/* Export as Type */
export type SignUpFormType = z.infer<typeof signUpFormSchema>
export type LoginFormType = Pick<SignUpFormType, "email" | "password">
export type CreatePostBodyType = z.infer<typeof registerFormSchema> & {
  content: string
  images?: string[]
}
export type UserEntity = z.infer<typeof userSchema>
export type PostEntity = z.infer<typeof postSchema>
export type ImageEntity = z.infer<typeof imageSchema>
