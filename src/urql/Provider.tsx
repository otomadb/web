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
          authExchange(async ({ appendHeaders }) => {
            let token: string | undefined;
            return {
              addAuthToOperation(operation) {
                if (!token) return operation;

                const fetchOptions =
                  typeof operation.context.fetchOptions === "function"
                    ? operation.context.fetchOptions()
                    : operation.context.fetchOptions || {};
                const headers = new Headers(fetchOptions.headers);
                if (headers.get("Authorization")) return operation;

                return appendHeaders(operation, {
                  Authorization: `Bearer ${token}`,
                });
              },
              didAuthError(error) {
                const f = error.graphQLErrors.find(
                  ({ extensions }) => extensions.code === "NOT_AUTHENTICATED"
                );
                return !!f;
              },
              async refreshAuth() {
                token = await getAccessTokenSilently();
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
