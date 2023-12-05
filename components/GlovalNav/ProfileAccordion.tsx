"use client";

import clsx from "clsx";
import React from "react";

import MyLikesPageLink from "~/app/(v2)/me/likes/Link";
import MyTopPageLink from "~/app/(v2)/me/Link";
import MyMylistsPageLink from "~/app/(v2)/me/mylists/Link";
import NotificationsPageLink from "~/app/(v2)/notifications/Link";
import SettingPageLink from "~/app/(v2)/settings/Link";
import { LogoutLink } from "~/components/AuthLink";
import { FragmentType, graphql, useFragment } from "~/gql";

export const AccordionFragment = graphql(`
  fragment GlobalNav_ProfileAccordion on User {
    name
    displayName
    notifications(input: { filter: { watched: false } }) {
      totalCount
    }
  }
`);
export default function ProfileAccordion({
  className,
  style,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof AccordionFragment>;
}) {
  const fragment = useFragment(AccordionFragment, props.fragment);
  const { notifications, displayName, name } = fragment;

  return (
    <div
      style={style}
      className={clsx(
        className,
        "flex flex-col divide-y divide-obsidian-lighter overflow-hidden rounded-md border border-obsidian-lighter bg-obsidian-primary/90 shadow-md backdrop-blur-md"
      )}
    >
      <MyTopPageLink
        className={clsx(
          "group/link flex flex-col px-4 py-3 hover:bg-vivid-primary"
        )}
      >
        <div
          className={clsx(
            "text-sm font-bold text-snow-primary group-hover/link:text-obsidian-primary"
          )}
        >
          {displayName}
        </div>
        <div
          className={clsx(
            "text-xs text-snow-darker group-hover/link:text-obsidian-primary"
          )}
        >
          @{name}
        </div>
      </MyTopPageLink>
      <NotificationsPageLink
        className={clsx("group/link block px-4 py-2 hover:bg-vivid-primary")}
      >
        {0 < notifications.totalCount ? (
          <span
            className={clsx(
              "text-xs text-snow-primary group-hover/link:text-obsidian-primary"
            )}
          >
            通知が
            <span>{notifications.totalCount}</span>
            件来ています
          </span>
        ) : (
          <span
            className={clsx(
              "text-xs text-snow-darker group-hover/link:text-obsidian-primary"
            )}
          >
            通知は来ていません
          </span>
        )}
      </NotificationsPageLink>
      <div className={clsx("grid grid-cols-1")}>
        <MyLikesPageLink
          className={clsx(
            "block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
          )}
        >
          いいねした動画
        </MyLikesPageLink>
        <MyMylistsPageLink
          className={clsx(
            "block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
          )}
        >
          マイリスト
        </MyMylistsPageLink>

        <SettingPageLink
          className={clsx(
            "block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
          )}
        >
          設定
        </SettingPageLink>
      </div>

      <LogoutLink
        className={clsx(
          "px-4 py-2 text-xs text-snow-darkest hover:bg-vivid-primary hover:text-obsidian-primary"
        )}
      >
        ログアウト
      </LogoutLink>
    </div>
  );
}
