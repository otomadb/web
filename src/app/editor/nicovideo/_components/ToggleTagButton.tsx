"use client";

import clsx from "clsx";

import { CommonTag } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

import { useToggleTag } from "./Original/Context";

export const Fragment = graphql(`
  fragment RegisterNicovideoPage_RequestFormPart_ToggleTagButton on Tag {
    id
    ...CommonTag
  }
`);

export default function ToggleTagButton({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  const toggleTag = useToggleTag();

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
}
