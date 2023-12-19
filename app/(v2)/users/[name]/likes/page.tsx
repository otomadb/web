import clsx from "clsx";
import { notFound } from "next/navigation";

import TwitterShareButton from "~/components/TwitterShareButton";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import MylistRegistrations from "../mylists/[slug]/MylistRegistrations";

export default async function Page({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const PER_PAGE = 36;
  const result = await makeGraphQLClient().request(
    graphql(`
      query UserLikesPage2($name: String!, $offset: Int!, $take: Int!) {
        findUser(input: { name: $name }) {
          name
          displayName
          publicLikes {
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
      name: params.name,
      offset: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }
  );

  const { findUser } = result;
  if (!findUser || !findUser.publicLikes) notFound();

  const pageMax = Math.ceil(
    findUser.publicLikes.registrationsByOffset.totalCount / PER_PAGE
  );

  return (
    <main>
      <div className={clsx("flex w-full items-center px-4 py-2")}>
        <h1 className={clsx("flex grow text-xl font-bold text-snow-primary")}>
          {`${findUser.displayName}が良いと思った音MAD`}
        </h1>
        <div className={clsx("flex h-8 shrink-0 items-center gap-x-2")}>
          {findUser.publicLikes.range && (
            <TwitterShareButton
              size="small"
              payload={{
                url: `https://www.otomadb.com/${findUser.name}/mylists/likes`,
                text: `${findUser.displayName}が良いと思った音MAD`,
              }}
            />
          )}
        </div>
      </div>
      <MylistRegistrations
        currentPage={page}
        pageMax={pageMax}
        pathname={`/users/${findUser.name}/likes`}
        title={`${findUser.displayName}が良いと思った音MAD`}
        noc="このユーザーはまだ何も良いと思った音MADがありません。"
        fragment={findUser.publicLikes.registrationsByOffset}
      />
    </main>
  );
}
