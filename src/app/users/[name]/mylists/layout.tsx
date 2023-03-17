import clsx from "clsx";
import { notFound } from "next/navigation";
import React from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { SideMylistList } from "./SideMylistList";

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
          mylists(range: [PUBLIC]) {
            ...UserMylistsPageLayout_SideMylistList
          }
        }
      }
    `),
    { name: params.name }
  );

  if (!findUser) notFound();

  return (
    <div className={clsx(["flex"])}>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["w-72"],
          ["h-[calc(100vh-64px)]"],
          ["sticky", "top-[64px]"]
        )}
      >
        <SideMylistList fetcher={findUser.mylists} />
      </div>
      <div className={clsx(["flex-grow"])}>{children}</div>
    </div>
  );
}
