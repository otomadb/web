"use client";
import clsx from "clsx";
import React from "react";

import NotificationsPageLink from "~/app/notifications/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment GlobalNav_ProfileAccordion_Notifications on Query {
    notifications(filter: { watched: false }) {
      totalCount
    }
  }
`);
export default function Notifications({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}) {
  const { notifications } = useFragment(Fragment, props.fragment);

  return (
    <NotificationsPageLink
      style={style}
      className={clsx(className, ["group bg-white/75 hover:bg-sky-300/75"])}
    >
      <p
        className={clsx([
          "text-xs text-slate-900 group-hover/link:text-sky-900",
        ])}
      >
        {0 < notifications.totalCount && (
          <>
            通知が
            <span
              className={clsx([
                "font-bold text-slate-700 group-hover/link:text-sky-700",
              ])}
            >
              {notifications.totalCount}
            </span>
            件来ています
          </>
        )}
        {0 === notifications.totalCount && <>通知は来ていません</>}
      </p>
    </NotificationsPageLink>
  );
}
