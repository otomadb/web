import clsx from "clsx";
import { notFound } from "next/navigation";

import { AttentionYou } from "~/components/pages/User/AttentionYou";
import { UserMylists } from "~/components/pages/User/Mylists";
import { graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { UserMylistsPage_MylistsFragmentDoc } from "~/gql/graphql";

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
          fallback={useFragment(
            UserMylistsPage_MylistsFragmentDoc,
            findUser.mylists
          )}
        />
      </div>
    </>
  );
}
