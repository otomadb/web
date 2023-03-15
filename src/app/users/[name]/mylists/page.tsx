import clsx from "clsx";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { MylistList } from "./MylistsList.server";

export default async function Page({ params }: { params: { name: string } }) {
  const { findUser } = await fetchGql(
    graphql(`
      query UserMylistsPage($name: String!) {
        findUser(input: { name: $name }) {
          ...UserMylistsPage_MylistsList
          ...UserPageLayout_Nav
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
        <MylistList fragment={findUser} />
      </Suspense>
    </div>
  );
}
