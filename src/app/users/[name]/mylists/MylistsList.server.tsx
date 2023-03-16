import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";

import { graphql } from "~/gql";

import { MylistListItem } from "./MylistsListItem";

export const Query = graphql(`
  query UserMylistsPage_MylistsList_Fetch(
    $id: ID!
    $ranges: [MylistShareRange!]!
  ) {
    getUser(id: $id) {
      mylists(range: $ranges) {
        nodes {
          id
          ...UserMylistsPage_MylistsListItem
        }
      }
    }
  }
`);
export const MylistsList = async ({
  className,
  fetcher,
}: {
  className?: string;
  fetcher: Promise<ResultOf<typeof Query>>;
}) => {
  const { getUser } = await fetcher;

  return (
    <div
      className={clsx(className, [
        "flex",
        "flex-col",
        "items-stretch",
        "gap-y-2",
      ])}
    >
      {getUser.mylists.nodes.length === 0 && (
        <p>取得可能なマイリストは存在しませんでした</p>
      )}
      {getUser.mylists.nodes.map((mylist) => (
        <MylistListItem key={mylist.id} fragment={mylist} />
      ))}
    </div>
  );
};
