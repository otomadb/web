import "~/styles/globals.css";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import React from "react";

import { ToastProvider } from "~/components/Toaster";
import { I18nProviderClient } from "~/locales/client";
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
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <UrqlProvider>
        <ToastProvider selector="#toast">
          <I18nProviderClient locale={locale}>
            <html lang={locale}>
              <body className={clsx("bg-obsidian-darkest")}>
                <div id="toast" />
                <main>{children}</main>
              </body>
            </html>
          </I18nProviderClient>
        </ToastProvider>
      </UrqlProvider>
    </UserProvider>
  );
}
