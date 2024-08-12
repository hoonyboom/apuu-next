import { paginatePostType } from "@/types"
import { CreatePostBodyType } from "@/types/zod.schema"
import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query"
import { postsAPI } from "./PostsService"

export const QK = {
  posts: ["posts"] as const,
  detail: (postId: number) => [...QK.posts, postId] as const,
  detailComments: (postId: number) => [...QK.detail(postId), "comments"] as const,
}

export const queryOptions = {
  create_post: () =>
    ({
      mutationKey: QK.posts,
      mutationFn: async (body: CreatePostBodyType) => await postsAPI.postCreatePost(body),
    }) satisfies UseMutationOptions<CreatePostBodyType, Error, CreatePostBodyType>,

  get_post: (postId: number) =>
    ({
      queryKey: QK.detail(postId),
      queryFn: async () => await postsAPI.getPost(postId),
    }) satisfies UseQueryOptions,

  get_posts: (query?: string) =>
    ({
      queryKey: QK.posts,
      queryFn: async ({ pageParam }) => {
        const params = new URLSearchParams()
        params.append("where__id__more_than", String(pageParam))

        if (query) {
          const queryParams = new URLSearchParams(query)
          queryParams.forEach((value, key) => {
            params.append(key, value)
          })
        }

        return await postsAPI.getPosts(params.toString())
      },
      initialPageParam: 0,
      getNextPageParam: (lastpage, pages) => lastpage.cursor?.after,
    }) satisfies UseInfiniteQueryOptions<paginatePostType>,

  get_post_detail: (postId: number) =>
    ({
      queryKey: QK.detail(postId),
      queryFn: () => postsAPI.getPost(postId),
    }) satisfies UseQueryOptions,
}
