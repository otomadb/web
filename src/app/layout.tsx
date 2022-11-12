import "~/styles/globals.css";

import React from "react";

import { GlobalNav } from "~/components/GlobalNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <GlobalNav />
        {children}
      </body>
    </html>
  );
}
