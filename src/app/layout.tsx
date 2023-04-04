import "~/styles/globals.css";

import clsx from "clsx";
import type { Metadata } from "next";
import React from "react";

import Auth0Provider from "~/auth0/Provider";
import { GlobalFooter } from "~/components/GlobalFooter";
import GlobalNav from "~/components/GlovalNav";
import { ToastProvider } from "~/components/Toaster";
import UrqlProvider from "~/urql/Provider";

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
    <html lang="ja">
      <Auth0Provider>
        <UrqlProvider>
          <ToastProvider selector="#toast">
            <body className={clsx(["relative"], ["bg-slate-50"])}>
              <GlobalNav
                className={clsx(
                  ["sticky"],
                  ["top-0"],
                  ["w-full"],
                  ["h-[64px]"],
                  ["z-1"]
                )}
              />
              <div className={clsx(["min-h-[calc(100vh-64px)]"])}>
                {children}
              </div>
              <GlobalFooter />
              <div id="toast" />
            </body>
          </ToastProvider>
        </UrqlProvider>
      </Auth0Provider>
    </html>
  );
}
