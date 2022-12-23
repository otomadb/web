"use client";

import { cacheExchange } from "@urql/exchange-graphcache";
import { setupWorker } from "msw";
import { ReactNode } from "react";
import {
  createClient as createUrqlClient,
  dedupExchange,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import { mockSignupHandler } from "~/components/Signup/useSignup";
import { GraphCacheConfig } from "~/gql/graphql";
import { mockLogoutHandler } from "~/hooks/useLogout";
import { RestProvider } from "~/rest";

export const handlers = [mockLogoutHandler, mockSignupHandler];

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

const urqlClient = createUrqlClient({
  url: new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
  fetchOptions: {
    credentials: "include",
    mode: "cors",
  },
  exchanges: [
    dedupExchange,
    cacheExchange<GraphCacheConfig>({
      keys: {
        SearchTagsPayload() {
          return null;
        },
        SearchTagsItem() {
          return null;
        },
        SearchVideosPayload() {
          return null;
        },
        SearchVideosItem() {
          return null;
        },
        AddTagToVideoPayload() {
          return null;
        },
        RemoveTagFromVideoPayload() {
          return null;
        },
        TagCollection() {
          return null;
        },
        TagHistoryCollection() {
          return null;
        },
        VideoCollection() {
          return null;
        },
        VideoHistoryCollection() {
          return null;
        },
        MylistRegistrationCollection() {
          return null;
        },
        VideoSimilarVideosPayload() {
          return null;
        },
        VideoSimilarVideoItem() {
          return null;
        },
        MylistRecommendedVideosPayload() {
          return null;
        },
        MylistRecommendedVideosItem() {
          return null;
        },
      },
    }),
    fetchExchange,
  ],
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RestProvider value={{ base: process.env.NEXT_PUBLIC_API_ENDPOINT }}>
      <UrqlProvider value={urqlClient}>{children}</UrqlProvider>
    </RestProvider>
  );
}
