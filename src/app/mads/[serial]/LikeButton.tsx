"use client";
import "client-only";

import { useAuth0 } from "@auth0/auth0-react";
import { ResultOf } from "@graphql-typed-document-node/core";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { useMutation, useQuery } from "urql";

import { useToaster } from "~/components/Toaster";
import { FragmentType, graphql, useFragment } from "~/gql";

export const LikeMutation = graphql(`
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
      ResultOf<typeof LikeMutation>["likeVideo"],
      { __typename: "LikeVideoSucceededPayload" }
    >
  ): void;
  /**
   * 失敗時に呼ばれる
   */
  onFailure(): void;
}) => {
  const [, mutateRegisterTag] = useMutation(LikeMutation);
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

export const UndoLikeMutation = graphql(`
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
      ResultOf<typeof UndoLikeMutation>["undoLikeVideo"],
      { __typename: "UndoLikeVideoSucceededPayload" }
    >
  ): void;
  /**
   * 失敗時に
   */
  onFailure(): void;
}) => {
  const [, mutateRegisterTag] = useMutation(UndoLikeMutation);
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

export const Fragment = graphql(`
  fragment VideoPage_LikeButton on Video {
    id
  }
`);

export const Query = graphql(`
  query VideoPage_LikeButtonCurrentLike($videoId: ID!) {
    getVideo(id: $videoId) {
      id
      isLiked
    }
  }
`);
export default function LikeButton({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}) {
  const { isAuthenticated } = useAuth0();

  const fragment = useFragment(Fragment, props.fragment);
  const [{ data: currentData }] = useQuery({
    query: Query,
    variables: { videoId: fragment.id },
    pause: !isAuthenticated,
    requestPolicy: "cache-first",
  });

  const callToast = useToaster();
  const likeVideo = useLikeVideo({
    videoId: fragment.id,

    onSuccess() {}, // eslint-disable-line no-empty-function
    onFailure() {
      callToast(<p>いいねに失敗しました。</p>);
    },
  });
  const undoLikeVideo = useUndoLikeVideo({
    videoId: fragment.id,

    onSuccess() {}, // eslint-disable-line no-empty-function
    onFailure() {
      callToast(<p>いいねの取り消しに失敗しました。</p>);
    },
  });

  const liked = useMemo(
    () =>
      typeof currentData?.getVideo.isLiked !== "boolean"
        ? undefined
        : currentData?.getVideo.isLiked,
    [currentData?.getVideo.isLiked]
  );

  const handleClick = useCallback(() => {
    if (liked === undefined) {
      callToast(<p>動画をいいねするにはログインが必要です。</p>);
      return;
    }
    if (liked) undoLikeVideo();
    else likeVideo();
  }, [callToast, likeVideo, liked, undoLikeVideo]);

  return (
    <button
      style={style}
      role="checkbox"
      onClick={() => handleClick()}
      aria-checked={liked === undefined ? "mixed" : liked ? "true" : "false"}
      disabled={liked === undefined}
      className={clsx(
        className,
        "group",
        [["px-2"], ["py-1"]],
        ["transition-colors", "duration-100"],
        [
          "border",
          "border-slate-400",
          "disabled:border-slate-300",
          "aria-checked:border-pink-400",
        ],
        [
          "disabled:bg-slate-200",
          ["bg-slate-200", "hover:bg-slate-300"],
          ["aria-checked:bg-pink-100", "aria-checked:hover:bg-pink-200"],
        ],
        ["rounded-md"],
        ["flex", "items-center"]
      )}
    >
      <div>
        <SolidHeartIcon
          className={clsx(
            ["w-4", "h-4"],
            ["transition-colors", "duration-75"],
            [
              "group-disabled:text-slate-300",
              ["text-slate-400", "group-hover:text-slate-500"],
              [
                "group-aria-checked:text-pink-600",
                "group-aria-checked:group-hover:text-pink-500",
              ],
            ]
          )}
        />
      </div>
      <div
        className={clsx(
          ["ml-1"],
          ["text-sm"],
          ["transition-colors", "duration-75"],
          [
            ["group-disabled:text-slate-300"],
            ["text-slate-400", "group-hover:text-slate-500"],
            [
              "group-aria-checked:text-pink-600",
              "group-aria-checked:group-hover:text-pink-500",
            ],
          ]
        )}
      >
        Like
      </div>
    </button>
  );
}
