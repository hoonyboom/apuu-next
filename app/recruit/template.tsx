import Transition from "@/components/Layout/Transition"
import { PropsWithChildren } from "react"

export default function Template({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Transition />
    </>
  )
}
