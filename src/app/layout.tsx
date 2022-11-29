import "~/styles/globals.css";

import clsx from "clsx";
import React from "react";

import { GlobalNav } from "~/components/GlobalNav/GlobalNav";
import { Toaster } from "~/components/Toaster";

import Providers from "./providers";
import { TokenRefresher } from "./TokenRefresher";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={clsx(["relative"])}>
        <Providers>
          <TokenRefresher />
          <GlobalNav
            className={clsx(
              ["sticky"],
              ["top-0"],
              ["w-full"],
              ["h-16"],
              ["z-1"]
            )}
          />
          <div
            className={clsx(["relative"], ["container"], ["mx-auto"], ["py-8"])}
          >
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
