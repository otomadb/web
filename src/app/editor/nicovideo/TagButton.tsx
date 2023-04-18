"use client";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { CommonTag } from "~/components/CommonTag";
import { graphql, useFragment } from "~/gql";

import { useToggleTag } from "./RegisterContext";

export const Fragment = graphql(`
  fragment RegisterNicovideoPage_TagButton on Tag {
    ...CommonTag
    id
  }
`);
export const Query = graphql(`
  query RegisterNicovideoPage_RegisterForm_Confirm_Tag($id: ID!) {
    getTag(id: $id) {
      ...RegisterNicovideoPage_TagButton
      id
    }
  }
`);
export const TagButton: React.FC<{
  className?: string;
  tagId: string;
}> = ({ className, tagId }) => {
  const [{ data }] = useQuery({
    query: Query,
    variables: { id: tagId },
    requestPolicy: "cache-first",
  });
  const toggleTag = useToggleTag();

  const fragment = useFragment(Fragment, data?.getTag);

  if (!fragment) return null;

  return (
    <button
      className={clsx(className, ["flex"], ["text-left"])}
      type="button"
      onClick={() => {
        toggleTag(fragment.id);
      }}
    >
      <CommonTag
        className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
        fragment={fragment}
      />
    </button>
  );
};
