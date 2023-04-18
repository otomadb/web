import { useAuth0 } from "@auth0/auth0-react";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

const Mutation = graphql(`
  mutation RegisterNicovideoPage_RegisterForm_RegisterVideo(
    $input: RegisterVideoFromNicovideoInput!
  ) {
    registerVideoFromNicovideo(input: $input) {
      __typename
      ... on RegisterVideoFromNicovideoSucceededPayload {
        ...RegisterNicovideoPage_RegisterForm_SucceededToast
      }
    }
  }
`);
export const useRegisterVideo = ({
  onSuccess,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["registerVideoFromNicovideo"],
      { __typename: "RegisterVideoFromNicovideoSucceededPayload" }
    >
  ): void;
}) => {
  const [, register] = useMutation(Mutation);
  const { getAccessTokenSilently } = useAuth0();

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
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { scope: "create:video" },
      });
      const { data, error } = await register(
        {
          input: {
            primaryTitle: title,
            extraTitles: [],
            primaryThumbnailUrl: thumbnailUrl,
            tagIds: tags.map(({ tagId }) => tagId),
            semitagNames: semitags.map(({ name }) => name),
            sourceIds: [sourceId],
            requestId: nicovideoRequestId,
          },
        },
        {
          fetchOptions: { headers: { authorization: `Bearer ${accessToken}` } },
        }
      );
      if (error || !data) {
        // TODO 重大な例外処理
        return;
      }

      switch (data.registerVideoFromNicovideo.__typename) {
        case "RegisterVideoFromNicovideoSucceededPayload":
          onSuccess(data.registerVideoFromNicovideo);
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [getAccessTokenSilently, onSuccess, register]
  );
};
