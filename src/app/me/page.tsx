"use client";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import clsx from "clsx";
import { Suspense } from "react";

import { graphql } from "~/gql";

import { AllNicovideoRequestsPageLink } from "../requests/nicovideo/Link";
import { AllVideosPageLink } from "../videos/Link";
import { YouLikesPageLink } from "./likes/Link";
import RecentLikes from "./RecentLikes";
import RequestsListSC from "./RequestsList.server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const result = useSuspenseQuery(
    graphql(`
      query MyTopPage {
        findVideos(first: 18) {
          nodes {
            id
            ...CommonVideoContainer
          }
        }
      }
    `)
  );

  return (
    <main
      className={clsx(
        ["py-4"],
        ["container", "max-w-screen-2xl", "mx-auto"],
        ["flex"]
      )}
    >
      <div className={clsx(["flex-shrink-0"], ["w-96"])}>
        <section></section>
        <section>
          <div className={clsx(["flex", "items-center"], ["pr-4"])}>
            <h2
              className={clsx(["flex-grow"], ["text-md"], ["text-slate-900"])}
            >
              いいねした動画
            </h2>
            <YouLikesPageLink className={clsx(["text-xs"], ["text-slate-600"])}>
              もっと見る
            </YouLikesPageLink>
          </div>
          <RecentLikes className={clsx(["mt-2"])} />
        </section>
      </div>
      <div
        className={clsx(
          ["flex-grow"],
          ["flex", "flex-col", "gap-y-8"],
          ["px-4"]
        )}
      >
        <section className={clsx()}>
          <div className={clsx(["flex", "items-center"], ["px-2"])}>
            <h2
              className={clsx(["flex-grow"], ["text-lg"], ["text-slate-900"])}
            >
              最近登録された動画
            </h2>
            <div className={clsx(["flex-shrink-0"])}>
              <AllVideosPageLink
                className={clsx(["text-sm", "font-semibold", "text-slate-700"])}
              >
                もっと見る
              </AllVideosPageLink>
            </div>
          </div>
          <div className={clsx(["mt-2"])}>
            <Suspense fallback={<p>動画を取得中です</p>}>
              {/* <RecentVideos /> */}
            </Suspense>
          </div>
        </section>
        <section className={clsx()}>
          <div className={clsx(["flex", "items-center"], ["px-2"])}>
            <h2
              className={clsx(["flex-grow"], ["text-lg"], ["text-slate-900"])}
            >
              最近のニコニコ動画の動画リクエスト
            </h2>
            <div className={clsx(["flex-shrink-0"])}>
              <AllNicovideoRequestsPageLink
                className={clsx(["text-sm", "font-semibold", "text-slate-700"])}
              >
                もっと見る
              </AllNicovideoRequestsPageLink>
            </div>
          </div>
          <div className={clsx(["mt-2"])}>
            <Suspense fallback={<span>リクエストを取得中です</span>}>
              {/* @ts-expect-error RSC*/}
              <RequestsListSC />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
