"use client";

import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { MylistTitle } from "~/components/common/MylistTitle";
import { YouMylistLinkSwitch } from "~/components/common/YouMylistLinkSwitch";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment YouMylistsPageLayout_SideMylistsList on User {
    id
  }
`);
export const SideMylistList: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const [{ data }] = useQuery({
    query: graphql(`
      query YouMylistsPageLayout_SideMylistsList_Fetch($userId: ID!) {
        getUser(id: $userId) {
          id
          mylists(range: [PUBLIC, KNOW_LINK, PRIVATE]) {
            nodes {
              ...MylistTitle
              ...YouMylistLinkSwitch
              id
            }
          }
        }
      }
    `),
    variables: {
      userId: fragment.id,
    },
  });

  if (!data?.getUser) return null;

  return (
    <div
      className={clsx(
        className,
        ["flex", "flex-col", "items-stretch"],
        ["h-full"],
        ["overflow-y-scroll"]
      )}
    >
      {data.getUser.mylists.nodes.map((mylist) => (
        <YouMylistLinkSwitch key={mylist.id} fragment={mylist}>
          <MylistTitle fragment={mylist} />
        </YouMylistLinkSwitch>
      ))}
    </div>
  );
};
