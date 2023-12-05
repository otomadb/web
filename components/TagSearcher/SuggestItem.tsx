"use client";
import clsx from "clsx";
import React from "react";

import CommonTag from "~/components/CommonTag";
import { CommonTagFragment } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const SuggestItemFragment = graphql(`
  fragment TagSearcher_SuggestItem on TagSearchItemByName {
    name {
      id
      name
      primary
    }
    tag {
      id
      ...CommonTag
    }
  }
`);
export default function SuggestItem({
  className,
  style,
  size,
  handleSelect,
  disabled = false,
  ...props
}: {
  className?: string;
  size: "small" | "medium" | "large";
  style?: React.CSSProperties;
  handleSelect(
    id: string,
    fragment: FragmentType<typeof CommonTagFragment>
  ): void;
  fragment: FragmentType<typeof SuggestItemFragment>;
  disabled?: boolean;
}) {
  const fragment = useFragment(SuggestItemFragment, props.fragment);

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label="検索候補"
      className={clsx(
        className,
        {
          small: ["py-1", "px-2", "gap-y-0.5"],
          medium: ["py-2", "px-2", "gap-y-1"],
          large: ["py-2", "px-2", "gap-y-2"],
        }[size],
        ["flex", "flex-col", "items-start"],
        ["bg-slate-950", "hover:bg-slate-900"]
      )}
      onClick={(e) => {
        e.preventDefault();
        e.currentTarget.blur();
        if (disabled) return;
        handleSelect(fragment.tag.id, fragment.tag);
      }}
      style={style}
    >
      <div>
        <CommonTag
          className={clsx()}
          size={size === "large" ? "small" : "xs"}
          fragment={fragment.tag}
        />
      </div>
      {!fragment.name.primary && (
        <div
          className={clsx(
            {
              small: ["text-xxs"],
              medium: ["text-xs"],
              large: ["text-sm"],
            }[size],
            ["italic"],
            ["text-slate-400"]
          )}
        >
          {fragment.name.name}
        </div>
      )}
    </div>
  );
}
