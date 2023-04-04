"use client";

import "client-only";

import { useAuth0 } from "@auth0/auth0-react";
import { authExchange } from "@urql/exchange-auth";
import { cacheExchange } from "@urql/exchange-graphcache";
import { ReactNode } from "react";
import { createClient, fetchExchange, Provider } from "urql";

import schema from "~/gql/urql-introspection";

export default function UrqlProvider({ children }: { children: ReactNode }) {
  const { getAccessTokenSilently } = useAuth0();

  return (
    <Provider
      value={createClient({
        url: "/api/graphql", // process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
        fetchOptions: {
          // credentials: "include",
          mode: "cors",
        },
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
              SemitagSuggestTagsReturn() {
                return null;
              },
            },
          }),
          authExchange(async (utils) => {
            let accessToken: string | undefined;
            return {
              addAuthToOperation(operation) {
                if (!accessToken) return operation;
                return utils.appendHeaders(operation, {
                  Authorization: `Bearer ${accessToken}`,
                });
              },
              willAuthError() {
                return !accessToken;
              },
              didAuthError() {
                // TODO: 原因が本当に認証エラーだったかどうかをチェックする
                return true;
              },
              async refreshAuth() {
                accessToken = await getAccessTokenSilently().catch(
                  () => undefined
                );
              },
            };
          }),
          fetchExchange,
        ],
      })}
    >
      {children}
    </Provider>
  );
}
