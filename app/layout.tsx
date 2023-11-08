import "./globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import React from "react";

import { GlobalFooter } from "~/components/GlobalFooter";
import { ToastProvider } from "~/components/Toaster";

import Auth0Provider from "./Auth0Provider";
import UrqlProvider from "./UrqlProvider";

export const metadata: Metadata = {
  title: "OtoMADB",
  description:
    "OtoMADBは音MADの体系的なデータベースを目指して開発されています。",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    type: "website",
    url: "https://otomadb.com",
    title: "OtoMADB",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Auth0Provider>
      <UrqlProvider>
        <ToastProvider selector="#toast">
          <html lang="ja">
            <body className={clsx()}>
              <div id="toast" />
              <main>{children}</main>
              <GlobalFooter />
            </body>
          </html>
        </ToastProvider>
      </UrqlProvider>
    </Auth0Provider>
  );
}
