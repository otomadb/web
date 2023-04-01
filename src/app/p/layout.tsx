"use client";

import React from "react";
import SessionReact from "supertokens-auth-react/recipe/session";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionReact.SessionAuth>{children}</SessionReact.SessionAuth>;
}
