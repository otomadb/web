import { notFound } from "next/navigation";

import { CommonHead } from "~/app/CommonHead";
import { graphql } from "~/gql";
import { fetchGql } from "~/utils/fetchGql";

export default async function Head({ params }: { params: { name: string } }) {
  const { findUser } = await fetchGql(
    graphql(`
      query UserPage_Title($name: String!) {
        findUser(input: { name: $name }) {
          name
          displayName
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) notFound();

  const { name, displayName } = findUser;

  return (
    <>
      <CommonHead />
      <title>{`${displayName}(@${name}) - Otomad Database`}</title>
    </>
  );
}
