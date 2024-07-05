import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProviders from "@/hooks/useReactQuery";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apuu",
  description: "모두의 수영",
  icons: {
    icon: "/assets/svgs/logo-fish.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProviders>
          <Nav />
          <Toaster />
          <main>{children}</main>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
