export const api = {
  auth: {
    check_email: "auth/register/check_email",
    send_code: "auth/register/send_code",
    verify_code: "auth/register/verify_code",
    register_email: "auth/register/email",
    login_email: "auth/login/email",
    login_kakao: "auth/login/kakao",
    login_naver: "auth/login/naver",
    logout: "auth/logout",
    revalidate_access_token: "auth/token/access",
    revalidate_refresh_token: "auth/token/refresh",
  },

  posts: {
    create_post: "posts",
    get_posts: "posts",
  },

  common: {
    uploadImageAsTemp: "common/image",
  },
}
