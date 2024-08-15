import { Category, Footer } from "@/components/Layout"
import { usePostsPrefetchQuery } from "@/service/posts/usePostsService"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function Home() {
  const queryClient = await usePostsPrefetchQuery()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mb-5 flex-1">
        <Category />
      </div>
      <Footer />
    </HydrationBoundary>
  )
}
