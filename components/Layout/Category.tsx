"use client"

import { SORT } from "@/lib/const"
import { usePostsQuery } from "@/service/posts/usePostsService"
import { useMemo, useState } from "react"
import { Spinner } from "../ui/spinner"

const CATEGORIES = ["전체", ...SORT]

export default function Category() {
  const { data, isError, isLoading, fetchNextPage } = usePostsQuery()
  const [category, setCategory] = useState("전체")

  const selectedCategory = useMemo(
    () => (category === "전체" ? data : data?.filter(post => post.sort === category)),
    [data, category],
  )

  if (isError) return <p>오류</p>
  if (isLoading) return <Spinner />

  return (
    <>
      <div className="my-10 flex gap-8 px-8">
        {CATEGORIES.map(v => (
          <h3 key={v} className="cursor-pointer" onClick={() => setCategory(v)}>
            {v}
          </h3>
        ))}
      </div>

      {isError ? (
        <p>Error...</p>
      ) : isLoading ? (
        <Spinner />
      ) : (
        selectedCategory?.map(post => post && <h3 key={post.id}>{post.title}</h3>)
      )}
    </>
  )
}
