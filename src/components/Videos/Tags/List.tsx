"use client";
import clsx from "clsx";
import React from "react";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_TagFragmentDoc,
  VideoPage_TagsListFragment,
  VideoPage_TagsTypesListFragmentDoc,
} from "~/gql/graphql";

import { Tag } from "../Tag";
import { TagTypesList } from "./TagTypesList";

graphql(`
  fragment VideoPage_TagsList on Video {
    id
    tags {
      id
      ...VideoPage_Tag
    }
    ...VideoPage_TagsTypesList
  }
`);

export const TagsList: React.FC<{
  className?: string;
  edit: boolean;
  fragment: VideoPage_TagsListFragment;
}> = ({ className, fragment }) => {
  const tagtypes = getFragment(VideoPage_TagsTypesListFragmentDoc, fragment);
  const tags = getFragment(VideoPage_TagFragmentDoc, fragment.tags);

  return (
    <div className={className}>
      <TagTypesList fragment={tagtypes} />
      <div
        className={clsx(
          ["mt-2"],
          ["flex", ["flex-row", "lg:flex-col"], ["flex-wrap"], "items-start"],
          ["gap-x-1", "gap-y-1"]
        )}
      >
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};
