import { z } from "zod"

const client = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_BASE_URL: z.string(),
})

const server = client.extend({})

const processEnv = {
  // 클라이언트
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,

  // 서버
}

// --------------------------
type ServerEnv = z.input<typeof server>

let env: ServerEnv

if (!process.env.SKIP_ENV_VALIDATION) {
  const isServer = typeof window === "undefined"
  const parsed = isServer ? server.safeParse(processEnv) : client.safeParse(processEnv)

  if (parsed.success === false) {
    console.error(
      "❌ 등록되지 않은 환경변수입니다 😥",
      parsed.error.flatten().fieldErrors,
    )
    throw new Error("등록되지 않은 환경변수입니다. 설정을 확인해주세요")
  }

  // 자동완성은 모든 변수를 보기 위해 ServerEnv로 assertion
  // 잘못 사용할 경우 내부에서 에러 출력
  env = new Proxy(parsed.data as ServerEnv, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined

      // 클라이언트에서 서버 환경변수에 접근시 에러 메시지 송출
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_") && prop !== "NODE_ENV")
        throw new Error(
          env.NODE_ENV === "production"
            ? "❌ 클라이언트에서 서버측 환경변수를 사용할 수 없습니다"
            : `❌ 클라이언트에서 서버 환경변수 '${prop}'를 사용하려 합니다`,
        )

      return target[prop as keyof typeof target]
    },
  })
}

export { env }
