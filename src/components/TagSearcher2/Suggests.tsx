"use client";

import "client-only";

import clsx from "clsx";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import SuggestItem from "./SuggestItem";

export const Fragment = graphql(`
  fragment TagSearcher2_Suggests on SearchTagsPayload {
    items {
      ...TagSearcher2_SuggestItem
    }
  }
`);
export default function Suggests({
  className,
  size,
  style,
  handleSelect,
  ...props
}: {
  className?: string;
  size: "small" | "medium" | "large";
  style?: React.CSSProperties;
  handleSelect: ComponentProps<typeof SuggestItem>["handleSelect"];
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  const { items } = fragment;

  return (
    <div className={clsx(className)} style={style}>
      {0 === items.length && (
        <div
          className={clsx(
            {
              small: ["py-1", "px-2"],
              medium: ["py-2", "px-2"],
              large: ["py-2", "px-2"],
            }[size],
            ["bg-slate-950"],
            ["text-xs", "text-slate-600"]
          )}
        >
          該当候補はありません
        </div>
      )}
      {0 < items.length && (
        <div
          className={clsx(
            ["flex", "flex-col", "items-stretch"],
            ["divide-y", ["divide-slate-800"]]
          )}
        >
          {items.map((fragment, i) => (
            <SuggestItem
              key={i}
              size={size}
              className={clsx()}
              fragment={fragment}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
