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

export const LikeVideoMutation = graphql(`
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
  const { isAuthenticated } = useAuth0();
  const fragment = useFragment(VideoFragment, props.fragment);
  const [{ data: currentData, fetching }] = useQuery({
    query: graphql(`
      query VideoPage_LikeButtonCurrentLike($videoId: ID!) {
        getVideo(id: $videoId) {
          id
          isLiked
        }
      }
    `),
    variables: { videoId: fragment.id },
    pause: !isAuthenticated,
  });

  const callToast = useToaster();
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
      role="checkbox"
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
          "bg-slate-300",
          "disabled:bg-slate-200",
          ["aria-checked:bg-pink-200", "aria-checked:hover:bg-pink-300"],
        ],
        ["rounded-md"],
        ["flex", "items-center"]
      )}
      onClick={() => handleClick()}
    >
      <div>
        <SolidHeartIcon
          className={clsx(
            ["w-4", "h-4"],
            ["transition-colors", "duration-75"],
            ["group-disabled:text-slate-300"],
            ["text-slate-400", "group-hover:text-slate-500"],
            [
              "group-aria-checked:text-pink-600",
              "group-aria-checked:group-hover:text-pink-500",
            ]
            /*
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
              */
          )}
        />
      </div>
      <div
        className={clsx(
          ["ml-1"],
          ["text-sm"],
          ["transition-colors", "duration-75"],
          ["group-disabled:text-slate-300"],
          ["text-slate-400", "group-hover:text-slate-500"],
          [
            "group-aria-checked:text-pink-600",
            "group-aria-checked:group-hover:text-pink-500",
          ]
        )}
      >
        Like
      </div>
    </button>
  );
};
