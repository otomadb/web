"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

export const Mutation = graphql(`
  mutation CheckSemitagsPage_RejectSemitag($semitagId: ID!) {
    rejectSemitag(semitagId: $semitagId) {
      __typename
      ... on RejectSemitagSucceededPayload {
        ...CheckSemitagsPage_RejectSucceededToast
      }
    }
  }
`);
const useReject = (
  semitagId: string,
  {
    onSuccess,
  }: {
    onSuccess(
      data: Extract<
        ResultOf<typeof Mutation>["rejectSemitag"],
        { __typename: "RejectSemitagSucceededPayload" }
      >
    ): void;
  }
) => {
  const [, resolve] = useMutation(Mutation);
  const { getAccessTokenSilently } = useAuth0();

  return useCallback(async () => {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: { scope: "check:semitag" },
    });

    const { error, data } = await resolve(
      { semitagId },
      { fetchOptions: { headers: { authorization: `Bearer ${accessToken}` } } }
    );
    if (error || !data) return; // TODO
    switch (data.rejectSemitag.__typename) {
      case "RejectSemitagSucceededPayload":
        onSuccess(data.rejectSemitag);
        return;
      default:
        return;
    }
  }, [getAccessTokenSilently, onSuccess, resolve, semitagId]);
};

export default useReject;
