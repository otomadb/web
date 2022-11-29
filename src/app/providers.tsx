"use client";

import { ReactNode } from "react";

import { GraphQLProvider } from "~/hooks/useGraphQLClient";
import { WhoamiProvider } from "~/hooks/useWhoami";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GraphQLProvider>
      <WhoamiProvider>{children}</WhoamiProvider>
    </GraphQLProvider>
  );
}
