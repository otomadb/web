import clsx from "clsx";
import React from "react";

import { MylistLinkSwitch } from "~/components/common/MylistLinkSwitch";
import { MylistTitle } from "~/components/common/MylistTitle";
import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";

graphql(`
  fragment MylistPageCommon_SideMylistList on MylistConnection {
    nodes {
      ...MylistPageCommon_LinkSwitch
      id
      title
      isLikeList
      holder {
        id
        name
        displayName
      }
    }
  }
`);

const Fragment = graphql(`
  fragment UserMylistsPageLayout_SideMylistsList on User {
    id
  }
`);
export const SideMylistList = async ({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) => {
  const fragment = useFragment(Fragment, props.fragment);

  const { getUser } = await fetchGql(
    graphql(`
      query UserMylistsPageLayout_SideMylistsList_Fetch($id: ID!) {
        getUser(id: $id) {
          id
          mylists(range: [PUBLIC]) {
            nodes {
              ...MylistTitle
              ...MylistLinkSwitch
              id
            }
          }
        }
      }
    `),
    { id: fragment.id }
  );

  return (
    <div
      className={clsx(
        className,
        ["flex", "flex-col", "items-stretch"],
        ["h-full"],
        ["overflow-y-scroll"]
      )}
    >
      {getUser.mylists.nodes.map((mylist) => (
        <MylistLinkSwitch key={mylist.id} fragment={mylist}>
          <MylistTitle fragment={mylist} />
        </MylistLinkSwitch>
      ))}
    </div>
  );
};
