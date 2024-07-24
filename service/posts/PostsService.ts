import { RegisterFormDataType } from "@/components/Form/types";
import { api } from "@/lib/config/api.route";
import Service from "@/service/Service";

class PostsService extends Service {
  async postCreatePost(body: RegisterFormDataType) {
    return await this.http.post<RegisterFormDataType>({
      url: api.posts.create_post,
      data: body,
    });
  }
}

export const postsAPI = new PostsService();
