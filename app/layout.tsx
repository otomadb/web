import "./globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import React from "react";

import { GlobalFooter } from "~/components/GlobalFooter";

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
    <html lang="ja">
      <body className={clsx()}>
        <main>{children}</main>
        <GlobalFooter />
      </body>
    </html>
  );
}
