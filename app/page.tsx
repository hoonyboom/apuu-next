import { Category, Footer } from "@/components/Layout"
import { usePostsPrefetchQuery } from "@/service/posts/usePostsService"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function Home() {
  const queryClient = await usePostsPrefetchQuery()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <Landing /> */}
      <Category />
      <Footer />
    </HydrationBoundary>
  )
}
