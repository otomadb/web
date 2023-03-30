"use client";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useMutation } from "urql";

import { graphql } from "~/gql";
import { GenerateAccessTokenInputDuration } from "~/gql/graphql";

export const Mutation = graphql(`
  mutation TokensPage_GenerateAccessToken(
    $duration: GenerateAccessTokenInputDuration!
  ) {
    generateAccessToken(duration: $duration) {
      __typename
      ... on GenerateAccessTokenSucceededPayload {
        accessToken
      }
    }
  }
`);
const useGenerateAccessToken = ({
  onSuccess,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["generateAccessToken"],
      { __typename: "GenerateAccessTokenSucceededPayload" }
    >
  ): void;
}) => {
  const [, resolve] = useMutation(Mutation);
  return async ({
    duration,
  }: {
    duration: GenerateAccessTokenInputDuration;
  }) => {
    const { error, data } = await resolve({ duration });
    if (error || !data) return; // TODO
    switch (data.generateAccessToken.__typename) {
      case "GenerateAccessTokenSucceededPayload":
        onSuccess(data.generateAccessToken);
        return;
      default:
        return;
    }
  };
};

export default useGenerateAccessToken;
