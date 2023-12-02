"use client";

import clsx from "clsx";
import React from "react";

import { LinkRegisterSemitag } from "~/app/(application)/(editor)/editor/semitags/Link";
import { TagRegisterPageLink } from "~/app/(application)/(editor)/editor/tags/Link";
import NotificationsPageLink from "~/app/(application)/(normal)/notifications/Link";
import { SettingPageLink } from "~/app/(application)/(normal)/settings/Link";
import { MyPageLink } from "~/app/(v2)/(authenticated)/home/Link";
import MyLikesPageLink from "~/app/(v2)/(authenticated)/me/(user)/likes/Link";
import MyMylistsPageLink from "~/app/(v2)/(authenticated)/me/(user)/mylists/Link";
import { LogoutLink } from "~/components/AuthLink";
import {
  useOpenRegisterFromBilibili,
  useOpenRegisterFromNicovideo,
  useOpenRegisterFromYoutube,
  useOpenRequestFromNicovideo,
  useOpenRequestFromSoundcloud,
  useOpenRequestFromYoutube,
  useOpenSoundcloudRegisterModal,
} from "~/components/FormModal";
import { FragmentType, graphql, useFragment } from "~/gql";

export const AccordionFragment = graphql(`
  fragment GlobalNav_ProfileAccordion on User {
    name
    displayName
    isEditor: hasRole(role: EDITOR)
    isAdmin: hasRole(role: ADMIN)
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
  const { notifications, displayName, name, isEditor } = fragment;
  const openRequestFromNicovideo = useOpenRequestFromNicovideo();

  const openRegisterFromNicovideo = useOpenRegisterFromNicovideo();
  const openRegisterFromYoutube = useOpenRegisterFromYoutube();
  const openRegisterFromBilibili = useOpenRegisterFromBilibili();
  const openSoundcloudRegisterModal = useOpenSoundcloudRegisterModal();

  const openRequestFromYoutube = useOpenRequestFromYoutube();
  const openRequestFromSoundcloud = useOpenRequestFromSoundcloud();

  return (
    <div
      style={style}
      className={clsx(
        className,
        "flex flex-col divide-y divide-obsidian-lighter overflow-hidden rounded-md border border-obsidian-lighter bg-obsidian-primary/90 shadow-md backdrop-blur-md"
      )}
    >
      <MyPageLink
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
      </MyPageLink>
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
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            openRequestFromNicovideo();
          }}
          className={clsx(
            "block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
          )}
        >
          ニコニコ動画からリクエスト
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            openRequestFromYoutube(null);
          }}
          className={clsx(
            "block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
          )}
        >
          YouTubeからリクエスト
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            openRequestFromSoundcloud(null);
          }}
          className={clsx(
            "block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
          )}
        >
          Soundcloudからリクエスト
        </button>
        <SettingPageLink
          className={clsx(
            "block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
          )}
        >
          設定
        </SettingPageLink>
      </div>
      {isEditor && (
        <div className={clsx("grid grid-cols-2")}>
          <button
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              openRegisterFromNicovideo();
            }}
            className={clsx(
              "col-span-2 block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
            )}
          >
            ニコニコ動画から登録
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              openRegisterFromYoutube(null);
            }}
            className={clsx(
              "col-span-2 block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
            )}
          >
            Youtubeから登録
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              openRegisterFromBilibili(null);
            }}
            className={clsx(
              "col-span-2 block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
            )}
          >
            ビリビリ動画から登録
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              openSoundcloudRegisterModal(null);
            }}
            className={clsx(
              "col-span-2 block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
            )}
          >
            Soundcloudから登録
          </button>
          <TagRegisterPageLink
            className={clsx(
              "col-span-1 block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
            )}
          >
            タグの登録
          </TagRegisterPageLink>
          <LinkRegisterSemitag
            className={clsx(
              "col-span-1 block px-4 py-2 text-left text-xs text-snow-primary hover:bg-vivid-primary hover:text-obsidian-primary"
            )}
          >
            仮タグの解決
          </LinkRegisterSemitag>
        </div>
      )}
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
