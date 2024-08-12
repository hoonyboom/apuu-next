import { api } from "@/lib/config/api.route"
import Service from "@/service/Service"
import { paginatePostType } from "@/types"
import { CreatePostBodyType, PostEntity } from "@/types/zod.schema"

export type paginateQueries = {
  where__id__more_that?: number
  where__id__less_than?: number
  order__created_at?: string
  take?: number
}

class PostsService extends Service {
  async postCreatePost(body: CreatePostBodyType) {
    return await this.http.post<CreatePostBodyType>({
      url: api.posts.create_post,
      data: body,
    })
  }

  async getPosts(query?: string) {
    return await this.http.get<paginatePostType>({
      url: `${api.posts.get_posts}?${query}`,
    })
  }

  async getPost(postId: number) {
    return await this.http.get<PostEntity>({
      url: `${api.posts.get_posts}/${postId}`,
    })
  }

  async postUploadImageAsTemp(file: File) {
    const formData = new FormData()
    formData.append("image", file)

    return await this.http.post<{ filename: string }>({
      url: api.common.uploadImageAsTemp,
      data: formData,
    })
  }
}

export const postsAPI = new PostsService()
