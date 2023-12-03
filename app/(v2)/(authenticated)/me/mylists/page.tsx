import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import type { Metadata } from "next";
import * as z from "zod";

import SideNav from "~/app/(v2)/users/[name]/SideNav";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "あなたのマイリスト",
};

export default withPageAuthRequired(
  async ({ searchParams }) => {
    const { page } = z
      .object({
        page: z
          .string()
          .optional()
          .transform((v) => (v ? parseInt(v, 10) : 1)),
      })
      .parse(searchParams);

    const PER_PAGE = 36;

    const { accessToken } = await getAccessToken();
    if (!accessToken) throw new Error("accessToken is null");

    const a = await makeGraphQLClient({}).request(
      graphql(`
        query MyMylistsPage($offset: Int!, $take: Int!) {
          viewer {
            ...UserPage_SideNav
            name
            displayName
            likes {
              id
              registrationsByOffset(input: { offset: $offset, take: $take }) {
                totalCount
                nodes {
                  id
                  ...UserMylistPage_Registration
                }
              }
            }
          }
        }
      `),
      {
        offset: (page - 1) * PER_PAGE,
        take: PER_PAGE,
      },
      { Authorization: `Bearer ${accessToken}` }
    );

    const { viewer } = a;
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
          <p></p>
        </div>
      </div>
    );
  },
  { returnTo: "/" }
);
