import clsx from "clsx";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import SideNav from "./SideNav";

export default async function Page({ params }: { params: { name: string } }) {
  const result = await makeGraphQLClient().request(
    graphql(`
      query UserTopPage($name: String!) {
        findUser(input: { name: $name }) {
          ...UserPage_SideNav
        }
      }
    `),
    { name: params.name }
  );

  if (!result.findUser) notFound();
  const { findUser } = result;

  return (
    <div className={clsx("flex flex-wrap gap-x-4 @container/page")}>
      <SideNav className={clsx("w-72")} primaryFragment={findUser} />
      <div
        className={clsx(
          "grow border border-obsidian-primary bg-obsidian-darker p-4"
        )}
      >
        <p className={clsx("text-snow-primary")}>TODO</p>
      </div>
    </div>
  );
}
