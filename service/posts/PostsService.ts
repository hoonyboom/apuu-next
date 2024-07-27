import { api } from "@/lib/config/api.route"
import Service from "@/service/Service"
import { CreatePostBodyType } from "@/types/zod.schema"

class PostsService extends Service {
  async postCreatePost(body: CreatePostBodyType) {
    return await this.http.post<CreatePostBodyType>({
      url: api.posts.create_post,
      data: body,
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
