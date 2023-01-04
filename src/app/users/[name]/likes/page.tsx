import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

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
      <p>いいね</p>
    </>
  );
}
