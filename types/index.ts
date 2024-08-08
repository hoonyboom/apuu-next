import { PostEntity } from "./zod.schema"

export type ModeType = "register" | "login"

export type paginatePostType = {
  data: PostEntity[]
  cursor: {
    after: number | null
  }
  count: number
  next: string | null
}
