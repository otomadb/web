"use client";

import { ReactNode } from "react";

import { GraphQLProvider } from "~/hooks/useGraphQLClient";

export default function Providers({ children }: { children: ReactNode }) {
  return <GraphQLProvider>{children}</GraphQLProvider>;
}
