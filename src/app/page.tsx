import "server-only";

import clsx from "clsx";
import { Suspense } from "react";

import { ServerSideVideosList } from "~/components/common/VideoList.server";
import { NicovideoRequestsList } from "~/components/pages/Top/NicovideoRequestsList.server";
import { graphql } from "~/gql";
import { fetchGql } from "~/utils/fetchGql";

export default async function Page() {
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
      <div className={clsx(["grid", ["grid-cols-1", "lg:grid-cols-2"]])}>
        <section
          className={clsx(
            [["px-4"], ["py-4"]],
            ["rounded"],
            ["border", "border-slate-300"]
          )}
        >
          <h2>最近リクエストされたニコニコ動画の動画</h2>
          <div className={clsx(["mt-2"])}>
            <Suspense fallback={<span>LOADING</span>}>
              {/* @ts-expect-error for Server Component*/}
              <NicovideoRequestsList />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
