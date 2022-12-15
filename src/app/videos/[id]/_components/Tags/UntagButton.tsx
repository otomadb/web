"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";
import { VideoPage_UntagVideoDocument } from "~/gql/graphql";

graphql(`
  mutation VideoPage_UntagVideo($input: UntagVideoInput!) {
    untagVideo(input: $input) {
      video {
        id
        ...VideoPage_VideoTags
        ...VideoPage_VideoHistory
      }
    }
  }
`);

export const UntagButton: React.FC<{
  className?: string;
  tagId: string;
  videoId: string;
}> = ({ className, tagId, videoId }) => {
  const [, mutate] = useMutation(VideoPage_UntagVideoDocument);

  return (
    <button
      onClick={() => mutate({ input: { tagId, videoId } })}
      className={clsx(
        className,
        ["rounded"],
        ["group"],
        ["bg-red-400", "hover:bg-red-600"],
        [["px-0.5"], ["py-0.5"]]
      )}
    >
      <XMarkIcon
        className={clsx(
          ["w-4"],
          ["h-4"],
          ["text-red-50", "group-hover:text-red-100"]
        )}
      />
    </button>
  );
};
