"use client";

import clsx from "clsx";
import { useQuery } from "urql";

import { MylistListItem } from "~/app/(application)/users/[name]/mylists/MylistsListItem";
import { graphql } from "~/gql";

import { YouMylistPageLink } from "./[id]/Link";

const Query = graphql(`
  query YouMylistsPage_MylistsList_Fetch {
    whoami {
      id
      mylists(range: [PUBLIC, KNOW_LINK, PRIVATE]) {
        nodes {
          ...YouMylistPageLink
          ...UserMylistsPage_MylistsListItem
          id
        }
      }
    }
  }
`);
export const MylistsList: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [{ data }] = useQuery({ query: Query });

  if (!data?.whoami?.mylists) return null;

  return (
    <div
      className={clsx(className, [
        "flex",
        "flex-col",
        "items-stretch",
        "gap-y-2",
      ])}
    >
      {data.whoami.mylists.nodes.length === 0 && (
        <p>取得可能なマイリストは存在しませんでした</p>
      )}
      {data.whoami.mylists.nodes.map((mylist) => (
        <MylistListItem
          key={mylist.id}
          fragment={mylist}
          Link={(props) => <YouMylistPageLink fragment={mylist} {...props} />}
        />
      ))}
    </div>
  );
};
