import { Nav } from "%/Layout";
import { Toaster } from "%/ui/toaster";
import { ReactQueryProvider } from "@/contexts";
import { METADATA, VIEWPORT } from "@/lib/const";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = METADATA;
export const viewport: Viewport = VIEWPORT;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Nav />
          <main>{children}</main>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
