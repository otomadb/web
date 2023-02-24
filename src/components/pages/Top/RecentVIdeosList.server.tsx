import "server-only";

import clsx from "clsx";

import { ServerSideVideosList } from "~/components/common/VideoList.server";
import { graphql } from "~/gql";
import { fetchGql } from "~/utils/fetchGql";

export async function RecentVideosList({ className }: { className: string }) {
  const promiseRecentVideos = fetchGql(
    graphql(`
      query TopPage_RecentRegisteredVideos {
        findVideos(input: { limit: 24, order: { createdAt: DESC } }) {
          nodes {
            ...VideoList_Video
          }
        }
      }
    `),
    {},
    { next: { revalidate: 0 } }
  ).then((v) => v.findVideos.nodes);

  return (
    <div>
      {/* @ts-expect-error for Server Component*/}
      <ServerSideVideosList
        className={clsx(className)}
        videosPromise={promiseRecentVideos}
      />
    </div>
  );
}
