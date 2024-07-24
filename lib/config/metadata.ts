import { Viewport, type Metadata } from "next";
import { env } from "./env";

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
