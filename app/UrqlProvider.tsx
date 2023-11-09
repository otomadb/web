"use client";

import "client-only";

import { ReactNode } from "react";
import { createClient, fetchExchange, Provider } from "urql";

export default function UrqlProvider({ children }: { children: ReactNode }) {
  /*
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | undefined>();

  const authInit = useCallback(
    async ({ appendHeaders }) => {
      return {
        willAuthError(operation) {
          return false;
          return (
            // `Query.whoami`を取得しようとしたときは前もって認証を行うように伝える
            operation.kind === "query" &&
            operation.query.definitions.some(
              (definition) =>
                definition.kind === "OperationDefinition" &&
                definition.selectionSet.selections.some(
                  (node) =>
                    node.kind === "Field" && node.name.value === "whoami"
                )
            )
          );
        },
        didAuthError(error) {
          return error.graphQLErrors.some(
            ({ extensions }) => extensions.code === "NOT_AUTHENTICATED"
          );
        },
        async refreshAuth() {
          if (!isAuthenticated) return;
          const t = await getAccessTokenSilently({});
          setAccessToken(t);
        },
        async addAuthToOperation(operation) {
          console.log(await getAccessToken());

          // Authorization header is already set
          const fetchOptions =
            typeof operation.context.fetchOptions === "function"
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};
          const headers = new Headers(fetchOptions.headers);
          if (headers.get("Authorization")) return operation;

          // token is set
          if (accessToken)
            return appendHeaders(operation, {
              Authorization: `Bearer ${accessToken}`,
            });

          return operation;
        },
      };
    },
    [accessToken, getAccessTokenSilently, isAuthenticated]
  ) satisfies Parameters<typeof authExchange>[0];
  */

  return (
    <Provider
      value={createClient({
        url: "/api/graphql", // process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
        fetchOptions: {
          mode: "cors",
        },
        exchanges: [
          /*
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
            },
          }),
          authExchange(authInit),
          */
          fetchExchange,
        ],
      })}
    >
      {children}
    </Provider>
  );
}
