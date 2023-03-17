"use client";

import clsx from "clsx";
import { useQuery } from "urql";

import { MylistListItem } from "~/app/users/[name]/mylists/MylistsListItem";
import { YouMylistLinkSwitch } from "~/components/common/YouMylistLinkSwitch";
import { graphql } from "~/gql";

/*
export const Fragment = graphql(`
  fragment YouMylistsPage_MylistsList on User {
    id
  }
`);
*/
export const MylistsList: React.FC<{
  className?: string;
  // fragment: FragmentType<typeof Fragment>;
}> = ({ className }) => {
  // const fragment = useFragment(Fragment, props.fragment);
  const [{ data }] = useQuery({
    query: graphql(`
      query YouMylistsPage_MylistsList_Fetch {
        whoami {
          id
          mylists(range: [PUBLIC, KNOW_LINK, PRIVATE]) {
            nodes {
              ...YouMylistLinkSwitch
              ...UserMylistsPage_MylistsListItem
              id
            }
          }
        }
      }
    `),
  });

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
          Link={(props) => <YouMylistLinkSwitch fragment={mylist} {...props} />}
        />
      ))}
    </div>
  );
};
