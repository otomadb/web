import clsx from "clsx";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { MylistList, Query } from "./MylistsList.server";

export default async function Page({ params }: { params: { name: string } }) {
  const { findUser } = await fetchGql(
    graphql(`
      query UserMylistsPage($name: String!) {
        findUser(input: { name: $name }) {
          id
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) notFound();

  return (
    <div className={clsx()}>
      <Suspense>
        {/* @ts-expect-error for Server Component*/}
        <MylistList fetcher={fetchGql(Query, { id: findUser.id })} />
      </Suspense>
    </div>
  );
}
