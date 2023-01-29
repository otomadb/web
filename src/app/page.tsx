import "server-only";

import clsx from "clsx";
import { Suspense } from "react";

import { ServerSideVideosList } from "~/components/common/VideoList.server";
import { graphql } from "~/gql";
import { gqlclient } from "~/utils/gqlRequest";

export const revalidate = 0;

export default async function Page() {
  const promiseRecentVideos = gqlclient
    .request(
      graphql(`
        query TopPage_RecentRegisteredVideos {
          findVideos(input: { limit: 24, order: { createdAt: DESC } }) {
            nodes {
              ...VideoList_Video
            }
          }
        }
      `)
    )
    .then((v) => v.findVideos.nodes);

  return (
    <>
      <section>
        <h2 className={clsx(["text-xl"])}>最近登録された動画</h2>
        <Suspense fallback={<span>LOADING</span>}>
          {/* @ts-expect-error for Server Component*/}
          <ServerSideVideosList
            className={clsx(["mt-4"])}
            videosPromise={promiseRecentVideos}
          />
        </Suspense>
      </section>
    </>
  );
}
