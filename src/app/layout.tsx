"use client";

import "~/styles/globals.css";

import clsx from "clsx";
import React from "react";
import { RecoilRoot } from "recoil";

import { GlobalNav } from "~/components/GlobalNav/GlobalNav";

import { TokenRefresher } from "./TokenRefresher";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <RecoilRoot>
          <TokenRefresher />
          <GlobalNav className={clsx(["w-full"])} />
          <div className={clsx(["container"], ["mx-auto"], ["py-8"])}>
            {children}
          </div>
        </RecoilRoot>
      </body>
    </html>
  );
}
