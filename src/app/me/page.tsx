import clsx from "clsx";
import { Suspense } from "react";

import { AllNicovideoRequestsPageLink } from "../requests/nicovideo/Link";
import { AllVideosPageLink } from "../videos/Link";
import RecentVideos from "./RecentVideos.server";
import RequestsListSC from "./RequestsList.server";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main
      className={clsx(
        ["container", "max-w-screen-2xl"],
        ["mx-auto"],
        ["flex", "flex-col", "gap-y-8"],
        ["py-12"]
      )}
    >
      <section className={clsx()}>
        <div className={clsx(["flex", "items-center"], ["px-2"])}>
          <h2 className={clsx(["flex-grow"], ["text-lg"], ["text-slate-900"])}>
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
            {/* @ts-expect-error RSC*/}
            <RecentVideos />
          </Suspense>
        </div>
      </section>
      <section className={clsx()}>
        <div className={clsx(["flex", "items-center"], ["px-2"])}>
          <h2 className={clsx(["flex-grow"], ["text-lg"], ["text-slate-900"])}>
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
          <Suspense fallback={<span>LOADING</span>}>
            {/* @ts-expect-error RSC*/}
            <RequestsListSC />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
