import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";

import { MylistListItem } from "~/app/users/[name]/mylists/MylistsListItem";
import { graphql } from "~/gql";

export const Query = graphql(`
  query YouMylistsPage_MylistsList_Fetch($id: ID!) {
    getUser(id: $id) {
      mylists(range: [PUBLIC, KNOW_LINK, PRIVATE]) {
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
