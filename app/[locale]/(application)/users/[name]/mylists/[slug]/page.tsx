import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import TwitterShareButton from "~/components/TwitterShareButton";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";
import { getScopedI18n } from "~/locales/server";

import MylistRegistrations from "./MylistRegistrations";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { name: string; slug: string };
  searchParams: { page?: string };
}): Promise<Metadata> {
  const t = await getScopedI18n("page.userMylist");
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const result = await makeGraphQLClient().request(
    graphql(`
      query UserMylistPage_Metadata($name: String!, $slug: String!) {
        findUser(input: { name: $name }) {
          name
          displayName
          publicMylist(slug: $slug) {
            slug
            title
          }
        }
      }
    `),
    {
      name: params.name,
      slug: params.slug,
    }
  );

  const { findUser } = result;
  if (!findUser || !findUser.publicMylist) notFound();

  const {
    name: userName,
    displayName,
    publicMylist: { slug: mylistSlug, title: mylistTitle },
  } = findUser;

  return {
    title: t("title", { name: displayName, title: mylistTitle, page }),
    openGraph: {
      url: `https://otomadb.com/users/${userName}/mylists/${mylistSlug}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { name: string; slug: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const PER_PAGE = 36;

  const result = await makeGraphQLClient().request(
    graphql(`
      query UserMylistPage2(
        $name: String!
        $slug: String!
        $offset: Int!
        $take: Int!
      ) {
        findUser(input: { name: $name }) {
          name
          publicMylist(slug: $slug) {
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
      name: params.name,
      slug: params.slug,
      offset: (page - 1) * PER_PAGE,
      take: PER_PAGE,
    }
  );

  const { findUser } = result;
  if (
    !findUser ||
    !findUser.publicMylist ||
    (page !== 1 &&
      findUser.publicMylist.registrationsByOffset.nodes.length === 0)
  )
    notFound();

  const pageMax = Math.ceil(
    findUser.publicMylist.registrationsByOffset.totalCount / PER_PAGE
  );

  return (
    <main>
      <div className={clsx("flex w-full items-center px-4 py-2")}>
        <h1 className={clsx("flex grow text-xl font-bold text-snow-primary")}>
          {findUser.publicMylist.title}
        </h1>
        <div className={clsx("flex h-8 shrink-0 items-center gap-x-2")}>
          {findUser.publicMylist.range && (
            <TwitterShareButton
              size="small"
              payload={{
                url: `https://www.otomadb.com/users/${findUser.name}/mylists/${findUser.publicMylist.slug}`,
                text: findUser.publicMylist.title,
              }}
            />
          )}
        </div>
      </div>
      <MylistRegistrations
        currentPage={page}
        pageMax={pageMax}
        pathname={`/users/${findUser.name}/mylists/${findUser.publicMylist.slug}`}
        title={findUser.publicMylist.title}
        noc="このマイリストにはまだ何も登録されていません"
        fragment={findUser.publicMylist.registrationsByOffset}
      />
    </main>
  );
}
