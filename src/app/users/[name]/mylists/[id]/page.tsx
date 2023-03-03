import { notFound } from "next/navigation";

import { UserMylist } from "~/components/pages/User/Mylist";
import { graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { UserMylistPageFragmentDoc } from "~/gql/graphql";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { name: string; id: string };
}) {
  const data = await fetchGql(
    graphql(`
      query UserMylistPage($userName: String!, $mylistId: ID!) {
        findUser(input: { name: $userName }) {
          ...UserPageLayout_Nav
          mylist(id: $mylistId) {
            ...UserMylistPage
          }
        }
      }
    `),
    {
      userName: params.name,
      mylistId: params.id,
    }
  );

  if (!data.findUser) notFound();

  const { findUser } = data;
  if (!findUser.mylist) notFound();

  return (
    <UserMylist
      fragment={useFragment(UserMylistPageFragmentDoc, findUser.mylist)}
    />
  );
}
