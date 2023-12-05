import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

const Mutation = graphql(`
  mutation RegisterFromYoutubeForm_RegisterVideo(
    $input: RegisterVideoFromYoutubeInput!
  ) {
    registerVideoFromYoutube(input: $input) {
      __typename
      ... on RegisterVideoFromYoutubeSucceededPayload {
        ...RegisterFromYoutubeForm_SucceededToast
      }
    }
  }
`);
export const useRegisterVideo = ({
  onSuccess,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["registerVideoFromYoutube"],
      { __typename: "RegisterVideoFromYoutubeSucceededPayload" }
    >
  ): void;
}) => {
  const [, register] = useMutation(Mutation);

  return useCallback(
    async ({
      sourceId,
      title,
      thumbnailUrl,
      tagIds,
      semitagNames,
      YoutubeRequestId,
    }: {
      sourceId: string;
      title: string;
      thumbnailUrl: string;
      tagIds: string[];
      semitagNames: string[];
      YoutubeRequestId: string | undefined;
    }) => {
      const { data, error } = await register({
        input: {
          primaryTitle: title,
          extraTitles: [],
          primaryThumbnailUrl: thumbnailUrl,
          tagIds,
          semitagNames,
          sourceIds: [sourceId],
          requestId: YoutubeRequestId,
        },
      });
      if (error || !data) {
        // TODO 重大な例外処理
        return;
      }

      switch (data.registerVideoFromYoutube.__typename) {
        case "RegisterVideoFromYoutubeSucceededPayload":
          onSuccess(data.registerVideoFromYoutube);
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [onSuccess, register]
  );
};
