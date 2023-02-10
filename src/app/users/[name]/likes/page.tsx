import { notFound } from "next/navigation";

import { getFragment, graphql } from "~/gql";
import { UserMylistPageFragmentDoc } from "~/gql/graphql";
import { UserMylist } from "~/pages/User/Mylist";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 0;

export default async function Page({ params }: { params: { name: string } }) {
  const data = await gqlRequest(
    graphql(`
      query UserLikesPage($userName: String!) {
        findUser(input: { name: $userName }) {
          likes {
            ...UserMylistPage
          }
        }
      }
    `),
    {
      userName: params.name,
    }
  );

  if (!data.findUser) notFound();

  const { findUser } = data;
  if (!findUser.likes) notFound();

  return (
    <UserMylist
      fragment={getFragment(UserMylistPageFragmentDoc, findUser.likes)}
    />
  );
}
