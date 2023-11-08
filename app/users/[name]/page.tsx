import { Metadata } from "next";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const result = await fetchGql(
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

  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findUser) notFound();

  const { findUser } = result.data;
  return {
    title: `${findUser.displayName}(@${findUser.name})`,
  };
}

export default async function Page({ params }: { params: { name: string } }) {
  const result = await fetchGql(
    graphql(`
      query UserPage($name: String!) {
        findUser(input: { name: $name }) {
          id
        }
      }
    `),
    { name: params.name }
  );

  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findUser) notFound();

  return (
    <>
      <p>プロフィール</p>
    </>
  );
}
