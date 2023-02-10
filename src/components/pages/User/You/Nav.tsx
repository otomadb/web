"use client";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import {
  LinkUser,
  LinkYouLikes,
  LinkYouMylists,
} from "~/components/common/Link";
import { graphql } from "~/gql";
import { YouPageLayout_NavDocument } from "~/gql/graphql";

import { Item, NavWrapper } from "../Nav";

graphql(`
  query YouPageLayout_Nav {
    whoami {
      id
      name
    }
  }
`);
export const YouPageNav: React.FC = () => {
  const highlight = undefined;
  const [{ data }] = useQuery({
    query: YouPageLayout_NavDocument,
  });

  return (
    <NavWrapper>
      <Item
        className={clsx()}
        Wrapper={(props) =>
          data?.whoami?.name ? (
            <LinkUser
              name={data.whoami.name}
              aria-current={highlight === "PROFILE" ? "page" : undefined}
              {...props}
            />
          ) : (
            <div {...props} />
          )
        }
        highlight={highlight === "PROFILE"}
      >
        プロフィール
      </Item>
      <Item
        className={clsx()}
        Wrapper={(props) => (
          <LinkYouLikes
            aria-current={highlight === "LIKES" ? "page" : undefined}
            {...props}
          />
        )}
        highlight={highlight === "LIKES"}
      >
        いいねした動画
      </Item>
      <Item
        className={clsx()}
        Wrapper={(props) => (
          <LinkYouMylists
            aria-current={highlight === "MYLISTS" ? "page" : undefined}
            {...props}
          />
        )}
        highlight={highlight === "MYLISTS"}
      >
        マイリスト
      </Item>
    </NavWrapper>
  );
};
