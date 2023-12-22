import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import type { Metadata } from "next";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";
import { getScopedI18n } from "~/locales/server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n("page.me");

  return {
    title: t("title"),
  };
}

export default withPageAuthRequired(
  async () => {
    const { accessToken } = await getAccessToken();
    if (!accessToken) throw new Error("accessToken is null");

    const result = await makeGraphQLClient({}).request(
      graphql(`
        query MyTopPage {
          viewer {
            ...UserPage_SideNav
          }
        }
      `),
      {},
      { Authorization: `Bearer ${accessToken}` }
    );

    const { viewer } = result;
    if (!viewer) throw new Error("viewer is null");

    return (
      <main
        className={clsx(
          "grow border border-obsidian-primary bg-obsidian-darker p-4"
        )}
      >
        <p className={clsx("text-snow-primary")}>プロフィールを表示</p>
      </main>
    );
  },
  { returnTo: "/" }
);
