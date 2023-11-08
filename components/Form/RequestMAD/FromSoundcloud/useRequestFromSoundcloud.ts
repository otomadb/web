import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

export const Mutation = graphql(`
  mutation RequestMADFromSoundcloudForm_Request(
    $input: RequestSoundcloudRegistrationInput!
  ) {
    requestSoundcloudRegistration(input: $input) {
      __typename
      ... on RequestSoundcloudRegistrationVideoAlreadyRegisteredError {
        source {
          id
          sourceId
          video {
            id
            ...Link_Video
          }
        }
      }
      ... on RequestSoundcloudRegistrationSucceededPayload {
        ...RequestMADFromSoundcloudForm_SucceededToast
      }
    }
  }
`);
const useRequestFromSoundcloud = ({
  onSuccess,
  onFailure,
  onAlready,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["requestSoundcloudRegistration"],
      { __typename: "RequestSoundcloudRegistrationSucceededPayload" }
    >
  ): void;
  onAlready(
    data: Extract<
      ResultOf<typeof Mutation>["requestSoundcloudRegistration"],
      { __typename: "RequestSoundcloudRegistrationVideoAlreadyRegisteredError" }
    >
  ): void;
  onFailure(): void;
}) => {
  const [, register] = useMutation(Mutation);

  return useCallback(
    async ({
      sourceId,
      title,
      originalThumbnailUrl,
      taggings,
      semitaggings,
    }: {
      sourceId: string;
      title: string;
      /**
       * Soundcloud側のサムネイル画像のURL
       */
      originalThumbnailUrl: string | null;
      taggings: { tagId: string; note: null }[];
      semitaggings: { name: string; note: null }[];
    }) => {
      const { data, error } = await register({
        input: {
          sourceId,
          title,
          thumbnailUrl: originalThumbnailUrl,
          taggings,
          semitaggings,
        },
      });
      if (error || !data) {
        onFailure();
        return;
      }

      switch (data.requestSoundcloudRegistration.__typename) {
        case "RequestSoundcloudRegistrationSucceededPayload":
          onSuccess(data.requestSoundcloudRegistration);
          break;
        case "RequestSoundcloudRegistrationVideoAlreadyRegisteredError":
          onAlready(data.requestSoundcloudRegistration);
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
export default useRequestFromSoundcloud;
