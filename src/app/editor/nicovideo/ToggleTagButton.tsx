"use client";

import clsx from "clsx";
import React from "react";
import { CommonTag } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RegisterNicovideoPage_RequestFormPart_ToggleTagButton on Tag {
    id
    ...CommonTag
  }
`);

export default function ({
  className,
  toggleTag,
  ...props
}: {
  className?: string;
  toggleTag: (id: string) => void;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <button
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
}
