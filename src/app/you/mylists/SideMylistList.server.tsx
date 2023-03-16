import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React from "react";

import { MylistTitle } from "~/components/common/MylistTitle";
import { YouMylistLinkSwitch } from "~/components/common/YouMylistLinkSwitch";
import { graphql } from "~/gql";

export const Query = graphql(`
  query YouMylistsPageLayout_SideMylistsList_Fetch($id: ID!) {
    getUser(id: $id) {
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
`);
export const SideMylistList = async ({
  className,
  fetcher,
}: {
  className?: string;
  fetcher: Promise<ResultOf<typeof Query>>;
}) => {
  const { getUser } = await fetcher;

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
        <YouMylistLinkSwitch key={mylist.id} fragment={mylist}>
          <MylistTitle fragment={mylist} />
        </YouMylistLinkSwitch>
      ))}
    </div>
  );
};
