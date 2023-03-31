import "~/styles/globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import React from "react";

import { GlobalNavigation } from "~/components/global/Navigation/Navigation";
import { GlobalFooter } from "~/components/GlobalFooter";
import { ToastProvider } from "~/components/Toaster";

import { UrqlProvider } from "./UrqlProvider";

export const metadata: Metadata = {
  title: "Otomadb",
  description:
    "Otomadbは音MADの体系的なデータベースを目指して開発されています。",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    type: "website",
    url: "https://otomadb.com",
    title: "Otomadb",
    siteName: "Otomadb",
    description:
      "Otomadbは音MADの体系的なデータベースを目指して開発されています。",
  },
  twitter: {
    card: "summary",
    title: `Otomadb`,
    site: "@SnO2WMaN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UrqlProvider>
      <ToastProvider selector="#toast">
        <html lang="ja">
          <body className={clsx(["relative"], ["bg-slate-50"])}>
            <GlobalNavigation
              className={clsx(
                ["sticky"],
                ["top-0"],
                ["w-full"],
                ["h-[64px]"],
                ["z-1"]
              )}
            />
            <div className={clsx(["min-h-[calc(100vh-64px)]"], [["py-8"]])}>
              {children}
            </div>
            <GlobalFooter />
            <div id="toast" />
          </body>
        </html>
      </ToastProvider>
    </UrqlProvider>
  );
}
