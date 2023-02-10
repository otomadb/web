"use client";
import clsx from "clsx";
import React, { ReactNode } from "react";
import { useQuery } from "urql";

import {
  LinkUser,
  LinkUserLikes,
  LinkUserMylists,
  LinkYouLikes,
  LinkYouMylists,
} from "~/components/common/Link";
import { graphql } from "~/gql";
import {
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
            aria-current={highlight === "PROFILE" ? "page" : undefined}
            name={fragment.name}
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
              aria-current={highlight === "LIKES" ? "page" : undefined}
              name={fragment.name}
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
              aria-current={highlight === "MYLISTS" ? "page" : undefined}
              name={fragment.name}
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
