"use client";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useMutation } from "urql";

import { useGetAccessToken } from "~/auth0/useGetAccessToken";
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
  const getAccessToken = useGetAccessToken();

  return async ({ resolvedTo }: { resolvedTo: string }) => {
    const accessToken = await getAccessToken({
      authorizationParams: { scope: "check:semitag" },
    });

    const { error, data } = await resolve(
      { tagId: resolvedTo, semitagId },
      { fetchOptions: { headers: { authorization: `Bearer ${accessToken}` } } }
    );
    if (error || !data) return; // TODO
    switch (data.resovleSemitag.__typename) {
      case "ResolveSemitagSucceededPayload":
        onSuccess(data.resovleSemitag);
        return;
      default:
        return;
    }
  };
};

export default useResolve;
