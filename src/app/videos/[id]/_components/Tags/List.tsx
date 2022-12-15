"use client";
import clsx from "clsx";
import React, { Fragment } from "react";
import { useQuery } from "urql";

import { getFragment } from "~/gql";
import {
  VideoPage_RefreshTagsDocument,
  VideoPage_TagFragmentDoc,
  VideoPage_VideoTagsFragmentDoc,
} from "~/gql/graphql";

import { Tag } from "../../Tag";
import { UntagButton } from "./UntagButton";

export const TagTypesList: React.FC<{
  className?: string;
  tags: readonly { type: string }[];
}> = ({ className, tags }) => {
  return (
    <div className={clsx(className, ["flex"], ["gap-x-2"], ["gap-y-2"])}>
      {tags
        .map(({ type }) => type)
        .filter((v1, i, arr) => i === arr.findIndex((v2) => v1 === v2))
        .map((type) => (
          <div key={type} className={clsx(["flex"])}>
            <span
              className={clsx(["text-xs"], ["select-all"], {
                "text-copyright-400": type === "COPYRIGHT",
                "text-character-400": type === "CHARACTER",
                "text-class-400": type === "CLASS",
                "text-music-400": type === "MUSIC",
              })}
            >
              {type}
            </span>
          </div>
        ))}
    </div>
  );
};

export const TagsList: React.FC<{
  className?: string;
  edit: boolean;
  videoId: string;
}> = ({ className, edit, videoId }) => {
  const [result] = useQuery({
    query: VideoPage_RefreshTagsDocument,
    variables: { id: videoId },
  });
  const { data } = result;
  if (!data) return <span>LOADING</span>;

  const { video } = data;
  const fs = getFragment(VideoPage_VideoTagsFragmentDoc, video);

  return (
    <div className={className}>
      <TagTypesList
        tags={fs.tags.map((t) => getFragment(VideoPage_TagFragmentDoc, t))}
      />
      <div className={clsx(["mt-2"], ["flex", "flex-col"], ["gap-y-2"])}>
        {fs.tags
          .map((t) => getFragment(VideoPage_TagFragmentDoc, t))
          .map((tag) => (
            <Fragment key={tag.id}>
              {!edit && <Tag className={clsx(["self-start"])} tag={tag} />}
              {edit && (
                <div className={clsx(["flex"])}>
                  <UntagButton tagId={tag.id} videoId={videoId} />
                  <Tag className={clsx(["ml-2"])} tag={tag} />
                </div>
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};
