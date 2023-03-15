import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React from "react";

import { MylistLinkSwitch } from "~/components/common/MylistLinkSwitch";
import { MylistTitle } from "~/components/common/MylistTitle";
import { graphql } from "~/gql";

export const Query = graphql(`
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
        <MylistLinkSwitch key={mylist.id} fragment={mylist}>
          <MylistTitle fragment={mylist} />
        </MylistLinkSwitch>
      ))}
    </div>
  );
};
