import clsx from "clsx";
import { notFound } from "next/navigation";

import CommonMadBlock from "~/components/CommonMadBlock";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

import { Pagenation } from "./Pagination";

export default async function Page({
  params,
  searchParams,
}: {
  params: { serial: string };
  searchParams: { page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1) notFound();

  const result = await makeGraphQLClient().request(
    graphql(`
      query TagPage($serial: Int!, $offset: Int!) {
        findTagBySerial(serial: $serial) {
          ...TagPage_Pagination
          id
          name
          taggedVideosByOffset(input: { offset: $offset, take: 24 }) {
            hasMore
            totalCount
            nodes {
              id
              video {
                ...CommonMadBlock
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
  if (result.findTagBySerial.taggedVideosByOffset.nodes.length === 0)
    notFound();

  const { findTagBySerial } = result;
  const pageMax = Math.ceil(
    findTagBySerial.taggedVideosByOffset.totalCount / 24
  );

  return (
    <div>
      <div className={clsx("@container")}>
        <div
          className={clsx(
            "grid w-full grid-cols-1 gap-2 @[384px]:grid-cols-2 @[512px]:grid-cols-3 @[768px]:grid-cols-4 @[1024px]:grid-cols-6"
          )}
        >
          {findTagBySerial.taggedVideosByOffset.nodes.map((item) => (
            <CommonMadBlock key={item.id} fragment={item.video} />
          ))}
        </div>
      </div>
      <Pagenation
        pageMax={pageMax}
        currentPage={page}
        fragment={result.findTagBySerial}
      />
    </div>
  );
}
