import { useAuth0 } from "@auth0/auth0-react";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

const Mutation = graphql(`
  mutation RegisterSoundcloudMADForm_RegisterMAD(
    $input: RegisterSoundcloudMADInput!
  ) {
    registerSoundcloudMAD(input: $input) {
      __typename
      ... on RegisterSoundcloudMADSucceededPayload {
        ...RegisetrSoundcloudMADForm_SucceededToast
      }
    }
  }
`);
export const useRegisterVideo = ({
  onSuccess,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["registerSoundcloudMAD"],
      { __typename: "RegisterSoundcloudMADSucceededPayload" }
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
      tagIds,
      semitagNames,
    }: {
      sourceId: string;
      title: string;
      thumbnailUrl: string;
      tagIds: string[];
      semitagNames: string[];
    }) => {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: { scope: "create:video" },
      });
      const { data, error } = await register(
        {
          input: {
            primaryTitle: title,
            primaryThumbnailUrl: thumbnailUrl,
            tagIds,
            semitagNames,
            sourceIds: [sourceId],
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

      switch (data.registerSoundcloudMAD.__typename) {
        case "RegisterSoundcloudMADSucceededPayload":
          onSuccess(data.registerSoundcloudMAD);
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [getAccessTokenSilently, onSuccess, register]
  );
};
