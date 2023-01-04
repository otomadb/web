import { notFound } from "next/navigation";

import { getFragment, graphql } from "~/gql";
import { UserPageLayout_NavFragmentDoc } from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

import { Nav } from "../Nav";

export default async function Page({ params }: { params: { name: string } }) {
  const { findUser } = await gqlRequest(
    graphql(`
      query UserLikesPage($name: String!) {
        findUser(input: { name: $name }) {
          id
          ...UserPageLayout_Nav
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) notFound();

  return (
    <>
      <Nav
        highlight="LIKES"
        user={getFragment(UserPageLayout_NavFragmentDoc, findUser)}
      />
      <p>いいね</p>
    </>
  );
}
