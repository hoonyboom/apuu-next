import { api } from "@/lib/api.route";
import Service from "@/services/Service";

class authService extends Service {
  async postSendCode(email: string) {
    return await this.http.post({ url: api.send_code, data: { email }, isPublic: true });
  }

  async postCheckEmail(email: string) {
    return await this.http.post({
      url: api.check_email,
      data: { email },
      isPublic: true,
    });
  }

  async postRegister<T>(body: { email: string; password: string; nickname: string }) {
    return await this.http.post<T>({
      url: api.register_email,
      data: body,
      isPublic: true,
    });
  }

  async postLogin<T>(email: string, password: string) {
    const token = btoa(`${email}:${password}`);
    return await this.http.post<T>({
      url: api.login_email,
      isPublic: true,
      config: {
        headers: {
          authorization: `Basic ${token}`,
        },
      },
    });
  }

  async postLogout() {
    return await this.http.post({ url: api.logout });
  }
}

export const authAPI = new authService();
