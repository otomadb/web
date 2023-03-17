import clsx from "clsx";
import { cookies } from "next/headers";

import { MylistTitle } from "~/components/common/MylistTitle";
import { YouMylistLinkSwitch } from "~/components/common/YouMylistLinkSwitch";
import { FragmentType, graphql, useFragment } from "~/gql";
import { fetchGql2 } from "~/gql/fetch";

export const Fragment = graphql(`
  fragment YouMylistsPageLayout_SideMylistList on User {
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
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_COOKIE_KEY)?.value;

  const { id } = useFragment(Fragment, props.fragment);
  const { getUser } = await fetchGql2(
    {
      document: graphql(`
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
      `),
      variables: { id },
    },
    { session }
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
        <YouMylistLinkSwitch key={mylist.id} fragment={mylist}>
          <MylistTitle fragment={mylist} />
        </YouMylistLinkSwitch>
      ))}
    </div>
  );
};
