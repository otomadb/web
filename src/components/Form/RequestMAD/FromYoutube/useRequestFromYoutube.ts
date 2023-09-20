import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

export const Mutation = graphql(`
  mutation RequestMADFromYoutubeForm_Request(
    $input: RequestYoutubeRegistrationInput!
  ) {
    requestYoutubeRegistration(input: $input) {
      __typename
      ... on RequestYoutubeRegistrationVideoAlreadyRegisteredError {
        source {
          id
          sourceId
          video {
            id
            ...Link_Video
          }
        }
      }
      ... on RequestYoutubeRegistrationSucceededPayload {
        ...RequestMADFromYoutubeForm_SucceededToast
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
      ResultOf<typeof Mutation>["requestYoutubeRegistration"],
      { __typename: "RequestYoutubeRegistrationSucceededPayload" }
    >
  ): void;
  onAlready(
    data: Extract<
      ResultOf<typeof Mutation>["requestYoutubeRegistration"],
      { __typename: "RequestYoutubeRegistrationVideoAlreadyRegisteredError" }
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

      switch (data.requestYoutubeRegistration.__typename) {
        case "RequestYoutubeRegistrationSucceededPayload":
          onSuccess(data.requestYoutubeRegistration);
          break;
        case "RequestYoutubeRegistrationVideoAlreadyRegisteredError":
          onAlready(data.requestYoutubeRegistration);
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
