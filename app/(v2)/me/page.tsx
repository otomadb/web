import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import type { Metadata } from "next";

import SideNav from "~/app/(v2)/users/[name]/SideNav";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "あなたがいいねした音MAD",
};

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
      <div className={clsx("flex flex-wrap gap-x-4 @container/page")}>
        <SideNav
          className={clsx("w-72")}
          primaryFragment={viewer}
          isMyPage={true}
        />
        <div
          className={clsx(
            "grow border border-obsidian-primary bg-obsidian-darker p-4"
          )}
        >
          <p className={clsx("text-snow-primary")}>プロフィールを表示</p>
        </div>
      </div>
    );
  },
  { returnTo: "/" }
);
