"use client";

import { setupWorker } from "msw";
import { ReactNode } from "react";

import { GraphQLProvider } from "~/hooks/useGraphQLClient";
import { WhoamiProvider } from "~/hooks/useWhoami";
import { handlers } from "~/mocks/browser";

if (
  process.env.NEXT_PUBLIC_MSW_ENABLE === "true" &&
  typeof window !== "undefined"
) {
  const worker = setupWorker(...handlers);
  worker.start({
    onUnhandledRequest(request, print) {
      if (
        // prefetch
        request.url.pathname === "/" ||
        request.url.pathname.startsWith("/videos") ||
        request.url.pathname.startsWith("/users") ||
        request.url.pathname.startsWith("/tags") ||
        // graphql
        request.url.pathname === "/graphql" ||
        // next
        request.url.pathname.startsWith("/_next")
      )
        return;
      print.warning();
    },
  });
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GraphQLProvider>
      <WhoamiProvider>{children}</WhoamiProvider>
    </GraphQLProvider>
  );
}
