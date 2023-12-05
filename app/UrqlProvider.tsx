"use client";

import "client-only";

import { cacheExchange } from "@urql/exchange-graphcache";
import { ReactNode } from "react";
import { createClient, fetchExchange, Provider } from "urql";

import schema from "~/gql/urql-introspection";

export default function UrqlProvider({ children }: { children: ReactNode }) {
  return (
    <Provider
      value={createClient({
        url: "/api/graphql",
        exchanges: [
          cacheExchange({
            schema,
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
              SemitagSuggestTagsReturn() {
                return null;
              },
              TimelineEvent() {
                return null;
              },
            },
          }),
          fetchExchange,
        ],
      })}
    >
      {children}
    </Provider>
  );
}
