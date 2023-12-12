import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import { notFound } from "next/navigation";
import * as z from "zod";

import MylistRegistrations from "~/app/(v2)/users/[name]/mylists/[slug]/MylistRegistrations";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

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
              slug
              title
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
    if (!viewer?.mylist) notFound();

    const pageMax = Math.ceil(
      viewer.mylist.registrationsByOffset.totalCount / PER_PAGE
    );

    return (
      <main
        className={clsx(
          "grow border border-obsidian-primary bg-obsidian-darker p-4 @container/page"
        )}
      >
        <MylistRegistrations
          currentPage={page}
          pageMax={pageMax}
          pathname={`/me/mylists/${viewer.mylist.slug}`}
          title={viewer.mylist.title}
          noc="このマイリストにはまだ何も登録されていません"
          fragment={viewer.mylist.registrationsByOffset}
        />
      </main>
    );
  },
  { returnTo: "/" }
);
