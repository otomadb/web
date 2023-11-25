"use client";

import "client-only";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { ReactNode } from "react";

export default withPageAuthRequired(function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}, {});
