"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { useMutation } from "urql";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_TagFragmentDoc,
  VideoPage_UntagFormFragment,
  VideoPage_UntagVideoDocument,
} from "~/gql/graphql";

import { Tag } from "../Tag";

graphql(`
  fragment VideoPage_UntagForm on Tag {
    id
    ...VideoPage_Tag
  }

  mutation VideoPage_UntagVideo($input: RemoveTagFromVideoInput!) {
    removeTagFromVideo(input: $input) {
      video {
        id
        ...VideoPage_TagsSection
        ...VideoPage_History
        ...VideoPage_SimilarVideos
      }
    }
  }
`);

export const UntagForm: React.FC<{
  className?: string;
  videoId: string;
  fragment: VideoPage_UntagFormFragment;
}> = ({ className, videoId, fragment }) => {
  const [, mutate] = useMutation(VideoPage_UntagVideoDocument);

  const tag = useFragment(VideoPage_TagFragmentDoc, fragment);

  return (
    <div
      className={clsx(
        className,
        ["px-4"],
        ["py-2"],
        ["border", "border-slate-300"],
        ["bg-white"],
        ["shadow-lg"],
        ["rounded"],
        ["flex", "flex-col", "items-start", "gap-y-2"]
      )}
    >
      <Tag
        tag={tag}
        className={clsx(["shadow"])}
        Wrapper={({ children, ...props }) => <div {...props}>{children}</div>}
      />
      <div className={clsx(["flex", "items-center"])}>
        <button
          type="button"
          onClick={() => mutate({ input: { tagId: fragment.id, videoId } })}
          className={clsx(
            ["rounded"],
            ["group/button"],
            ["bg-red-400", "hover:bg-red-600"],
            [["px-1"], ["py-0.5"]]
          )}
        >
          <XMarkIcon
            className={clsx(
              ["w-4"],
              ["h-4"],
              ["text-red-50", "group-hover/button:text-red-100"]
            )}
          />
        </button>
      </div>
    </div>
  );
};
