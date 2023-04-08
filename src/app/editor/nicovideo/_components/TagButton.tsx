"use client";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { CommonTag } from "~/components/CommonTag";
import { graphql } from "~/gql";

import { useToggleTag } from "./Original/Context";

export const Query = graphql(`
  query RegisterNicovideoPage_RegisterForm_Confirm_Tag($id: ID!) {
    getTag(id: $id) {
      ...CommonTag
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

  if (!data) return null;

  return (
    <button
      className={clsx(className, ["flex"], ["text-left"])}
      type="button"
      onClick={() => {
        toggleTag(data.getTag.id);
      }}
    >
      <CommonTag
        className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
        fragment={data.getTag}
      />
    </button>
  );
};
