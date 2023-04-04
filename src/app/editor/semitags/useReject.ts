"use client";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useMutation } from "urql";

import { useGetAccessToken } from "~/auth0/useGetAccessToken";
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
  const getAccessToken = useGetAccessToken();

  return async () => {
    const accessToken = await getAccessToken({
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
  };
};

export default useReject;
