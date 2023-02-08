"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";
import { useMutation } from "urql";

import { RedButton } from "~/components/common/Button";
import { Tag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  VideoPage_RemoveTagFormFragment,
  VideoPage_UntagVideoDocument,
} from "~/gql/graphql";

graphql(`
  fragment VideoPage_RemoveTagForm on Tag {
    id
    ...Component_Tag
  }

  mutation VideoPage_UntagVideo($input: RemoveTagFromVideoInput!) {
    removeTagFromVideo(input: $input) {
      video {
        id
        ...VideoPage_TagsSection
        ...VideoPage_EventsSection
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
        ["flex", "flex-col", "items-stretch"]
      )}
    >
      <p className={clsx(["text-xs"], ["text-slate-900"])}>
        <Tag
          className={clsx(["inline-block"])}
          tag={getFragment(Component_TagFragmentDoc, fragment)}
          Wrapper={(props) => <div {...props} />}
        />
        のタグ付けを編集
      </p>
      <div className={clsx(["mt-2"], ["flex", "justify-end", "items-stretch"])}>
        <RedButton
          onClick={() => mutate({ input: { tagId: fragment.id, videoId } })}
          className={clsx([["px-1"], ["py-0.5"]])}
        >
          <div className={clsx(["flex"], ["items-center"])}>
            <XMarkIcon className={clsx(["w-4", "h-4"])} />
            <div className={clsx(["ml-1"], ["text-sm"])}>削除する</div>
          </div>
        </RedButton>
      </div>
    </div>
  );
};
