"use client";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import React, { ReactNode } from "react";

import { NicovideoRegisterPageLink } from "~/app/editor/nicovideo/Link";
import { LinkRegisterSemitag } from "~/app/editor/semitags/Link";
import { TagRegisterPageLink } from "~/app/editor/tags/Link";
import { NicovideoRequestPageLink } from "~/app/request/nicovideo/Link";
import { LinkUser } from "~/app/users/[name]/Link";
import { YouLikesPageLink } from "~/app/you/likes/Link";
import { YouMylistsPageLink } from "~/app/you/mylists/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

const MenuItem: React.FC<{
  className?: string;
  Wrapper: React.FC<{
    className?: string;
    children?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  }>;
  children: ReactNode;
}> = ({ className, Wrapper, children }) => {
  return (
    <Wrapper
      className={clsx(
        className,
        ["block"],
        ["py-2"],
        ["px-4"],
        ["bg-white/75", "hover:bg-sky-300/75"],
        ["text-slate-900", "group-hover/link:text-sky-900"],
        ["text-xs"]
      )}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
    >
      {children}
    </Wrapper>
  );
};

const ProfileFragment = graphql(`
  fragment GlobalNav_Profile_Accordion_Profile on User {
    id
    name
    displayName
  }
`);
const Profile: React.FC<{
  fragment: FragmentType<typeof ProfileFragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(ProfileFragment, props.fragment);

  return (
    <div className={clsx(["py-3"], ["px-4"], ["bg-white/75"])}>
      <div className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}>
        {fragment.displayName}
      </div>
      <div className={clsx(["text-slate-700"], ["text-xs"])}>
        @{fragment.name}
      </div>
    </div>
  );
};

export const Fragment = graphql(`
  fragment GlobalNav_Profile_Accordion on User {
    name
    isEditor
    isAdministrator
    ...GlobalNav_Profile_Accordion_Profile
    ...Link_User
  }
`);
export const Accordion: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const { logout } = useAuth0();
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, ["pt-1"])}>
      <div
        className={clsx(
          ["w-full"],
          ["shadow"],
          ["overflow-hidden"],
          ["rounded-md"],
          ["backdrop-blur-md"],
          ["divide-y-2", "divide-y-slate-400"]
        )}
      >
        <Profile fragment={fragment} />
        <div>
          <div
            className={clsx(
              ["py-2"],
              ["px-4"],
              ["bg-slate-200/75"],
              ["border-b", "border-y-slate-300"],
              ["text-xs"],
              ["text-slate-500"]
            )}
          >
            通常ユーザー
          </div>
          <div className={clsx(["grid"], ["grid-cols-1"])}>
            <MenuItem
              Wrapper={(props) => <LinkUser fragment={fragment} {...props} />}
            >
              プロフィール
            </MenuItem>
            <MenuItem Wrapper={(props) => <YouLikesPageLink {...props} />}>
              いいねした動画
            </MenuItem>
            <MenuItem Wrapper={(props) => <YouMylistsPageLink {...props} />}>
              マイリスト
            </MenuItem>
            <MenuItem
              Wrapper={(props) => <NicovideoRequestPageLink {...props} />}
            >
              動画のリクエスト
            </MenuItem>
          </div>
        </div>
        {fragment.isEditor && (
          <div>
            <div
              className={clsx(
                ["py-2"],
                ["px-4"],
                ["bg-slate-200/75"],
                ["border-b", "border-y-slate-300"],
                ["text-xs"],
                ["text-slate-500"]
              )}
            >
              編集者
            </div>
            <div className={clsx(["grid"], ["grid-cols-2"])}>
              <MenuItem
                className={clsx(["col-span-2"])}
                Wrapper={(props) => <NicovideoRegisterPageLink {...props} />}
              >
                ニコニコ動画から登録
              </MenuItem>
              <MenuItem
                className={clsx(["col-span-1"])}
                Wrapper={(props) => <TagRegisterPageLink {...props} />}
              >
                タグの登録
              </MenuItem>
              <MenuItem
                className={clsx(["col-span-1"])}
                Wrapper={(props) => <LinkRegisterSemitag {...props} />}
              >
                仮タグの解決
              </MenuItem>
            </div>
          </div>
        )}
        <div
          className={clsx(
            [["py-2"], ["px-4"]],
            [["bg-slate-200/75"]],
            ["grid", ["grid-cols-2"]]
          )}
        >
          <div className={clsx(["flex"])}>
            <button
              onClick={() => {
                logout();
              }}
              className={clsx(
                ["text-xs"],
                ["text-slate-700", "hover:text-slate-500"]
              )}
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
