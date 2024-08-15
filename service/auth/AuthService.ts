import { api } from "@/lib/config/api.route"
import Service, { TError, TSuccess } from "@/service/Service"
import { UserEntity } from "@/types/zod.schema"

class AuthService extends Service {
  async postSendCode(email: string) {
    return await this.http.post({
      url: api.auth.send_code,
      data: { email },
      isPublic: true,
    })
  }

  async postVerifyCode(email: string, verify_code: string) {
    return await this.http.post<TSuccess | TError>({
      url: api.auth.verify_code,
      data: { email, verify_code },
      isPublic: true,
    })
  }

  async postCheckEmail(email: string) {
    return await this.http.post<TSuccess | TError>({
      url: api.auth.check_email,
      data: { email },
      isPublic: true,
    })
  }

  async postRegister(body: { email: string; password: string; nickname: string }) {
    return await this.http.post<UserEntity | TError>({
      url: api.auth.register_email,
      data: body,
      isPublic: true,
    })
  }

  async postLogin<T>(email: string, password: string) {
    const token = btoa(`${email}:${password}`)
    return await this.http.post<
      { user: UserEntity; tokens: { accessToken: string; refreshToken: string } } | TError
    >({
      url: api.auth.login_email,
      isPublic: true,
      config: {
        headers: {
          authorization: `Basic ${token}`,
        },
      },
    })
  }

  async postLogout() {
    return await this.http.post({ url: api.auth.logout })
  }
}

export const authAPI = new AuthService()
