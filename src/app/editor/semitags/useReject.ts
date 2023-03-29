"use client";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useMutation } from "urql";

import { graphql } from "~/gql";

export const Mutation = graphql(`
  mutation CheckSemitagsPage_RejectSemitag($semitagId: ID!) {
    rejectSemitag(semitagId: $semitagId) {
      __typename
      ... on RejectSemitagSucceededPayload {
        rejecting {
          semitag {
            name
          }
        }
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
  return async () => {
    const { error, data } = await resolve({ semitagId });
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
