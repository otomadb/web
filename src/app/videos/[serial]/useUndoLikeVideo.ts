"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

export const Mutation = graphql(`
  mutation VideoPage_LikeButton_RemoveLike($videoId: ID!) {
    undoLikeVideo(input: { videoId: $videoId }) {
      __typename
      ... on UndoLikeVideoNotLikedError {
        video {
          id
          isLiked
        }
      }
      ... on UndoLikeVideoSucceededPayload {
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
export const useUndoLikeVideo = ({
  videoId,
  onSuccess,
  onFailure,
}: {
  videoId: string;
  /**
   * いいねの取り消し成功時に
   */
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["undoLikeVideo"],
      { __typename: "UndoLikeVideoSucceededPayload" }
    >
  ): void;
  /**
   * 失敗時に
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

    switch (data.undoLikeVideo.__typename) {
      case "UndoLikeVideoSucceededPayload": {
        onSuccess(data.undoLikeVideo);
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
