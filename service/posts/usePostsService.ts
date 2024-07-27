import { CreatePostBodyType } from "@/types/zod.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QK, queryOptions } from "./queries"

export function usePostsMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    ...queryOptions.create_post(),
    onMutate: async (newPost: CreatePostBodyType) => {
      await queryClient.cancelQueries({ queryKey: QK.create_post })
      const previousPosts = queryClient.getQueryData<CreatePostBodyType[]>(QK.create_post)
      if (previousPosts) {
        await queryClient.setQueryData(QK.create_post, [...previousPosts, newPost])
      }

      return { previousPosts }
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(QK.create_post, context?.previousPosts)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QK.create_post })
    },
  })
}
