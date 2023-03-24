import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";
import { RegisterVideoInputSourceType } from "~/gql/graphql";

const Mutation = graphql(`
  mutation RegisterNicovideoPage_RegisterForm_RegisterVideo(
    $input: RegisterVideoInput!
  ) {
    registerVideo(input: $input) {
      __typename
      ... on RegisterVideoSucceededPayload {
        video {
          ...RegisterNicovideoPage_RegisterForm_SuccessToast
        }
      }
    }
  }
`);
export const useRegisterVideo = ({
  onSuccess,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["registerVideo"],
      { __typename: "RegisterVideoSucceededPayload" }
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
      nicovideoRequestId,
    }: {
      sourceId: string;
      title: string;
      thumbnailUrl: string;
      tags: { tagId: string }[];
      semitags: { name: string }[];
      nicovideoRequestId: string | null;
    }) => {
      const { data, error } = await register({
        input: {
          primaryTitle: title,
          extraTitles: [],
          primaryThumbnail: thumbnailUrl,
          tags: tags.map(({ tagId }) => tagId),
          semitags: semitags.map(({ name }) => name),
          sources: [{ sourceId, type: RegisterVideoInputSourceType.Nicovideo }],
          nicovideoRequestId,
        },
      });
      if (error || !data) {
        // TODO 重大な例外処理
        return;
      }

      switch (data.registerVideo.__typename) {
        case "RegisterVideoSucceededPayload":
          onSuccess(data.registerVideo);
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [onSuccess, register]
  );
};
