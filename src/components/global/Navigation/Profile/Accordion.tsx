"use client";

import clsx from "clsx";
import React, { ReactNode } from "react";

import {
  LinkRegisterNicovideo,
  LinkRegisterSemitag,
  LinkRegisterTag,
  LinkUser,
  LinkYouLikes,
  LinkYouMylists,
} from "~/components/common/Link";
import { LogoutButton } from "~/components/common/LogoutButton";
import { getFragment, graphql } from "~/gql";
import {
  GlobalNav_Profile_Accordion_ProfileFragment,
  GlobalNav_Profile_Accordion_ProfileFragmentDoc,
  GlobalNav_Profile_AccordionFragment,
} from "~/gql/graphql";

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

graphql(`
  fragment GlobalNav_Profile_Accordion_Profile on User {
    id
    name
    displayName
  }
`);
const Profile: React.FC<{
  fragment: GlobalNav_Profile_Accordion_ProfileFragment;
}> = ({ fragment }) => {
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

graphql(`
  fragment GlobalNav_Profile_Accordion on User {
    name
    ...GlobalNav_Profile_Accordion_Profile
  }
`);
export const Accordion: React.FC<{
  className?: string;
  fragment: GlobalNav_Profile_AccordionFragment;
}> = ({ className, fragment }) => {
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
        <Profile
          fragment={getFragment(
            GlobalNav_Profile_Accordion_ProfileFragmentDoc,
            fragment
          )}
        />
        <div>
          <div
            className={clsx(
              ["py-2"],
              ["px-4"],
              ["bg-slate-200/75"],
              ["border-b", "border-y-slate-300"]
            )}
          >
            <div className={clsx(["text-xs"], ["text-slate-500"])}>
              通常ユーザー
            </div>
          </div>
          <div className={clsx(["grid"], ["grid-cols-1"])}>
            <MenuItem
              Wrapper={(props) => <LinkUser name={fragment.name} {...props} />}
            >
              プロフィール
            </MenuItem>
            <MenuItem Wrapper={(props) => <LinkYouLikes {...props} />}>
              いいねした動画
            </MenuItem>
            <MenuItem Wrapper={(props) => <LinkYouMylists {...props} />}>
              マイリスト
            </MenuItem>
          </div>
        </div>
        <div>
          <div
            className={clsx(
              ["py-2"],
              ["px-4"],
              ["bg-slate-200/75"],
              ["border-b", "border-y-slate-300"]
            )}
          >
            <div className={clsx(["text-xs"], ["text-slate-500"])}>編集者</div>
          </div>
          <div className={clsx(["grid"], ["grid-cols-2"])}>
            <MenuItem
              className={clsx(["col-span-2"])}
              Wrapper={(props) => <LinkRegisterNicovideo {...props} />}
            >
              ニコニコ動画から登録
            </MenuItem>
            <MenuItem
              className={clsx(["col-span-1"])}
              Wrapper={(props) => <LinkRegisterTag {...props} />}
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
        <div
          className={clsx(
            [["py-2"], ["px-4"]],
            [["bg-slate-200/75"]],
            ["grid", ["grid-cols-2"]]
          )}
        >
          <div className={clsx(["flex"])}>
            <LogoutButton
              className={clsx(
                ["text-xs"],
                ["text-slate-700", "hover:text-slate-500"]
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
