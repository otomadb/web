import clsx from "clsx";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { SideMylistList } from "./SideMylistList.server";
import { Query } from "./SideMylistList.server";

export default async function Layout({
  children,
  params,
}: {
  params: { name: string };
  children: React.ReactNode;
}) {
  const { findUser } = await fetchGql(
    graphql(`
      query UserMylistsPageLayout($name: String!) {
        findUser(input: { name: $name }) {
          id
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) notFound();

  return (
    <div className={clsx(["flex"])}>
      <div className={clsx(["flex-shrink-0"], ["w-72"])}>
        <Suspense>
          {/* @ts-expect-error for Server Component*/}
          <SideMylistList fetcher={fetchGql(Query, { id: findUser.id })} />
        </Suspense>
      </div>
      <div className={clsx(["flex-grow"])}>{children}</div>
    </div>
  );
}
