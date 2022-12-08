"use client";
import "client-only";

import { css, keyframes } from "@emotion/css";
import { HeartIcon as OutlikeHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import useSWR from "swr";

import { graphql } from "~/gql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";
import { useIsLoggedIn } from "~/hooks/useIsLoggedIn";

const LikeButtonQueryDocument = graphql(`
  query LikeButtonCurrentLike($videoId: ID!) {
    whoami {
      id
      favorites {
        id
        includes(videoId: $videoId)
      }
    }
  }
`);

const LikeButtonAddLikeMutationDocument = graphql(`
  mutation LikeButtonAddLike($videoId: ID!) {
    likeVideo(input: { videoId: $videoId }) {
      registration {
        id
      }
    }
  }
`);

const LikeButtonRemoveLikeMutationDocument = graphql(`
  mutation LikeButtonRemoveLike($videoId: ID!) {
    undoLikeVideo(input: { videoId: $videoId }) {
      video {
        id
      }
    }
  }
`);

export const LikeButton: React.FC<{ className?: string; videoId: string }> = ({
  className,
  videoId,
}) => {
  const isLoggedIn = useIsLoggedIn();
  const gqlClient = useGraphQLClient();
  const [liked, setLiked] = useState<boolean | undefined>();

  const { mutate } = useSWR(
    isLoggedIn ? [LikeButtonQueryDocument] : null,
    (doc) => gqlClient.request(doc, { videoId }),
    {
      onSuccess(data) {
        setLiked(data.whoami.favorites.includes);
      },
    }
  );

  const handleClicked = useCallback(async () => {
    if (liked === undefined) {
      return;
    }

    await gqlClient.request(
      liked
        ? LikeButtonRemoveLikeMutationDocument
        : LikeButtonAddLikeMutationDocument,
      { videoId }
    );
    setLiked((prev) => !prev);
    mutate();
  }, [gqlClient, liked, mutate, videoId]);

  return (
    <button
      disabled={liked === undefined}
      className={clsx(
        className,
        "group",
        [["px-2"], ["py-1"]],
        ["transition-colors", "duration-100"],
        ["disabled:animate-pulse"],
        [
          "border",
          "disabled:border-slate-300",
          liked && ["border-pink-400"],
          !liked && ["border-slate-400"],
        ],
        [
          "disabled:bg-slate-200",
          liked && [["bg-opacity-25", "hover:bg-opacity-40"], "bg-pink-300"],
          !liked && [["bg-opacity-25", "hover:bg-opacity-50"], "bg-slate-300"],
        ],
        ["rounded-md"],
        ["flex", ["items-center"]]
      )}
      onClick={() => handleClicked()}
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
              [
                "group-disabled:text-slate-300",
                ["text-slate-500", "group-hover:text-slate-600"],
              ]
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
            "group-disabled:text-slate-300",
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
