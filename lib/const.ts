import { env } from "@/lib/env";
import { Viewport, type Metadata } from "next";

export const METADATA: Metadata = {
  title: "Apuu",
  applicationName: "Apuu",
  description:
    "어푸! 수영 챌린지, 프로그램을 구성하고 참여해보세요. 팀원들과 기록을 쌓으며 성장할 수 있어요.",
  keywords: [
    "apuu",
    "어푸",
    "어푸어푸",
    "수영",
    "수영 프로그램",
    "수영 친구",
    "수영 챌린지",
    "수영 훈련팀",
    "수영 계획",
  ],
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  robots: "noindex, nofollow",
  icons: {
    icon: "/assets/svgs/logo-fish.svg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@apuu",
    creator: "@apuu",
  },
  openGraph: {
    title: "Apuu",
    description:
      "어푸! 수영 챌린지, 프로그램을 구성하고 참여해보세요. 팀원들과 기록을 쌓으며 성장할 수 있어요.",
  },
};

export const VIEWPORT: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  minimumScale: 1,
  initialScale: 1,
  maximumScale: 1,
};

export const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,15}$/;

export const MEMBER_SIZE = [
  "1명",
  "2명",
  "3명",
  "4명",
  "5명",
  "6명",
  "7명",
  "8명",
  "9명",
  "10명",
];

export const PERIOD = [
  "기간 미정",
  "1개월",
  "2개월",
  "3개월",
  "4개월",
  "5개월",
  "6개월",
  "장기",
];

export const LEVEL = ["마스터즈", "연수", "상급", "중급", "기초"] as const;
export const STYLE = ["자유형", "배영", "평영", "접영"] as const;
export const GOAL = ["스트로크 효율", "스트렝스", "밸런스", "지구력"] as const;
