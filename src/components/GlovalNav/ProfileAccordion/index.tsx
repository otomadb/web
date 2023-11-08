"use client";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import React, { ReactNode } from "react";

import { LinkRegisterSemitag } from "~/app/editor/semitags/Link";
import { TagRegisterPageLink } from "~/app/editor/tags/Link";
import { YouLikesPageLink } from "~/app/me/likes/Link";
import MyMylistsPageLink from "~/app/me/mylists/Link";
import { SettingPageLink } from "~/app/settings/Link";
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

import AboutMe from "./AboutMe";
import Notifications from "./Notifications";

const MenuItem: React.FC<{
  className?: string;
  Wrapper: React.FC<{
    className?: string;
    children?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  }>;
  children: ReactNode;
}> = ({ className, Wrapper, children }) => {
  return (
    <Wrapper
      className={clsx(className, [
        "block bg-white/75 px-4 py-2 text-xs text-slate-900 hover:bg-sky-300/75 group-hover/link:text-sky-900",
      ])}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
    >
      {children}
    </Wrapper>
  );
};

export const Fragment = graphql(`
  fragment GlobalNav_ProfileAccordion on Query {
    ...GlobalNav_ProfileAccordion_AboutMe
    ...GlobalNav_ProfileAccordion_Notifications
    whoami {
      name
      isEditor: hasRole(role: EDITOR)
      isAdmin: hasRole(role: ADMIN)
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
  fragment: FragmentType<typeof Fragment>;
}) {
  const { logout } = useAuth0();
  const fragment = useFragment(Fragment, props.fragment);
  const { whoami } = fragment;
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
      className={clsx(className, [
        "divide-y-slate-400/75 flex flex-col divide-y overflow-hidden rounded-md shadow backdrop-blur-[6px]",
      ])}
    >
      <AboutMe fragment={fragment} className={clsx("px-4 py-3")} />
      <Notifications fragment={fragment} className={clsx("px-4 py-3")} />
      <div className={clsx("grid grid-cols-1")}>
        <MenuItem Wrapper={(props) => <YouLikesPageLink {...props} />}>
          いいねした動画
        </MenuItem>
        <MenuItem Wrapper={(props) => <MyMylistsPageLink {...props} />}>
          マイリスト
        </MenuItem>
        <MenuItem
          Wrapper={({ className, onClick, ...props }) => (
            <button
              {...props}
              className={clsx(className, "text-left")}
              type="button"
              onClick={(e) => {
                if (onClick) onClick(e);
                openRequestFromNicovideo();
              }}
            />
          )}
        >
          ニコニコ動画からリクエスト
        </MenuItem>
        <MenuItem
          Wrapper={({ className, onClick, ...props }) => (
            <button
              {...props}
              className={clsx(className, "text-left")}
              type="button"
              onClick={(e) => {
                if (onClick) onClick(e);
                openRequestFromYoutube(null);
              }}
            />
          )}
        >
          YouTubeからリクエスト
        </MenuItem>
        <MenuItem
          Wrapper={({ className, onClick, ...props }) => (
            <button
              {...props}
              className={clsx(className, "text-left")}
              type="button"
              onClick={(e) => {
                if (onClick) onClick(e);
                openRequestFromSoundcloud(null);
              }}
            />
          )}
        >
          Soundcloudからリクエスト
        </MenuItem>
        <MenuItem Wrapper={(props) => <SettingPageLink {...props} />}>
          設定
        </MenuItem>
      </div>
      {whoami.isEditor && (
        <div className={clsx("grid grid-cols-2")}>
          <MenuItem
            className={clsx("col-span-2")}
            Wrapper={({ className, onClick, ...props }) => (
              <button
                {...props}
                className={clsx(className, "text-left")}
                type="button"
                onClick={(e) => {
                  if (onClick) onClick(e);
                  openRegisterFromNicovideo();
                }}
              />
            )}
          >
            ニコニコ動画から登録
          </MenuItem>
          <MenuItem
            className={clsx("col-span-2")}
            Wrapper={({ className, onClick, ...props }) => (
              <button
                {...props}
                className={clsx(className, "text-left")}
                type="button"
                onClick={(e) => {
                  if (onClick) onClick(e);
                  openRegisterFromYoutube(null);
                }}
              />
            )}
          >
            Youtubeから登録
          </MenuItem>
          <MenuItem
            className={clsx("col-span-2")}
            Wrapper={({ className, onClick, ...props }) => (
              <button
                {...props}
                className={clsx(className, "text-left")}
                type="button"
                onClick={(e) => {
                  if (onClick) onClick(e);
                  openRegisterFromBilibili(null);
                }}
              />
            )}
          >
            ビリビリ動画から登録
          </MenuItem>
          <MenuItem
            className={clsx("col-span-2")}
            Wrapper={({ className, onClick, ...props }) => (
              <button
                {...props}
                className={clsx(className, "text-left")}
                type="button"
                onClick={(e) => {
                  if (onClick) onClick(e);
                  openSoundcloudRegisterModal(null);
                }}
              />
            )}
          >
            Soundcloudから登録
          </MenuItem>
          <MenuItem
            className={clsx("col-span-1")}
            Wrapper={(props) => <TagRegisterPageLink {...props} />}
          >
            タグの登録
          </MenuItem>
          <MenuItem
            className={clsx("col-span-1")}
            Wrapper={(props) => <LinkRegisterSemitag {...props} />}
          >
            仮タグの解決
          </MenuItem>
        </div>
      )}
      <div className={clsx("flex bg-slate-300/75 px-4 py-2")}>
        <button
          onClick={() => {
            logout();
          }}
          className={clsx(["text-xs text-slate-700 hover:text-slate-500"])}
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}
