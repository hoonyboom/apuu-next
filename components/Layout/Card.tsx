import { dateFormatter } from "@/lib/util"
import { PostEntity } from "@/types/zod.schema"
import Link from "next/link"
import Avatar from "../ui/Avatar"
import { Separator } from "../ui/separator"

type CardProps = {
  post: PostEntity
}

export default function Card({ post }: CardProps) {
  return (
    <Link href={`/recruit/${post.id}`}>
      <div className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-gray-200 px-5 pb-6 pt-8">
        <div className="flex max-w-fit items-center gap-1 rounded-2xl bg-gray-200/60 px-3 py-px text-2xs font-semibold">
          <span>
            {post.sort === "수친" ? "🐸" : post.sort === "스윔클럽" ? "🔮" : "🥊"}
          </span>
          <span>{post.sort}</span>
        </div>
        <div className="text-2xs text-muted-foreground">
          마감일 | {dateFormatter(post.deadline)}
        </div>
        <h5 className="line-clamp-2 min-h-12 text-ellipsis">{post.title}</h5>
        <div className="line-clamp-1 flex flex-wrap gap-1 overflow-ellipsis text-2xs">
          {post.level.map(v => (
            <span
              key={v}
              className="rounded-2xl bg-gray-100 px-3 py-px font-semibold text-blue-500"
            >
              {v}
            </span>
          ))}
        </div>
        <Separator className="mb-1 mt-2" />
        <div className="flex items-center gap-2 text-2xs font-semibold">
          <Avatar className="size-6" src={post.author.image?.src} />
          <span>{post.author.nickname}</span>
        </div>
      </div>
    </Link>
  )
}
