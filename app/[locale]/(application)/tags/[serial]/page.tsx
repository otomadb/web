import clsx from "clsx";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import CommonMadBlock from "~/components/CommonMadBlock";
import Paginator from "~/components/Paginator";
import { graphql } from "~/gql";
import { makeGraphQLClient, makeGraphQLClient2 } from "~/gql/fetch";
import { getScopedI18n } from "~/locales/server";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { serial: string };
  searchParams: { page?: string };
}): Promise<Metadata> {
  const t = await getScopedI18n("page.tag");

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const result = await makeGraphQLClient().request(
    graphql(`
      query TagPage_Metadata($serial: Int!) {
        findTagBySerial(serial: $serial) {
          name
          serial
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  const { findTagBySerial } = result;
  if (!findTagBySerial) notFound();

  const { name, serial } = findTagBySerial;

  return {
    title: t("title", { name, page }),
    openGraph: {
      url: `https://otomadb.com/tags/${serial}`,
    },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { serial: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const result = await (
    await makeGraphQLClient2({ auth: "optional" })
  ).request(
    graphql(`
      query TagPage($serial: Int!, $offset: Int!) {
        findTagBySerial(serial: $serial) {
          id
          name
          serial
          taggedVideosByOffset(input: { offset: $offset, take: 24 }) {
            hasMore
            totalCount
            nodes {
              id
              video {
                ...CommonMadBlock
                ...CommonMadBlock_LikeSwitch
              }
            }
          }
        }
      }
    `),
    {
      serial: parseInt(params.serial, 10),
      offset: (page - 1) * 24,
    }
  );
  if (!result.findTagBySerial) notFound();

  const { findTagBySerial } = result;

  if (1 < page && findTagBySerial.taggedVideosByOffset.nodes.length === 0)
    redirect(`/tags/${findTagBySerial.serial}`);

  const pageMax = Math.ceil(
    findTagBySerial.taggedVideosByOffset.totalCount / 24
  );

  return (
    <main className={clsx("w-full @container/page")}>
      {0 === findTagBySerial.taggedVideosByOffset.totalCount && (
        <>
          <p className={clsx("font-bold text-snow-darker")}>
            このタグが付けられた音MADが存在しません
          </p>
        </>
      )}
      {0 < findTagBySerial.taggedVideosByOffset.totalCount && (
        <>
          <div className={clsx("flex")}>
            <Paginator
              pageMax={pageMax}
              currentPage={page}
              size="sm"
              pathname={`/tags/${findTagBySerial.serial}`}
            />
          </div>
          <div
            className={clsx(
              "grid w-full grid-cols-1 gap-2 py-2",
              "@[384px]/page:grid-cols-2 @[512px]/page:grid-cols-3 @[768px]/page:grid-cols-4 @[1024px]/page:grid-cols-6 @[1564px]/page:grid-cols-8"
            )}
          >
            {findTagBySerial.taggedVideosByOffset.nodes.map((item) => (
              <CommonMadBlock
                key={item.id}
                fragment={item.video}
                likeable={item.video}
              />
            ))}
          </div>
          <div className={clsx("flex")}>
            <Paginator
              pageMax={pageMax}
              currentPage={page}
              size="sm"
              pathname={`/tags/${findTagBySerial.serial}`}
            />
          </div>
        </>
      )}
    </main>
  );
}
