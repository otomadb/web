import { notFound } from "next/navigation";

import { graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { UserMylistPageFragmentDoc } from "~/gql/graphql";

export const revalidate = 0;

export default async function Page({ params }: { params: { name: string } }) {
  const data = await fetchGql(
    graphql(`
      query UserLikesPage($userName: String!) {
        findUser(input: { name: $userName }) {
          likes {
            id
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
      fragment={useFragment(UserMylistPageFragmentDoc, findUser.likes)}
    />
  );
}
