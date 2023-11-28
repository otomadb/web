import clsx from "clsx";
import { notFound } from "next/navigation";

import CommonMadBlock from "~/components/CommonMadBlock";
import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

export default async function Page({
  params,
  searchParams,
}: {
  params: { serial: string };
  searchParams: { page?: string };
}) {
  const result = await makeGraphQLClient().request(
    graphql(`
      query TagPage($serial: Int!) {
        findTagBySerial(serial: $serial) {
          id
          name
          taggedVideos(first: 24) {
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
    { serial: parseInt(params.serial, 10) }
  );
  if (!result.findTagBySerial) notFound();

  const { findTagBySerial } = result;
  return (
    <div>
      <div className={clsx("@container")}>
        <div
          className={clsx(
            "grid w-full grid-cols-1 gap-2 @[384px]:grid-cols-2 @[512px]:grid-cols-3 @[768px]:grid-cols-4 @[1024px]:grid-cols-6"
          )}
        >
          {findTagBySerial.taggedVideos.nodes.map((item) => (
            <CommonMadBlock key={item.id} fragment={item.video} />
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
}
