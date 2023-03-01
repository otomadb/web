import { Metadata } from "next";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
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

  if (!findUser) return notFound(); // TODO: これ本当にこれでいいの？

  return {
    title: `${findUser.displayName}(@${findUser.name})`,
  };
}

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
