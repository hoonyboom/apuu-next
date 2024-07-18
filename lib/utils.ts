import { clsx, type ClassValue } from "clsx";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stopPropagation: MouseEventHandler = e => {
  e.stopPropagation();
};

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetcher(
  api: string,
  values?: Record<string, any>,
  options?: RequestInit,
) {
  const res = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
    ...options,
  });

  const data = await res.json();

  return {
    status: res.status,
    success: res.ok,
    data,
  };
}
