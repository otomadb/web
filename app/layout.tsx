import "./globals.css";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import React from "react";

import { ToastProvider } from "~/components/Toaster";
import { getScopedI18n } from "~/locales/server";

import UrqlProvider from "./UrqlProvider";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n("page");

  return {
    metadataBase: new URL("https://www.otomadb.com"),
    title: t("title"),
    description: t("description"),
    openGraph: {
      type: "website",
      url: "https://www.otomadb.com",
      siteName: "OtoMADB",
    },
    twitter: {
      card: "summary",
      site: "@SnO2WMaN",
    },
  };
}

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
