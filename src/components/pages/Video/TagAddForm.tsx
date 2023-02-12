"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";
import { useMutation, useQuery } from "urql";

import { BlueButton } from "~/components/common/Button";
import { Tag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  VideoPage_AddTagDocument,
  VideoPage_AddTagFormDocument,
} from "~/gql/graphql";

graphql(`
  query VideoPage_AddTagForm($videoId: ID!, $tagId: ID!) {
    tag(id: $tagId) {
      id
      ...Component_Tag
      canTagTo(videoId: $videoId)
    }
    video(id: $videoId) {
      id
      hasTag(id: $tagId)
    }
  }

  mutation VideoPage_AddTag($input: AddTagToVideoInput!) {
    addTagToVideo(input: $input) {
      ... on AddTagToVideoSucceededPayload {
        video {
          id
          ...VideoPage_TagsSection
          ...VideoPage_SimilarVideosSection
        }
      }
    }
  }
`);

export const AddTagForm: React.FC<{
  className?: string;
  videoId: string;
  tagId: string;
  clear(): void;
}> = ({ className, videoId, tagId, clear }) => {
  const [{ data, fetching }] = useQuery({
    query: VideoPage_AddTagFormDocument,
    variables: { tagId, videoId },
    requestPolicy: "cache-and-network",
  });

  const [, trigger] = useMutation(VideoPage_AddTagDocument);

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
      <p className={clsx(["text-xs"], ["text-slate-900"])}>タグを追加する</p>
      {data && (
        <>
          <div className={clsx(["mt-2"], ["flex", "items-center"])}>
            <Tag
              tag={getFragment(Component_TagFragmentDoc, data.tag)}
              className={clsx(["shadow"])}
              Wrapper={({ children, ...props }) => (
                <div {...props}>{children}</div>
              )}
            />
          </div>
          {data.tag.canTagTo === false && (
            <div className={clsx(["mt-2"])}>
              <p className={clsx(["text-xs"], ["text-red-600"])}>
                このタグを付けることは出来ません
              </p>
            </div>
          )}
          <div
            className={clsx(["mt-2"], ["flex", "justify-end", "items-stretch"])}
          >
            <BlueButton
              className={clsx([["px-2"], ["py-1"]])}
              disabled={!data?.tag.canTagTo}
              onClick={async () => {
                await trigger({ input: { tagId, videoId } });
                clear();
              }}
            >
              <div className={clsx(["flex"], ["items-center"])}>
                <PlusIcon className={clsx(["w-4"], ["h-4"])} />
                <div className={clsx(["ml-1"], ["text-sm"])}>追加する</div>
              </div>
            </BlueButton>
          </div>
        </>
      )}
    </div>
  );
};
