import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as z from "zod";

import MylistRegistrations from "~/app/(v2)/users/[name]/mylists/[slug]/MylistRegistrations";
import TwitterShareButton from "~/components/TwitterShareButton";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "あなたがいいねした音MAD",
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

    const result = await makeGraphQLClient({}).request(
      graphql(`
        query MyLikesPage($offset: Int!, $take: Int!) {
          viewer {
            ...UserPage_SideNav
            name
            displayName
            likes {
              id
              range
              registrationsByOffset(input: { offset: $offset, take: $take }) {
                ...UserPage_MylistRegistrations
                totalCount
                nodes {
                  id
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

    const { viewer } = result;
    if (!viewer) throw new Error("viewer is null");
    if (page !== 1 && viewer.likes.registrationsByOffset.nodes.length === 0)
      notFound();

    return (
      <main
        className={clsx(
          "grow border border-obsidian-primary bg-obsidian-darker p-4 @container/page"
        )}
      >
        <div className={clsx("flex w-full items-center px-4 py-2")}>
          <h1 className={clsx("flex grow text-xl font-bold text-snow-primary")}>
            あなたがいいねした音MAD
          </h1>
          <div className={clsx("flex h-8 shrink-0 items-center gap-x-2")}>
            {viewer.likes.range && (
              <TwitterShareButton
                size="small"
                payload={{
                  url: `https://www.otomadb.com/${viewer.name}/likes`,
                  text: `${viewer.displayName}が良いと思った音MAD`,
                }}
              />
            )}
          </div>
        </div>
        <MylistRegistrations
          title="あなたがいいねした音MAD"
          noc="あなたがいいねした音MADはありませんでした。"
          pathname="/me/likes"
          currentPage={page}
          pageMax={Math.ceil(
            viewer.likes.registrationsByOffset.totalCount / PER_PAGE
          )}
          fragment={viewer.likes.registrationsByOffset}
        />
      </main>
    );
  },
  { returnTo: "/" }
);
