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

import { GraphCacheConfig } from "~/gql/graphql";
import { RestProvider } from "~/rest";

export const handlers = [];

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
        TagConnection() {
          return null;
        },
        VideoConnection() {
          return null;
        },
        MylistRegistrationConnection() {
          return null;
        },
        VideoSimilarVideosPayload() {
          return null;
        },
        VideoSimilarity() {
          return null;
        },
        MylistRecommendedVideosPayload() {
          return null;
        },
        MylistVideoRecommendation() {
          return null;
        },
        SemitagConnection() {
          return null;
        },
        SigninSucceededPayload() {
          return null;
        },
        SigninFailedPayload() {
          return null;
        },
        SignupSucceededPayload() {
          return null;
        },
        SignupFailedPayload() {
          return null;
        },
        FetchNicovideoPayload() {
          return null;
        },
        NicovideoOriginalSource() {
          return null;
        },
        NicovideoOriginalSourceTag() {
          return null;
        },
        NicovideoOriginalSourceTagSearchTagsPayload() {
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
