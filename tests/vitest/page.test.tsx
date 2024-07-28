import { renderHook } from "@testing-library/react"
import { useState } from "react"
import { describe, expect, it } from "vitest"

export const useTransitionArray = (length: number) => {
  const [state] = useState(() => Array.from({ length }, () => false))
  return state
}

describe("트랜지션 리스트 생성", () => {
  const { result } = renderHook(() => useTransitionArray(15))
  const state = result.current

  it("디폴트는 false", () => state.forEach(v => expect(v).toBeFalsy()))
  it("크기는 15", () => expect(state.length).toBe(15))
})
