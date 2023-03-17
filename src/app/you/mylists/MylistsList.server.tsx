import clsx from "clsx";
import { cookies } from "next/headers";

import { MylistListItem } from "~/app/users/[name]/mylists/MylistsListItem";
import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql2 } from "~/gql/fetch";

export const Fragment = graphql(`
  fragment YouMylistsPage_MylistsList on User {
    id
  }
`);
export const MylistsList = async ({
  className,
  ...props
}: {
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}) => {
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_COOKIE_KEY)?.value;

  const { id } = useFragment(Fragment, props.fragment);
  const { getUser } = await fetchGql2(
    {
      document: graphql(`
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
      `),
      variables: { id },
    },
    { session }
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
