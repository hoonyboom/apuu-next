import { CreatePostBodyType } from "@/types/zod.schema";
import { postsAPI } from "./PostsService";

export const QK = {
  create_post: ["create_post"],
};

export const queryOptions = {
  create_post: () => ({
    mutationKey: QK.create_post,
    mutationFn: async (body: CreatePostBodyType) => await postsAPI.postCreatePost(body),
  }),
};
