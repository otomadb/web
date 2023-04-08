import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

const Mutation = graphql(`
  mutation NicovideoRequestPage_Request(
    $input: RequestNicovideoRegistrationInput!
  ) {
    requestNicovideoRegistration(input: $input) {
      __typename
      ... on RequestNicovideoRegistrationVideoAlreadyRegisteredError {
        source {
          id
          sourceId
          video {
            ...Link_Video
          }
        }
      }
      ... on RequestNicovideoRegistrationSucceededPayload {
        ...NicovideoRequestPage_SucceededToast
      }
    }
  }
`);
export const useRequestVideo = ({
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
      tags,
      semitags,
    }: {
      sourceId: string;
      title: string;
      thumbnailUrl: string;
      tags: { tagId: string }[];
      semitags: { name: string }[];
    }) => {
      const { data, error } = await register({
        input: {
          sourceId,
          title,
          thumbnailUrl,
          taggings: tags.map(({ tagId }) => ({ tagId, note: null })),
          semitaggings: semitags.map(({ name }) => ({ name, note: null })),
        },
      });
      if (error || !data) {
        onFailure();
        return;
      }

      switch (data.requestNicovideoRegistration.__typename) {
        case "RequestNicovideoRegistrationVideoAlreadyRegisteredError":
          onAlready(data.requestNicovideoRegistration);
          break;
        case "RequestNicovideoRegistrationSucceededPayload":
          onSuccess(data.requestNicovideoRegistration);
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
