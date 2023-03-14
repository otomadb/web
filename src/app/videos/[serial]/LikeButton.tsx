"use client";
import "client-only";

import { css, keyframes } from "@emotion/css";
import { HeartIcon as OutlikeHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery } from "urql";

import { graphql, useFragment } from "~/gql";

const VideoFragment = graphql(`
  fragment VideoPage_LikeButton_Video on Video {
    like {
      id
    }
  }
`);
export const LikeButton: React.FC<{ className?: string; videoId: string }> = ({
  className,
  videoId,
}) => {
  const [{ data: currentData, fetching }] = useQuery({
    query: graphql(`
      query VideoPage_LikeButtonCurrentLike($videoId: ID!) {
        whoami {
          id
        }
        getVideo(id: $videoId) {
          id
          ...VideoPage_LikeButton_Video
        }
      }
    `),
    variables: { videoId },
  });
  const video = useFragment(VideoFragment, currentData?.getVideo);
  const liked = useMemo(() => video?.like, [video?.like]);

  const [, triggerAddLike] = useMutation(
    graphql(`
      mutation VideoPage_LikeButton_AddLike($videoId: ID!) {
        likeVideo(input: { videoId: $videoId }) {
          ... on LikeVideoSucceededPayload {
            registration {
              id
              video {
                id
                ...VideoPage_LikeButton_Video
              }
            }
          }
        }
      }
    `)
  );
  const [, triggerRemoveLike] = useMutation(
    graphql(`
      mutation VideoPage_LikeButton_RemoveLike($videoId: ID!) {
        undoLikeVideo(input: { videoId: $videoId }) {
          ... on UndoLikeVideoSucceededPayload {
            registration {
              id
              video {
                id
                ...VideoPage_LikeButton_Video
              }
            }
          }
        }
      }
    `)
  );
  const handleClick = useCallback(() => {
    if (currentData?.whoami === null) {
      // TODO: you need to login
      toast("動画をいいねするにはログインが必要です。");
      return;
    }
    if (liked) triggerRemoveLike({ videoId });
    else triggerAddLike({ videoId });
  }, [currentData?.whoami, liked, triggerAddLike, triggerRemoveLike, videoId]);

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
