"use client";
import clsx from "clsx";
import React from "react";

import { CommonTag2 } from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment TagSearcher2_SuggestItem on TagSearchItemByName {
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
  size = "medium",
  handleSelect,
  disabled = false,
  ...props
}: {
  className?: string;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  handleSelect(id: string): void;
  fragment: FragmentType<typeof Fragment>;
  disabled?: boolean;
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label="検索候補"
      className={clsx(
        className,
        {
          small: ["py-0.5", "px-1", "gap-x-1"],
          medium: ["py-2", "px-2", "gap-x-2"],
          large: ["py-2", "px-2", "gap-x-2"],
        }[size],
        ["flex", "items-center"],
        ["bg-slate-950", "hover:bg-slate-900"]
      )}
      onClick={(e) => {
        e.preventDefault();
        e.currentTarget.blur();
        if (disabled) return;
        handleSelect(fragment.tag.id);
      }}
      style={style}
    >
      <div>
        <CommonTag2
          className={clsx()}
          size={size === "small" ? "xs" : "small"}
          fragment={fragment.tag}
        />
      </div>
      {!fragment.name.primary && (
        <div
          className={clsx(
            ["ml-auto"],
            {
              small: ["text-xs"],
              medium: ["text-sm"],
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
