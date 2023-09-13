"use client";
import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { CommonTag2 } from "../CommonTag";

export const Fragment = graphql(`
  fragment RegisterFromNicovideoForm_TagButton on Tag {
    id
    ...CommonTag
  }
`);
export const Query = graphql(`
  query RegisterFromNicovideoForm_FetchTagButton($id: ID!) {
    getTag(id: $id) {
      id
      ...CommonTag
    }
  }
`);
export const TagButton: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
  tagId: string;
  selected: boolean;
  append(f: FragmentType<typeof Fragment>): void;
  remove(): void;
}> = ({ className, selected, remove, append, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div
      className={clsx(className, ["select-none"])}
      role="button"
      onClick={() => {
        if (selected) remove();
        else append(fragment);
      }}
    >
      <CommonTag2 size="xs" fragment={fragment} disabled={!selected} />
    </div>
  );
};
