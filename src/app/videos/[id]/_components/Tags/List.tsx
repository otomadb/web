"use client";
import clsx from "clsx";
import React, { Fragment } from "react";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_TagFragmentDoc,
  VideoPage_VideoTagsFragment,
} from "~/gql/graphql";

import { Tag } from "../../Tag";
import { UntagButton } from "./UntagButton";

graphql(`
  fragment VideoPage_VideoTags on Video {
    tags {
      ...VideoPage_Tag
    }
  }
`);

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
  tags: VideoPage_VideoTagsFragment;
}> = ({ className, tags, edit, videoId }) => {
  return (
    <div className={className}>
      <TagTypesList
        tags={tags.tags.map((t) => getFragment(VideoPage_TagFragmentDoc, t))}
      />
      <div className={clsx(["mt-2"], ["flex", "flex-col"], ["gap-y-2"])}>
        {tags.tags
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
