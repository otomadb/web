"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { useMutation } from "urql";

import { RedButton } from "~/components/common/Button";
import { Tag } from "~/components/common/Tag";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_RemoveTagFormFragment,
  VideoPage_TagFragmentDoc,
  VideoPage_UntagVideoDocument,
} from "~/gql/graphql";

graphql(`
  fragment VideoPage_RemoveTagForm on Tag {
    id
    ...VideoPage_Tag
  }

  mutation VideoPage_UntagVideo($input: RemoveTagFromVideoInput!) {
    removeTagFromVideo(input: $input) {
      video {
        id
        ...VideoPage_TagsSection
        ...VideoPage_HistorySection
        ...VideoPage_SimilarVideosSection
      }
    }
  }
`);

export const RemoveTagForm: React.FC<{
  className?: string;
  videoId: string;
  fragment: VideoPage_RemoveTagFormFragment;
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
        ["flex", "items-center", ["gap-x-2"]]
      )}
    >
      <Tag
        tag={tag}
        className={clsx(["shadow"])}
        Wrapper={({ children, ...props }) => <div {...props}>{children}</div>}
      />
      <div className={clsx(["flex", "items-center"])}>
        <RedButton
          onClick={() => mutate({ input: { tagId: fragment.id, videoId } })}
          className={clsx([["px-1"], ["py-0.5"]])}
        >
          <XMarkIcon className={clsx(["w-4", "h-4"])} />
        </RedButton>
      </div>
    </div>
  );
};
