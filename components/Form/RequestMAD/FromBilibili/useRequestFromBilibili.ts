import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

export const Mutation = graphql(`
  mutation BilibiliRequestForm_Request(
    $input: RequestBilibiliRegistrationInput!
  ) {
    requestBilibiliRegistration(input: $input) {
      __typename
      ... on RequestBilibiliRegistrationVideoAlreadyRegisteredError {
        source {
          id
          sourceId
          video {
            id
            ...Link_Video
          }
        }
      }
      ... on RequestBilibiliRegistrationSucceededPayload {
        request {
          title
          ...BilibiliRequestPageLink
        }
      }
    }
  }
`);
const useRequestFromYoutube = ({
  onSuccess,
  onFailure,
  onAlready,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["requestBilibiliRegistration"],
      { __typename: "RequestBilibiliRegistrationSucceededPayload" }
    >
  ): void;
  onAlready(
    data: Extract<
      ResultOf<typeof Mutation>["requestBilibiliRegistration"],
      { __typename: "RequestBilibiliRegistrationVideoAlreadyRegisteredError" }
    >
  ): void;
  onFailure(): void;
}) => {
  const [, register] = useMutation(Mutation);

  return useCallback(
    async ({
      sourceId,
      title,
      thumbnailUrl,
      taggings,
      semitaggings,
    }: {
      sourceId: string;
      title: string;
      thumbnailUrl: string;
      taggings: { tagId: string; note: null }[];
      semitaggings: { name: string; note: null }[];
    }) => {
      const { data, error } = await register({
        input: { sourceId, title, thumbnailUrl, taggings, semitaggings },
      });
      if (error || !data) {
        onFailure();
        return;
      }

      switch (data.requestBilibiliRegistration.__typename) {
        case "RequestBilibiliRegistrationSucceededPayload":
          onSuccess(data.requestBilibiliRegistration);
          break;
        case "RequestBilibiliRegistrationVideoAlreadyRegisteredError":
          onAlready(data.requestBilibiliRegistration);
          break;
        case "MutationInvalidTagIdError":
        case "MutationTagNotFoundError":
        default:
          onFailure();
          break;
      }
    },
    [onAlready, onFailure, onSuccess, register]
  );
};
export default useRequestFromYoutube;
