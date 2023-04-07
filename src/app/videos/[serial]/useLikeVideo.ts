"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

export const Mutation = graphql(`
  mutation VideoPage_LikeButton_AddLike($videoId: ID!) {
    likeVideo(input: { videoId: $videoId }) {
      __typename
      ... on LikeVideoAlreadyLikedError {
        registration {
          id
          video {
            id
            isLiked
          }
        }
      }
      ... on LikeVideoSucceededPayload {
        registration {
          id
          video {
            id
            isLiked
          }
        }
      }
    }
  }
`);
export const useLikeVideo = ({
  videoId,
  onSuccess,
  onFailure,
}: {
  videoId: string;
  /**
   * いいね成功時に
   */
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["likeVideo"],
      { __typename: "LikeVideoSucceededPayload" }
    >
  ): void;
  /**
   * 失敗時に呼ばれる
   */
  onFailure(): void;
}) => {
  const [, mutateRegisterTag] = useMutation(Mutation);
  const { getAccessTokenSilently } = useAuth0();

  return useCallback(async () => {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: { scope: "update:mylist_registration" },
    });

    const { data, error } = await mutateRegisterTag(
      { videoId },
      {
        fetchOptions: { headers: { authorization: `Bearer ${accessToken}` } },
      }
    );
    if (error || !data) {
      onFailure();
      return;
    }

    switch (data.likeVideo.__typename) {
      case "LikeVideoSucceededPayload": {
        onSuccess(data.likeVideo);
        return;
      }
      default: {
        onFailure();
        return;
      }
    }
  }, [
    getAccessTokenSilently,
    mutateRegisterTag,
    onFailure,
    onSuccess,
    videoId,
  ]);
};
