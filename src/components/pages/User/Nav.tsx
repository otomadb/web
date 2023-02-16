"use client";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { useQuery } from "urql";

import { LinkUserLikes } from "~/app/users/[name]/likes/Link";
import { LinkUser } from "~/app/users/[name]/Link";
import { LinkUserMylists } from "~/app/users/[name]/mylists/Link";
import { LinkYouLikes } from "~/app/you/likes/Link";
import { LinkYouMylists } from "~/app/you/mylists/Link";
import { getFragment, graphql } from "~/gql";
import {
  Link_UserFragmentDoc,
  Link_UserLikesFragmentDoc,
  Link_UserMylistsFragmentDoc,
  UserPageLayout_NavFragment,
  YouPageLayout_NavDocument,
} from "~/gql/graphql";

export const Item: React.FC<{
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
export const NavWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
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
      {children}
    </nav>
  );
};

graphql(`
  fragment UserPageLayout_Nav on User {
    ...Link_User
    ...Link_UserLikes
    ...Link_UserMylists
    id
    name
    likes {
      id
    }
  }

  query UserPageLayout_Nav_Whoami {
    whoami {
      id
      name
    }
  }
`);
export const UserPageNav: React.FC<{
  highlight?: string;
  fragment: UserPageLayout_NavFragment;
}> = ({ highlight, fragment }) => {
  const [{ data: viewerData }] = useQuery({
    query: YouPageLayout_NavDocument,
  });

  return (
    <NavWrapper>
      <Item
        className={clsx()}
        Wrapper={(props) => (
          <LinkUser
            fragment={getFragment(Link_UserFragmentDoc, fragment)}
            aria-current={highlight === "PROFILE" ? "page" : undefined}
            {...props}
          />
        )}
        highlight={highlight === "PROFILE"}
      >
        プロフィール
      </Item>
      {viewerData?.whoami?.id === fragment.id && (
        <Item
          className={clsx()}
          Wrapper={(props) => <LinkYouLikes {...props} />}
          highlight={highlight === "LIKES"}
        >
          いいねした動画
        </Item>
      )}
      {viewerData?.whoami?.id !== fragment.id && fragment.likes && (
        <Item
          className={clsx()}
          Wrapper={(props) => (
            <LinkUserLikes
              fragment={getFragment(Link_UserLikesFragmentDoc, fragment)}
              aria-current={highlight === "LIKES" ? "page" : undefined}
              {...props}
            />
          )}
          highlight={highlight === "LIKES"}
        >
          いいねした動画
        </Item>
      )}
      <Item
        className={clsx()}
        Wrapper={(props) =>
          viewerData?.whoami?.id === fragment.id ? (
            <LinkYouMylists {...props} />
          ) : (
            <LinkUserMylists
              fragment={getFragment(Link_UserMylistsFragmentDoc, fragment)}
              aria-current={highlight === "MYLISTS" ? "page" : undefined}
              {...props}
            />
          )
        }
        highlight={highlight === "MYLISTS"}
      >
        マイリスト
      </Item>
    </NavWrapper>
  );
};
