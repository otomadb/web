"use client";

import "~/styles/globals.css";

import clsx from "clsx";
import React from "react";
import { RecoilRoot } from "recoil";

import { GlobalNav } from "~/components/GlobalNav/GlobalNav";

import { WhoAmI } from "./WhoAmI";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <RecoilRoot>
          <WhoAmI />
          <GlobalNav className={clsx(["w-full"])} />
          <div className={clsx(["container"], ["mx-auto"], ["py-8"])}>
            {children}
          </div>
        </RecoilRoot>
      </body>
    </html>
  );
}
