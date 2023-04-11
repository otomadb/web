import clsx from "clsx";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { MylistsList } from "./MylistsList";

export default async function Page({ params }: { params: { name: string } }) {
  const result = await fetchGql(
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
  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findUser) notFound();
  const { findUser } = result.data;

  return (
    <div className={clsx()}>
      <MylistsList fetcher={findUser.mylists} />
    </div>
  );
}
