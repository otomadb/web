import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

export const Mutation = graphql(`
  mutation RequestMADFromNicovideoForm_Request(
    $input: RequestNicovideoRegistrationInput!
  ) {
    requestNicovideoRegistration(input: $input) {
      __typename
      ... on RequestNicovideoRegistrationVideoAlreadyRegisteredError {
        source {
          id
          sourceId
          video {
            id
            ...Link_Video
          }
        }
      }
      ... on RequestNicovideoRegistrationSucceededPayload {
        ...RequestMADFromNicovideoForm_SucceededToast
      }
    }
  }
`);
const useRequestFromNicovideo = ({
  onSuccess,
  onFailure,
  onAlready,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["requestNicovideoRegistration"],
      { __typename: "RequestNicovideoRegistrationSucceededPayload" }
    >
  ): void;
  onAlready(
    data: Extract<
      ResultOf<typeof Mutation>["requestNicovideoRegistration"],
      { __typename: "RequestNicovideoRegistrationVideoAlreadyRegisteredError" }
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

      switch (data.requestNicovideoRegistration.__typename) {
        case "RequestNicovideoRegistrationSucceededPayload":
          onSuccess(data.requestNicovideoRegistration);
          break;
        case "RequestNicovideoRegistrationVideoAlreadyRegisteredError":
          onAlready(data.requestNicovideoRegistration);
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
export default useRequestFromNicovideo;
