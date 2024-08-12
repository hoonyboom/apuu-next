"use client"

import { useEffect, useState } from "react"

export default function useTimer(s: number) {
  const [count, setCount] = useState(s)
  const [isShowing, setIsShowing] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count => count - 1)
    }, 1000)

    if (count === 0) {
      clearInterval(id)
      setIsShowing(false)
    }
    return () => clearInterval(id)
  }, [count])

  return [isShowing]
}
