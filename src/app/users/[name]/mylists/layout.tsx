import "~/styles/globals.css";

import clsx from "clsx";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { SideMylistList } from "./SideMylistList.server";

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
          ...UserMylistsPageLayout_SideMylistsList
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) notFound();

  return (
    <div className={clsx([])}>
      <div className={clsx(["flex-shrink-0"])}>
        <Suspense>
          {/* @ts-expect-error for Server Component*/}
          <SideMylistList fragment={findUser} />
        </Suspense>
      </div>
      <div className={clsx(["flex-grow"])}>{children}</div>
    </div>
  );
}
