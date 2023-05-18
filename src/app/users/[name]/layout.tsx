import clsx from "clsx";
import { GraphQLClient } from "graphql-request";
import { notFound } from "next/navigation";
import React, { cache } from "react";

import { graphql, useFragment } from "~/gql";
import { UserPageLayout_HeaderFragmentDoc } from "~/gql/graphql";

import { Header } from "./Header";
import { HeaderNav } from "./HeaderNav";

const getUser = cache(async (name: string) => {
  const result = await new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT, {
    next: { revalidate: 300 },
  }).request(
    graphql(`
      query UserPageLayout($name: String!) {
        findUser(input: { name: $name }) {
          id
          ...UserPageLayout_Header
          ...UserPageLayout_HeaderNav
        }
      }
    `),
    { name }
  );
  return result.findUser;
});

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { name: string };
}) {
  const result = await getUser(params.name);
  if (!result?.id) notFound();

  return (
    <main
      className={clsx(
        ["mx-auto"],
        ["flex-grow"],
        ["flex", "flex-col", "gap-y-4"]
      )}
    >
      <div className={clsx(["container", "max-w-screen-xl", "mx-auto"])}>
        <Header
          className={clsx(["container", "max-w-screen-xl", "mx-auto"])}
          fragment={useFragment(UserPageLayout_HeaderFragmentDoc, result)}
        />
        <HeaderNav fragment={result} />
        {children}
      </div>
    </main>
  );
}
