"use client"

import { useEffect, useRef, useState } from "react"

interface ObserverConfig extends IntersectionObserverInit {
  freezeAfterVisible?: boolean
}

export default function useIso<T extends HTMLElement = HTMLDivElement>(
  config: ObserverConfig = {},
) {
  const elementRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const defaultConfig: ObserverConfig = {
    threshold: 0,
    root: null,
    rootMargin: "0%",
    freezeAfterVisible: false,
    ...config,
  }

  const { freezeAfterVisible, root, rootMargin, threshold } = defaultConfig

  const frozen = isVisible && freezeAfterVisible

  const updateEntry = (entries: IntersectionObserverEntry[]): void => {
    const [entry] = entries
    setEntry(entry)
    setIsVisible(entry.isIntersecting)
  }

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!globalThis.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerConfig = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerConfig)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin, frozen])

  return { elementRef, isVisible, entry }
}
