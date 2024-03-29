import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import { notFound } from "next/navigation";
import * as z from "zod";

import MylistRegistrations from "~/app/[locale]/(application)/users/[name]/mylists/[slug]/MylistRegistrations";
import TwitterShareButton from "~/components/TwitterShareButton";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

import { EditButton } from "./Edit";

export const dynamic = "force-dynamic";

export default withPageAuthRequired(
  async ({ params: unparsedParams, searchParams: unparsedSearchParams }) => {
    const params = z.object({ slug: z.string() }).safeParse(unparsedParams);
    if (!params.success) notFound();
    const { slug } = params.data;

    const sp = z
      .object({
        page: z
          .string()
          .optional()
          .transform((v) => (v ? parseInt(v, 10) : 1)),
      })
      .safeParse(unparsedSearchParams);

    if (!sp.success) notFound();
    const { page } = sp.data;

    const PER_PAGE = 36;

    const result = await (
      await makeGraphQLClient2({ auth: "required" })
    ).request(
      graphql(`
        query MeMylistPage2($slug: String!, $offset: Int!, $take: Int!) {
          viewer {
            name
            mylist(slug: $slug) {
              ...EditMylist
              slug
              title
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
        slug,
        offset: (page - 1) * PER_PAGE,
        take: PER_PAGE,
      }
    );

    const { viewer } = result;
    const mylist = viewer?.mylist;
    if (!mylist) notFound();

    const pageMax = Math.ceil(
      mylist.registrationsByOffset.totalCount / PER_PAGE
    );

    return (
      <main
        className={clsx(
          "grow border border-obsidian-primary bg-obsidian-darker p-4 @container/page"
        )}
      >
        <div className={clsx("flex w-full items-center px-4 py-2")}>
          <h1 className={clsx("flex grow text-xl font-bold text-snow-primary")}>
            {mylist.title}
          </h1>
          <div className={clsx("flex h-8 shrink-0 items-center gap-x-2")}>
            {mylist.range && (
              <TwitterShareButton
                size="small"
                payload={{
                  url: `https://www.otomadb.com/users/${viewer.name}/mylists/${mylist.slug}`,
                  text: mylist.title,
                }}
              />
            )}
            <EditButton fragment={mylist} color="blue" size="small" />
          </div>
        </div>
        <MylistRegistrations
          currentPage={page}
          pageMax={pageMax}
          pathname={`/me/mylists/${mylist.slug}`}
          title={mylist.title}
          noc="このマイリストにはまだ何も登録されていません"
          fragment={mylist.registrationsByOffset}
        />
      </main>
    );
  },
  { returnTo: "/" }
);
