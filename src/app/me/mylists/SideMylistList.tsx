"use client";

import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { MylistTitle } from "~/components/MylistTitle";
import { YouMylistLinkSwitch } from "~/components/YouMylistLinkSwitch";
import { graphql } from "~/gql";

/*
export const Fragment = graphql(`
  fragment YouMylistsPageLayout_SideMylistsList on User {
    id
  }
`);
*/
export const SideMylistList: React.FC<{
  className?: string;
  // fragment: FragmentType<typeof Fragment>;
}> = ({ className }) => {
  // const fragment = useFragment(Fragment, props.fragment);
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query YouMylistsPageLayout_SideMylistsList_Fetch {
        whoami {
          id
          mylists(range: [PUBLIC, KNOW_LINK, PRIVATE]) {
            nodes {
              ...MylistTitle
              ...YouMylistLinkSwitch
              id
              isLikeList
            }
          }
        }
      }
    `),
  });

  return (
    <div
      className={clsx(
        className,
        ["flex", "flex-col", "items-stretch"],
        ["overflow-y-scroll"]
      )}
    >
      {!data?.whoami && fetching && <p>マイリストを取得中です</p>}
      {data?.whoami.mylists.nodes.map((mylist) => (
        <YouMylistLinkSwitch key={mylist.id} fragment={mylist}>
          <MylistTitle fragment={mylist} />
        </YouMylistLinkSwitch>
      ))}
    </div>
  );
};
