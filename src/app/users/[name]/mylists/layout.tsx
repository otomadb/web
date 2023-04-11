import clsx from "clsx";
import { notFound } from "next/navigation";
import React from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { SideMylistList } from "./SideMylistList";

export default async function Layout({
  children,
  params,
}: {
  params: { name: string };
  children: React.ReactNode;
}) {
  const result = await fetchGql(
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
  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findUser) notFound();
  const { findUser } = result.data;

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
