import { useAuth0 } from "@auth0/auth0-react";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

const Mutation = graphql(`
  mutation RegisterBilibiliMADForm_RegisterMAD(
    $input: RegisterBilibiliMADInput!
  ) {
    registerBilibiliMAD(input: $input) {
      __typename
      ... on RegisterBilibiliMADSucceededPayload {
        ...RegisetrBilibiliMADForm_SucceededToast
      }
    }
  }
`);
export const useRegisterVideo = ({
  onSuccess,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["registerBilibiliMAD"],
      { __typename: "RegisterVideoFromYoutubeSucceededPayload" }
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

      switch (data.registerBilibiliMAD.__typename) {
        case "RegisterBilibiliMADSucceededPayload":
          onSuccess(data.registerBilibiliMAD);
          return;
        default:
          // TODO: 何かしら出す
          return;
      }
    },
    [getAccessTokenSilently, onSuccess, register]
  );
};
