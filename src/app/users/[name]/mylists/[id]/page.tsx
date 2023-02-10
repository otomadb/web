import { notFound } from "next/navigation";

import { getFragment, graphql } from "~/gql";
import { UserMylistPageFragmentDoc } from "~/gql/graphql";
import { UserMylist } from "~/pages/User/UserMylist";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { name: string; id: string };
}) {
  const data = await gqlRequest(
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
      fragment={getFragment(UserMylistPageFragmentDoc, findUser.mylist)}
    />
  );
}
