import clsx from "clsx";
import { notFound } from "next/navigation";

import { AttentionYou } from "~/components/pages/User/AttentionYou";
import { UserMylists } from "~/components/pages/User/Mylists";
import { getFragment, graphql } from "~/gql";
import { UserMylistsPage_MylistsFragmentDoc } from "~/gql/graphql";
import { fetchGql } from "~/utils/fetchGql";

export default async function Page({ params }: { params: { name: string } }) {
  const { findUser } = await fetchGql(
    graphql(`
      query UserMylistsPage($name: String!) {
        findUser(input: { name: $name }) {
          id
          ...UserPageLayout_Nav
          mylists(input: { limit: 20 }) {
            ...UserMylistsPage_Mylists
          }
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) notFound();

  return (
    <>
      <div>
        <AttentionYou
          className={clsx(["w-full"], ["my-4"])}
          pageUserId={findUser.id}
        />
        <UserMylists
          fallback={getFragment(
            UserMylistsPage_MylistsFragmentDoc,
            findUser.mylists
          )}
        />
      </div>
    </>
  );
}
