import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import CommonMadBlock from "~/components/CommonMadBlock";
import Paginator from "~/components/Paginator";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";
import { getScopedI18n } from "~/locales/server";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const t = await getScopedI18n("page.mads");
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return {
    title: t("title", { page }),
    openGraph: {
      url: `https://otomadb.com/mads${page === 1 ? "" : `?page=${page}`}`,
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const PER_PAGE = 48;

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const result = await (
    await makeGraphQLClient2({ auth: "optional" })
  ).request(
    graphql(`
      query MadsPage($offset: Int!, $take: Int!) {
        findMadsByOffset(input: { offset: $offset, take: $take }) {
          nodes {
            id
            ...CommonMadBlock
            ...CommonMadBlock_LikeSwitch
          }
          totalCount
        }
      }
    `),
    {
      take: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
    }
  );
  if (!result.findMadsByOffset) notFound();
  if (result.findMadsByOffset.nodes.length === 0) notFound();

  const { findMadsByOffset } = result;
  const pageMax = Math.ceil(findMadsByOffset.totalCount / PER_PAGE);

  return (
    <main
      className={clsx(
        "mx-auto flex flex-col gap-y-4 px-8 py-4 @container/page"
      )}
    >
      <div
        className={clsx(
          "mx-auto flex w-full max-w-screen-2xl items-center px-4 py-2"
        )}
      >
        <div className="shrink-0 grow">
          <h1 className="text-xl font-bold text-snow-primary">
            登録されている音MAD一覧
          </h1>
        </div>
        <Paginator
          size="sm"
          className={clsx()}
          pageMax={pageMax}
          currentPage={page}
          pathname="/mads"
        />
      </div>
      <div
        className={clsx(
          "grid w-full grid-cols-1 gap-2",
          " @[384px]:grid-cols-2 @[512px]:grid-cols-3 @[768px]:grid-cols-4 @[1024px]:grid-cols-6 @[1536px]:grid-cols-8"
        )}
      >
        {findMadsByOffset.nodes.map((node) => (
          <CommonMadBlock key={node.id} fragment={node} likeable={node} />
        ))}
      </div>
      <div
        className={clsx(
          "mx-auto flex w-full max-w-screen-2xl justify-end px-4 py-2"
        )}
      >
        <Paginator
          size="sm"
          pageMax={pageMax}
          currentPage={page}
          pathname="/mads"
        />
      </div>
    </main>
  );
}
