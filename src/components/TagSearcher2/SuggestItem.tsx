"use client";
import clsx from "clsx";
import React from "react";

import { CommonTag2 } from "~/components/CommonTag";
import { Fragment as CommonTagFragment } from "~/components/CommonTag";
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
          small: ["gap-y-0.5 px-2 py-1"],
          medium: ["gap-y-1 px-2 py-2"],
          large: ["gap-y-2 px-2 py-2"],
        }[size],
        ["flex flex-col items-start bg-slate-950 hover:bg-slate-900"]
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
        <CommonTag2
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
            ["italic text-slate-400"]
          )}
        >
          {fragment.name.name}
        </div>
      )}
    </div>
  );
}
