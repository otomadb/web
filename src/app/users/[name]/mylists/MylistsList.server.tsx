import clsx from "clsx";

import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { MylistListItem } from "./MylistsListItem";

const Fragment = graphql(`
  fragment UserMylistsPage_MylistsList on User {
    id
  }
`);
export const MylistList = async ({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) => {
  const fragment = useFragment(Fragment, props.fragment);

  const { getUser } = await fetchGql(
    graphql(`
      query UserMylistsPage_MylistsList_Fetch($id: ID!) {
        getUser(id: $id) {
          mylists(range: [PUBLIC]) {
            nodes {
              id
              ...UserMylistsPage_MylistsListItem
            }
          }
        }
      }
    `),
    { id: fragment.id }
  );

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
