import "./globals.css";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import React from "react";

import { ToastProvider } from "~/components/Toaster";

import UrqlProvider from "./UrqlProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://otomadb.com"),
  title: "OtoMADB",
  description:
    "OtoMADBは音MADの体系的なデータベースを目指して開発されています。",
  openGraph: {
    type: "website",
    url: "https://otomadb.com",
    // title: "OtoMADB",
    siteName: "OtoMADB",
    description:
      "OtoMADBは音MADの体系的なデータベースを目指して開発されています。",
  },
  twitter: {
    card: "summary",
    title: `OtoMADB`,
    site: "@SnO2WMaN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <UrqlProvider>
        <ToastProvider selector="#toast">
          <html lang="ja">
            <body className={clsx("bg-obsidian-darkest")}>
              <div id="toast" />
              <main>{children}</main>
            </body>
          </html>
        </ToastProvider>
      </UrqlProvider>
    </UserProvider>
  );
}
