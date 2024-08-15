import { api } from "@/lib/config/api.route"
import { baseURL } from "@/lib/const"

export const oauthURL = {
  kakao: `${baseURL}/api/${api.auth.login_kakao}`,
  naver: `${baseURL}/api/${api.auth.login_naver}`,
}
