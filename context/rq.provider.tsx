"use client"

import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { PropsWithChildren } from "react"

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: false,
        staleTime: 1000 * 60,
        gcTime: 1000 * 2,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  })

let browserQueryClient: QueryClient | null = null

const getQueryClient = () => {
  if (isServer) {
    return createQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = createQueryClient()
    return browserQueryClient
  }
}

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
