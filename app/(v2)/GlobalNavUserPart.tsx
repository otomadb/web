"use client";

import clsx from "clsx";
import { CSSProperties } from "react";

import MyLikesPageLink from "~/app/(v2)/me/likes/Link";
import MyTopPageLink from "~/app/(v2)/me/Link";
import MyMylistsPageLink from "~/app/(v2)/me/mylists/Link";
import NotificationsPageLink from "~/app/(v2)/notifications/Link";
import SettingPageLink from "~/app/(v2)/settings/Link";
import { LoginLink, LogoutLink } from "~/components/AuthLink";
import { SignInPictogram } from "~/components/Pictogram";
import { UserIcon } from "~/components/UserIcon";
import { FragmentType, graphql, useFragment } from "~/gql";

export const GlobalNavUserPartFragment = graphql(`
  fragment GlobalNav on Query {
    viewer {
      ...UserIcon
      name
      displayName
    }
    countUnwatchedNotifications
  }
`);
export default function GlobalNavUserPart({
  fragment,
}: {
  className?: string;
  style?: CSSProperties;
  fragment: FragmentType<typeof GlobalNavUserPartFragment>;
}) {
  const f = useFragment(GlobalNavUserPartFragment, fragment);
  const { viewer, countUnwatchedNotifications } = f;

  if (!viewer || typeof countUnwatchedNotifications !== "number")
    return (
      <LoginLink
        className={clsx(
          "flex items-center gap-x-2 rounded-sm border border-vivid-primary bg-transparent px-4 py-2 text-vivid-primary duration-50 hover:bg-vivid-primary hover/button:text-obsidian-darker"
        )}
      >
        <SignInPictogram className={clsx("h-4")} />
        <span className={clsx("text-sm")}>ログイン</span>
      </LoginLink>
    );

  return (
    <div className={clsx("group/user relative")}>
      <div className={clsx("relative")} tabIndex={0}>
        <UserIcon
          fragment={viewer}
          size={32}
          className={clsx("h-full w-full")}
        />
        {0 < countUnwatchedNotifications && (
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
              {countUnwatchedNotifications}
            </span>
          </div>
        )}
      </div>
      <div
        className={clsx(
          "invisible group-hover/user:visible",
          "absolute right-0 top-full z-0 w-64 pt-1",
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
            {viewer.displayName}
          </div>
          <div
            className={clsx(
              "text-xs text-snow-darker group-hover/link:text-obsidian-primary"
            )}
          >
            @{viewer.name}
          </div>
        </MyTopPageLink>
        <NotificationsPageLink
          className={clsx("group/link block px-4 py-2 hover:bg-vivid-primary")}
        >
          {0 < countUnwatchedNotifications ? (
            <span
              className={clsx(
                "text-xs text-snow-primary group-hover/link:text-obsidian-primary"
              )}
            >
              通知が
              <span>{countUnwatchedNotifications}</span>
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
    </div>
  );
}
