"use client"

import { Spinner } from "@/components/ui/spinner"
import { usePostQuery } from "@/service/posts/usePostsService"
import { useParams } from "next/navigation"

export default function Page() {
  const { id } = useParams<{ id: string }>()
  const { data: post, isLoading, isError } = usePostQuery(+id)

  if (isError) return <p>Error...</p>
  if (isLoading) return <Spinner size="large" />

  return (
    <div>
      <h1>{post?.title}</h1>
    </div>
  )
}
