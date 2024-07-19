import { z } from "zod";

const client = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_COLLAB_DOC_PREFIX: z.string(),
  NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID: z.string(),
});

const server = client.extend({
  NODE_ENV: z.enum(["development", "test", "production"]),
  TIPTAP_COLLAB_SECRET: z.string(),
});

const processEnv = {
  // 클라이언트
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_COLLAB_DOC_PREFIX: process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX,
  NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID,

  // 서버
  NODE_ENV: process.env.NODE_ENV,
  TIPTAP_COLLAB_SECRET: process.env.TIPTAP_COLLAB_SECRET,
};

// --------------------------
type ServerEnv = z.input<typeof server>;

let env: ServerEnv;

if (!process.env.SKIP_ENV_VALIDATION) {
  const isServer = typeof window === "undefined";
  const parsed = isServer ? server.safeParse(processEnv) : client.safeParse(processEnv);

  if (parsed.success === false) {
    console.log(Object.entries(processEnv).map(value => value));
    console.error(
      "❌ 등록되지 않은 환경변수입니다 😥",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("등록되지 않은 환경변수입니다. 설정을 확인해주세요");
  }

  // 자동완성은 모든 변수를 보기 위해 ServerEnv로 assertion
  // 잘못 사용할 경우 내부에서 에러 출력
  env = new Proxy(parsed.data as ServerEnv, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;

      // 클라이언트에서 서버 환경변수에 접근시 에러 메시지 송출
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ 클라이언트에서 서버측 환경변수를 사용할 수 없습니다"
            : `❌ 클라이언트에서 서버 환경변수 '${prop}'를 사용하려 합니다`,
        );

      return target[prop as keyof typeof target];
    },
  });
}

export { env };
