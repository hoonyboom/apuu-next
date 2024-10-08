import { RegisterFormDataType, RegisterFormFieldProps } from "@/components/Form/types"
import { DefaultValues } from "react-hook-form"
import { env } from "./config/env"

export const IMAGE_TEMP_PATH = "/public/temp"
export const baseURL =
  env.NODE_ENV === "development" ? "http://localhost:3002" : env.NEXT_PUBLIC_BASE_URL

export const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,15}$/

export const DEFAULT_REGISTER_VALUE: DefaultValues<RegisterFormDataType> = {
  title: "",
  level: [],
  style: [],
  goal: [],
}

export const MEMBER_SIZE = Array.from({ length: 10 }, (_, i) => i + 1)
export const SORT = ["챌린지", "수친", "스윔클럽"] as const
export const METHOD = ["온라인", "오프라인", "온/오프라인"] as const
export const AREA = [
  "서울",
  "부산",
  "인천",
  "대전",
  "대구",
  "울산",
  "광주",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "경북",
  "경남",
  "전북",
  "전남",
  "제주",
] as const
export const PERIOD = [
  "1주 미만",
  "1주~1개월",
  "1개월~3개월",
  "3개월~6개월",
  "장기",
] as const
export const LEVEL = ["선수", "마스터즈", "상급", "중급", "기초"] as const
export const STYLE = ["자유형", "배영", "평영", "접영"] as const
export const GOAL = ["행복", "스트로크", "지구력", "밸런스", "스트렝스", "기타"] as const

export const SELECT_BOX_LIST = [
  {
    label: "모집 종류",
    name: "sort",
    values: SORT,
  },
  {
    label: "교류 방식",
    name: "method",
    values: METHOD,
  },
  {
    label: "진행 기간",
    name: "period",
    values: PERIOD,
  },
  {
    label: "모집 인원",
    name: "size",
    values: MEMBER_SIZE,
  },
] satisfies Omit<RegisterFormFieldProps, "form">[]

export const CHECK_BOX_LIST = [
  {
    label: "모집 수준",
    name: "level",
    values: LEVEL,
  },
  {
    label: "메인 영법",
    name: "style",
    values: STYLE,
  },
  {
    label: "훈련 중점",
    name: "goal",
    values: GOAL,
  },
] satisfies Omit<RegisterFormFieldProps, "form">[]

export const themeColors = [
  "#fb7185",
  "#fdba74",
  "#d9f99d",
  "#a7f3d0",
  "#a5f3fc",
  "#a5b4fc",
]
