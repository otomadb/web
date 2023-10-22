import clsx from "clsx";

import { YouLikesPageLink } from "./likes/Link";
import RecentLikes from "./RecentLikes";
import Timeline from "./Timeline";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main
      className={clsx(
        ["py-4"],
        ["container", "max-w-screen-2xl", "mx-auto"],
        ["flex", "gap-x-4"]
      )}
    >
      <div className={clsx(["flex-grow"])}>
        <Timeline />
      </div>
      <div className={clsx(["flex-shrink-0"], ["w-128"])}>
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
    </main>
  );
}
