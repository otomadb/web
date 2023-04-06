"use client";
import "client-only";

import { useAuth0 } from "@auth0/auth0-react";
import { css, keyframes } from "@emotion/css";
import { ResultOf } from "@graphql-typed-document-node/core";
import { HeartIcon as OutlikeHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { useMutation, useQuery } from "urql";

import { useToaster } from "~/components/Toaster";
import { FragmentType, graphql, useFragment } from "~/gql";

export const LikeVideoMutation = graphql(`
  mutation VideoPage_LikeButton_AddLike($videoId: ID!) {
    likeVideo(input: { videoId: $videoId }) {
      __typename
      ... on LikeVideoSucceededPayload {
        registration {
          id
          video {
            id
            like {
              id
            }
          }
        }
      }
    }
  }
`);
export const useLikeVideo = ({
  videoId,
  onSuccess,
}: {
  videoId: string;
  onSuccess(
    data: Extract<
      ResultOf<typeof LikeVideoMutation>["likeVideo"],
      { __typename: "LikeVideoSucceededPayload" }
    >
  ): void;
}) => {
  const [, mutateRegisterTag] = useMutation(LikeVideoMutation);
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
      // TODO 重大な例外処理
      return;
    }

    switch (data.likeVideo.__typename) {
      case "LikeVideoSucceededPayload": {
        onSuccess(data.likeVideo);
        return;
      }
      default: {
        return;
      }
    }
  }, [getAccessTokenSilently, mutateRegisterTag, onSuccess, videoId]);
};

export const UndoLikeVideoMutation = graphql(`
  mutation VideoPage_LikeButton_RemoveLike($videoId: ID!) {
    undoLikeVideo(input: { videoId: $videoId }) {
      __typename
      ... on UndoLikeVideoSucceededPayload {
        registration {
          id
          video {
            id
            like {
              id
            }
          }
        }
      }
    }
  }
`);
export const useUndoLikeVideo = ({
  videoId,
  onSuccess,
}: {
  videoId: string;
  onSuccess(
    data: Extract<
      ResultOf<typeof UndoLikeVideoMutation>["undoLikeVideo"],
      { __typename: "UndoLikeVideoSucceededPayload" }
    >
  ): void;
}) => {
  const [, mutateRegisterTag] = useMutation(UndoLikeVideoMutation);
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
      // TODO 重大な例外処理
      return;
    }

    switch (data.undoLikeVideo.__typename) {
      case "UndoLikeVideoSucceededPayload": {
        onSuccess(data.undoLikeVideo);
        return;
      }
      default: {
        return;
      }
    }
  }, [getAccessTokenSilently, mutateRegisterTag, onSuccess, videoId]);
};

const VideoFragment = graphql(`
  fragment VideoPage_LikeButton on Video {
    id
  }
`);
export const LikeButton: React.FC<{
  className?: string;
  fragment: FragmentType<typeof VideoFragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(VideoFragment, props.fragment);
  const [{ data: currentData, fetching }] = useQuery({
    query: graphql(`
      query VideoPage_LikeButtonCurrentLike($videoId: ID!) {
        whoami {
          id
        }
        getVideo(id: $videoId) {
          id
          like {
            id
          }
        }
      }
    `),
    variables: { videoId: fragment.id },
  });

  const likeVideo = useLikeVideo({
    videoId: fragment.id,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess() {},
  });
  const undoLikeVideo = useUndoLikeVideo({
    videoId: fragment.id,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSuccess() {},
  });

  const liked = useMemo(
    () =>
      currentData?.getVideo.like === undefined
        ? undefined
        : currentData.getVideo.like !== null,
    [currentData?.getVideo.like]
  );

  const callToast = useToaster();
  const handleClick = useCallback(() => {
    if (currentData?.whoami === null) {
      callToast(<p>動画をいいねするにはログインが必要です。</p>);
      return;
    }
    if (liked) undoLikeVideo();
    else likeVideo();
  }, [currentData?.whoami, liked, undoLikeVideo, likeVideo, callToast]);

  return (
    <button
      disabled={fetching}
      className={clsx(
        className,
        "group",
        [["px-2"], ["py-1"]],
        ["transition-colors", "duration-100"],
        [
          "border",

          liked && ["border-pink-400"],
          !liked && ["border-slate-400"],
        ],
        [
          liked && [["bg-opacity-25", "hover:bg-opacity-40"], "bg-pink-300"],
          !liked && [["bg-opacity-25", "hover:bg-opacity-50"], "bg-slate-300"],
        ],
        ["rounded-md"],
        ["flex", ["items-center"]]
      )}
      onClick={() => handleClick()}
    >
      <div>
        {liked && (
          <SolidHeartIcon
            className={clsx(
              ["w-4"],
              ["h-4"],
              ["transition-colors", "duration-75"],
              ["text-pink-600", "group-hover:text-pink-500"],
              css`
                animation-name: ${keyframes`
                  from {
                    opacity: 0;
                    transform: scale(0.25) rotate(0.1turn);
                  }

                  to {
                    opacity: 1;
                    transform: scale(1) rotateZ(0);
                  }
                `};
                animation-duration: 0.25s;
                animation-timing-function: cubic-bezier(
                  0.27,
                  1.65,
                  0.88,
                  1.395
                );
              `
            )}
          />
        )}
        {!liked && (
          <OutlikeHeartIcon
            className={clsx(
              ["w-4"],
              ["h-4"],
              ["transition-colors", "duration-75"],
              [["text-slate-500", "group-hover:text-slate-600"]]
            )}
          />
        )}
      </div>
      <div
        className={clsx(
          ["ml-1"],
          ["text-sm"],
          ["transition-colors", "duration-75"],
          [
            liked && ["text-pink-600", "group-hover:text-pink-500"],
            !liked && ["text-slate-500", "group-hover:text-slate-600"],
          ]
        )}
      >
        Like
      </div>
    </button>
  );
};
