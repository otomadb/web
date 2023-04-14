"use client";

import clsx from "clsx";
import React from "react";

import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment GlobalNav_ProfileIndicator on Query {
    whoami {
      ...UserIcon
    }
    notifications(filter: { watched: false }) {
      totalCount
    }
  }
`);
export default function ProfileIndicator({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}) {
  const { whoami, notifications } = useFragment(Fragment, props.fragment);

  return (
    <div
      style={style}
      className={clsx(className, ["relative"], ["w-[32px]", "h-[32px]"])}
      tabIndex={0}
    >
      <UserIcon
        className={clsx(["w-[32px]", "h-[32px]"])}
        fragment={whoami}
        size={32}
      />
      {0 < notifications.totalCount && (
        <div
          className={clsx(
            ["absolute", "top-[75%]", "left-[75%]"],
            ["bg-sky-500/90"],
            ["px-2", "py-1"],
            ["flex"],
            ["rounded-full"],
            ["select-none"]
          )}
        >
          <span
            className={clsx(
              ["text-xs", "font-bold"],
              ["leading-none"],
              ["text-sky-100"]
            )}
          >
            {notifications.totalCount}
          </span>
        </div>
      )}
    </div>
  );
}
