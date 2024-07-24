import { api } from "@/lib/config/api.route";
import Service from "@/service/Service";

class AuthService extends Service {
  async postSendCode(email: string) {
    return await this.http.post({
      url: api.auth.send_code,
      data: { email },
      isPublic: true,
    });
  }

  async postCheckEmail(email: string) {
    return await this.http.post({
      url: api.auth.check_email,
      data: { email },
      isPublic: true,
    });
  }

  async postRegister<T>(body: { email: string; password: string; nickname: string }) {
    return await this.http.post<T>({
      url: api.auth.register_email,
      data: body,
      isPublic: true,
    });
  }

  async postLogin<T>(email: string, password: string) {
    const token = btoa(`${email}:${password}`);
    return await this.http.post<T>({
      url: api.auth.login_email,
      isPublic: true,
      config: {
        headers: {
          authorization: `Basic ${token}`,
        },
      },
    });
  }

  async postLogout() {
    return await this.http.post({ url: api.auth.logout });
  }
}

export const authAPI = new AuthService();
