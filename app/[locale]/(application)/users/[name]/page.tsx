import clsx from "clsx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";
import { getScopedI18n } from "~/locales/server";

import { PageParams, schemaPageParams } from "./schema";
import SideNav from "./SideNav";

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const t = await getScopedI18n("page.user");

  const { name } = schemaPageParams.parse(params);

  return {
    title: t("title", { name }),
  };
}

export default async function Page({ params }: { params: PageParams }) {
  const { name } = schemaPageParams.parse(params);

  const result = await makeGraphQLClient().request(
    graphql(`
      query UserTopPage($name: String!) {
        findUser(input: { name: $name }) {
          ...UserPage_SideNav
        }
      }
    `),
    { name }
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
