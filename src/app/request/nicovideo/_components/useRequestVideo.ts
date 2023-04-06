import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

const Mutation = graphql(`
  mutation RequestNicovideoRegistrationPage_Request(
    $input: RequestNicovideoRegistrationInput!
  ) {
    requestNicovideoRegistration(input: $input) {
      __typename
      ... on MutationTagNotFoundError {
        tagId
      }
      ... on RequestNicovideoRegistrationVideoAlreadyRegisteredError {
        source {
          id
        }
      }
      ... on RequestNicovideoRegistrationSucceededPayload {
        ...RequestNicovideoRegistrationPage_SuccessToast
      }
    }
  }
`);
export const useRequestVideo = ({
  onSuccess,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["requestNicovideoRegistration"],
      { __typename: "RequestNicovideoRegistrationSucceededPayload" }
    >
  ): void;
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
        // TODO 重大な例外処理
        return;
      }

      switch (data.requestNicovideoRegistration.__typename) {
        case "RequestNicovideoRegistrationSucceededPayload":
          onSuccess(data.requestNicovideoRegistration);
          break;
        default:
          break;
      }
    },
    [onSuccess, register]
  );
};
