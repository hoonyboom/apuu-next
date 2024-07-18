"use client";

import { useEffect, useState } from "react";

export default function useTimer(ms: number) {
  const [count, setCount] = useState(ms);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(id);
      setIsLoading(false);
    }
    return () => clearInterval(id);
  }, [count]);

  return { isLoading };
}
