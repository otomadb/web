"use client";

import "~/styles/globals.css";

import React from "react";
import { RecoilRoot } from "recoil";

import { GlobalNav } from "~/components/GlobalNav/GlobalNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <html lang="ja">
        <body>
          <GlobalNav />
          {children}
        </body>
      </html>
    </RecoilRoot>
  );
}
