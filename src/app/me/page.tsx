import clsx from "clsx";
import { Suspense } from "react";

import { AllVideosPageLink } from "~/app/mads/Link";
import { AllNicovideoRequestsPageLink } from "~/app/requests/nicovideo/Link";
import AllYoutubeRequestLink from "~/app/requests/youtube/Link";

import { YouLikesPageLink } from "./likes/Link";
import RecentLikes from "./RecentLikes";
import RecentVideos from "./RecentVideos.server";
import {
  NicovideoRequestsList,
  YoutubeRequestsList,
} from "./RequestsList.server";

export const dynamic = "force-dynamic";

export default async function Page() {
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
              <RecentVideos />
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
          <NicovideoRequestsList className={clsx(["mt-2"])} />
        </section>
        <section className={clsx()}>
          <div className={clsx(["flex", "items-center"], ["px-2"])}>
            <h2
              className={clsx(["flex-grow"], ["text-lg"], ["text-slate-900"])}
            >
              最近のYoutubeの動画リクエスト
            </h2>
            <AllYoutubeRequestLink
              className={clsx(
                ["block"],
                ["ml-auto"],
                ["text-sm", "font-semibold", "text-slate-700"]
              )}
            >
              もっと見る
            </AllYoutubeRequestLink>
          </div>
          <YoutubeRequestsList className={clsx(["mt-2"])} />
        </section>
      </div>
    </main>
  );
}
