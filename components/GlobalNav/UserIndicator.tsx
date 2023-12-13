"use client";

import clsx from "clsx";
import React from "react";

import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment GlobalNav_ProfileIndicator on User {
    ...UserIcon
    notifications(input: { filter: { watched: false } }) {
      totalCount
    }
  }
`);
export default function UserIndicator({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}) {
  const fragment = useFragment(Fragment, props.fragment);
  const totalCount = fragment.notifications.totalCount;

  return (
    <div style={style} className={clsx(className, "relative")} tabIndex={0}>
      <UserIcon
        className={clsx("h-full w-full")}
        fragment={fragment}
        size={32}
      />
      {0 < totalCount && (
        <div
          className={clsx(
            "absolute left-[75%] top-[75%] flex select-none rounded-full bg-vivid-primary px-2 py-1 shadow-[0_0_8px] shadow-vivid-primary/25"
          )}
        >
          <span
            className={clsx(
              "text-xxs font-bold leading-none text-obsidian-primary"
            )}
          >
            {totalCount}
          </span>
        </div>
      )}
    </div>
  );
}
