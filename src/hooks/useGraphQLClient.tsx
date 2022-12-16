"use client";

import "client-only";

import { cacheExchange } from "@urql/exchange-graphcache";
import React, { ReactNode } from "react";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";

import { GraphCacheConfig } from "~/gql/graphql";

const client = createClient({
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
        SearchTagsResultItem() {
          return null;
        },
        SearchVideosPayload() {
          return null;
        },
        SearchVideosResultItem() {
          return null;
        },
        TagVideoPayload() {
          return null;
        },
        UntagVideoPayload() {
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
      },
    }),
    fetchExchange,
  ],
});

export const GraphQLProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <Provider value={client}>{children}</Provider>;
};
