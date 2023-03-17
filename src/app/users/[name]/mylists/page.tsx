import clsx from "clsx";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { MylistsList } from "./MylistsList";

export default async function Page({ params }: { params: { name: string } }) {
  const { findUser } = await fetchGql(
    graphql(`
      query UserMylistsPage($name: String!) {
        findUser(input: { name: $name }) {
          id
          mylists(range: [PUBLIC]) {
            ...UserMylistsPage_MylistsList
          }
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) notFound();

  return (
    <div className={clsx()}>
      <MylistsList fetcher={findUser.mylists} />
    </div>
  );
}
