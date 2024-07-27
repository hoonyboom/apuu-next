import { Nav } from "@/components/Layout"
import Initializer from "@/components/Layout/Initializer"
import { Toaster } from "@/components/ui/toaster"
import { ReactQueryProvider } from "@/context"
import { METADATA, VIEWPORT } from "@/lib/config/metadata"
import "@/styles/globals.css"
import type { Metadata, Viewport } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = METADATA
export const viewport: Viewport = VIEWPORT

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Initializer />
        <ReactQueryProvider>
          <Nav />
          <main>{children}</main>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
