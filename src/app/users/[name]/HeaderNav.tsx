"use client";
import clsx from "clsx";
import React, { ReactNode } from "react";

import { UserLikesPageLink } from "~/app/users/[name]/likes/Link";
import { LinkUser } from "~/app/users/[name]/Link";
import { UserMylistsPageLink } from "~/app/users/[name]/mylists/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment UserPageLayout_HeaderNav on User {
    ...Link_User
    ...Link_UserLikes
    ...Link_UserMylists
  }
`);
export const HeaderNav: React.FC<{
  highlight?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ highlight, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <nav
      className={clsx(
        ["w-full"],
        ["flex"],
        ["px-8"],
        ["bg-slate-100"],
        ["border-b", "border-b-slate-200"]
      )}
    >
      <Item
        className={clsx()}
        Wrapper={(props) => (
          <LinkUser
            fragment={fragment}
            aria-current={highlight === "PROFILE" ? "page" : undefined}
            {...props}
          />
        )}
        highlight={highlight === "PROFILE"}
      >
        プロフィール
      </Item>
      <Item
        className={clsx()}
        Wrapper={(props) => (
          <UserLikesPageLink
            fragment={fragment}
            aria-current={highlight === "LIKES" ? "page" : undefined}
            {...props}
          />
        )}
        highlight={highlight === "MYLISTS"}
      >
        いいねした動画
      </Item>
      <Item
        className={clsx()}
        Wrapper={(props) => (
          <UserMylistsPageLink
            fragment={fragment}
            aria-current={highlight === "MYLISTS" ? "page" : undefined}
            {...props}
          />
        )}
        highlight={highlight === "MYLISTS"}
      >
        マイリスト
      </Item>
    </nav>
  );
};

const Item: React.FC<{
  className?: string;
  children: ReactNode;
  Wrapper: React.FC<{ className?: string; children?: ReactNode }>;
  highlight: boolean;
}> = ({ className, children, Wrapper }) => {
  return (
    <Wrapper
      className={clsx(
        className,
        ["flex", "justify-center"],
        ["px-8"],
        ["py-3"],
        [
          "aria-[current=page]:text-blue-800",
          ["text-slate-900", "hover:text-slate-700"],
        ],
        [
          "aria-[current=page]:bg-blue-100",
          ["bg-transparent", "hover:bg-slate-200"],
        ],
        [
          "border-b-2",
          [
            "aria-[current=page]:border-b-blue-700",
            ["border-b-slate-200", "hover:border-b-slate-300"],
          ],
        ],
        ["text-xs"]
      )}
    >
      {children}
    </Wrapper>
  );
};
