import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/utils/fetchGql";

export default async function Page({ params }: { params: { name: string } }) {
  const { findUser } = await fetchGql(
    graphql(`
      query UserPage($name: String!) {
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
      <p>プロフィール</p>
    </>
  );
}
