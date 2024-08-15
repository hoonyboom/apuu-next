import { useToast } from "@/hook"
import { CreatePostBodyType } from "@/types/zod.schema"
import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { QK, queryOptions } from "./queries"

export function usePostQuery(postId: number) {
  return useQuery({
    ...queryOptions.get_post(postId),
  })
}

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
  const { toast } = useToast()
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
      toast({
        title: "새로운 포스트를 등록했어요!",
      })
      await queryClient.invalidateQueries({ queryKey: QK.posts })
    },
  })
}
