"use client";

import { cacheExchange } from "@urql/exchange-graphcache";
import { ReactNode } from "react";
import {
  createClient as createUrqlClient,
  dedupExchange,
  fetchExchange,
  Provider,
} from "urql";

import { GraphCacheConfig } from "~/gql/graphql";

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
        TagSearchItemByName() {
          return null;
        },
        SearchVideosPayload() {
          return null;
        },
        VideoSearchItemByTitle() {
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
        RequestNicovideoRegistrationSucceededPayload() {
          return null;
        },
      },
    }),
    fetchExchange,
  ],
});

export function UrqlProvider({ children }: { children: ReactNode }) {
  return <Provider value={urqlClient}>{children}</Provider>;
}
