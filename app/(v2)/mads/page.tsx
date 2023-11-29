import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import CommonMadBlock from "~/components/CommonMadBlock";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import {
  AbstractPagenation,
  AbstractPaginateLink,
} from "../tags/[serial]/Pagination";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { page?: string };
}): Promise<Metadata> {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  return {
    title: `登録されている音MAD(${page}ページ目) | OtoMADB`,
    openGraph: {
      title: `登録されている音MAD(${page}ページ目) | OtoMADB`,
      url: `https://otomadb.com/mads${page === 1 ? "" : `?page=${page}`}`,
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const result = await makeGraphQLClient().request(
    graphql(`
      query MadsPage($offset: Int!) {
        findMadsByOffset(input: { offset: $offset, take: 24 }) {
          nodes {
            id
            ...CommonMadBlock
          }
          totalCount
        }
      }
    `),
    { offset: (page - 1) * 24 }
  );
  if (!result.findMadsByOffset) notFound();
  if (result.findMadsByOffset.nodes.length === 0) notFound();

  const { findMadsByOffset } = result;
  const pageMax = Math.ceil(findMadsByOffset.totalCount / 24);

  return (
    <main
      className={clsx(
        "mx-auto flex max-w-screen-2xl flex-col gap-y-4 px-8 py-4 @container/page"
      )}
    >
      <div className={clsx("flex w-full items-center px-4 py-2")}>
        <div className="shrink-0 grow">
          <h1 className="text-xl font-bold text-snow-primary">
            登録されている音MAD一覧
          </h1>
        </div>
        <AbstractPagenation
          size="sm"
          className={clsx()}
          pageMax={pageMax}
          currentPage={page}
          PaginateLink={(props) => (
            <AbstractPaginateLink {...props} pathname="/mads" />
          )}
        />
      </div>
      <div
        className={clsx(
          "grid w-full grid-cols-1 gap-2 @[384px]:grid-cols-2 @[512px]:grid-cols-3 @[768px]:grid-cols-4 @[1024px]:grid-cols-6"
        )}
      >
        {findMadsByOffset.nodes.map((node) => (
          <CommonMadBlock key={node.id} fragment={node} />
        ))}
      </div>
      <div className={clsx("flex w-full justify-end px-4 py-2")}>
        <AbstractPagenation
          size="sm"
          pageMax={pageMax}
          currentPage={page}
          PaginateLink={(props) => (
            <AbstractPaginateLink {...props} pathname="/mads" />
          )}
        />
      </div>
    </main>
  );
}
