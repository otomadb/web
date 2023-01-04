import clsx from "clsx";
import React, { ReactNode } from "react";

import {
  LinkUser,
  LinkUserLikes,
  LinkUserMylists,
} from "~/components/common/Link";
import { graphql } from "~/gql";
import { UserPageLayout_NavFragment } from "~/gql/graphql";

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

graphql(`
  fragment UserPageLayout_Nav on User {
    name
    likes {
      id
    }
  }
`);
export const Nav: React.FC<{
  // highlight?: "PROFILE" | "LIKES" | "MYLISTS";
  user: UserPageLayout_NavFragment;
}> = ({
  // highlight,
  user,
}) => {
  const highlight = undefined;

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
            aria-current={highlight === "PROFILE" ? "page" : undefined}
            name={user.name}
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
          <LinkUserMylists
            aria-current={highlight === "MYLISTS" ? "page" : undefined}
            name={user.name}
            {...props}
          />
        )}
        highlight={highlight === "MYLISTS"}
      >
        マイリスト
      </Item>
      <Item
        className={clsx()}
        Wrapper={(props) => (
          <LinkUserLikes
            aria-current={highlight === "LIKES" ? "page" : undefined}
            name={user.name}
            {...props}
          />
        )}
        highlight={highlight === "LIKES"}
      >
        いいねした動画
      </Item>
    </nav>
  );
};
