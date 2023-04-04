"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

export const Mutation = graphql(`
  mutation CheckSemitagsPage_ResolveSemitag($tagId: ID!, $semitagId: ID!) {
    resovleSemitag(semitagId: $semitagId, tagId: $tagId) {
      __typename
      ... on ResolveSemitagSucceededPayload {
        ...CheckSemitagsPage_ResolveSucceededToast
      }
    }
  }
`);
const useResolve = (
  semitagId: string,
  {
    onSuccess,
  }: {
    onSuccess(
      data: Extract<
        ResultOf<typeof Mutation>["resovleSemitag"],
        { __typename: "ResolveSemitagSucceededPayload" }
      >
    ): void;
  }
) => {
  const [, resolve] = useMutation(Mutation);
  const { getAccessTokenSilently } = useAuth0();

  return useCallback(
    async ({ resolvedTo }: { resolvedTo: string }) => {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { scope: "check:semitag" },
      });

      const { error, data } = await resolve(
        { tagId: resolvedTo, semitagId },
        {
          fetchOptions: { headers: { authorization: `Bearer ${accessToken}` } },
        }
      );
      if (error || !data) return; // TODO
      switch (data.resovleSemitag.__typename) {
        case "ResolveSemitagSucceededPayload":
          onSuccess(data.resovleSemitag);
          return;
        default:
          return;
      }
    },
    [getAccessTokenSilently, onSuccess, resolve, semitagId]
  );
};

export default useResolve;
