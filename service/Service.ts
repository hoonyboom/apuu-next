import { api } from "@/lib/config/api.route";
import { env } from "@/lib/config/env";
import { getCookie } from "cookies-next";

type FetchOptions = {
  url: string;
  data?: unknown;
  config?: RequestInit;
  isPublic?: boolean;
};

type Fetcher = {
  get<T>({ url, config, isPublic }: FetchOptions): Promise<T | TError>;
  post<T = TSuccess>({ url, data, config, isPublic }: FetchOptions): Promise<T | TError>;
  patch<T = TSuccess>({ url, data, config }: FetchOptions): Promise<T | TError>;
  delete<T = TSuccess>({ url, config }: FetchOptions): Promise<T | TError>;
};

export type TSuccess = {
  success: boolean;
  message: string;
};

type TError = {
  message: string;
  statusCode: number;
  error: string;
};

class Service {
  public http: Fetcher;
  private headers: Record<string, string>;
  private readonly baseURL: string;

  constructor() {
    this.baseURL =
      env.NODE_ENV === "development"
        ? "http://localhost:3002"
        : `${env.NEXT_PUBLIC_BASE_URL}/api`;
    this.headers = {};
    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      post: this.post.bind(this),
      patch: this.patch.bind(this),
    };
  }

  private async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInit,
    isPublic?: boolean,
  ): Promise<T> {
    // 권한이 필요한 요청에 대해 accessToken이 만료됐는지 매번 확인하고
    // 만료됐다면 자동으로 재발급한다
    if (!isPublic) {
      const isTokenAlive = getCookie("isTokenAlive");

      if (!isTokenAlive) {
        try {
          await fetch(this.baseURL + api.auth.revalidate_access_token, {
            method: "POST",
            credentials: "include",
          });
        } catch (error) {
          console.error("Error:", "accessToken 재발급에 실패했습니다.");
        }
      }

      this.headers = {
        "XSRF-TOKEN": getCookie("XSRF-TOKEN") ?? "",
      };
    }

    try {
      const res = await fetch(this.baseURL + url, {
        method,
        credentials: "include",
        body: data ? JSON.stringify(data) : undefined,
        ...config,
        headers: {
          "Content-Type": "application/json",
          ...this.headers,
          ...config?.headers,
        },
      });

      const responseData: T = await res.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  private get<T>({ url, config, isPublic = false }: FetchOptions): Promise<T | TError> {
    return this.request("GET", url, undefined, config, isPublic);
  }

  private delete<T>({ url, config }: FetchOptions): Promise<T | TError> {
    return this.request("DELETE", url, undefined, config);
  }

  private post<T>({
    url,
    data,
    config,
    isPublic = false,
  }: FetchOptions): Promise<T | TError> {
    return this.request("POST", url, data, config, isPublic);
  }

  private patch<T>({ url, data, config }: FetchOptions): Promise<T | TError> {
    return this.request("PATCH", url, data, config);
  }
}

export default Service;
