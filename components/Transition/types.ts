import { Dispatch, SetStateAction } from "react"

export type TimerProps = {
  count: number
  setCount: Dispatch<SetStateAction<number>>
  setIsTimer: Dispatch<SetStateAction<boolean>>
}
