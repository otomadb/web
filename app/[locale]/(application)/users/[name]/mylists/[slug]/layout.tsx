// 404のときにもSideNavなどが表示されるように

import clsx from "clsx";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import SideNav from "../../SideNav";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { name: string };
}) {
  const result = await makeGraphQLClient().request(
    graphql(`
      query UserMylistPageLayout($name: String!) {
        findUser(input: { name: $name }) {
          ...UserPage_SideNav
        }
      }
    `),
    {
      name: params.name,
    }
  );
  if (!result.findUser) notFound();

  return (
    <div className={clsx("flex flex-wrap gap-x-4 @container/page")}>
      <SideNav className={clsx("w-72")} primaryFragment={result.findUser} />
      <div
        className={clsx(
          "grow border border-obsidian-primary bg-obsidian-darker p-4"
        )}
      >
        {children}
      </div>
    </div>
  );
}
