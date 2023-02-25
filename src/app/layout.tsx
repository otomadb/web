import "~/styles/globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import React from "react";

import { Toaster } from "~/components/common/Toaster";
import { GlobalNavigation } from "~/components/global/Navigation/Navigation";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "Otomadb",
  description: '"Otomadb"は音MADのデータベースを目指して開発されています。',
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Otomadb",
    siteName: "Otomadb",
    description: '"Otomadb"は音MADのデータベースを目指して開発されています。',
    url: "https://otomadb.com",
  },
  twitter: {
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
      <body className={clsx(["relative"], ["bg-slate-50"])}>
        <Providers>
          <GlobalNavigation
            className={clsx(
              ["sticky"],
              ["top-0"],
              ["w-full"],
              ["h-[64px]"],
              ["z-1"]
            )}
          />
          <div className={clsx(["min-h-[calc(100vh-64px)]"])}>{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
