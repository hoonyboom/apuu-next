import { CreatePostBodyType } from "@/types/zod.schema"
import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { QK, queryOptions } from "./queries"

export function usePostsQuery(query?: string) {
  const { data: rawData, ...props } = useInfiniteQuery({
    ...queryOptions.get_posts(query),
  })

  const data = rawData?.pages.flatMap(page => page.data)
  return { data, ...props }
}

export async function usePostsPrefetchQuery(query?: string) {
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    ...queryOptions.get_posts(query),
  })

  return queryClient
}

export function usePostsMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    ...queryOptions.create_post(),
    onMutate: async (newPost: CreatePostBodyType) => {
      await queryClient.cancelQueries({ queryKey: QK.posts })
      const previousPosts = queryClient.getQueryData<CreatePostBodyType[]>(QK.posts)
      if (previousPosts) {
        await queryClient.setQueryData(QK.posts, [...previousPosts, newPost])
      }

      return { previousPosts }
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(QK.posts, context?.previousPosts)
    },
    onSuccess: async () => {
      console.log("invalidate [posts] query")
      await queryClient.invalidateQueries({ queryKey: QK.posts })
    },
  })
}
