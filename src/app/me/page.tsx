import clsx from "clsx";

import { YouLikesPageLink } from "./likes/Link";
import RecentLikes from "./RecentLikes";
import Timeline from "./Timeline";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main
      className={clsx(
        ["w-full", "max-w-screen-2xl"],
        ["mx-auto"],
        ["px-8"],
        ["py-4"],
        ["@container/main"]
      )}
    >
      <div
        className={clsx([
          "flex",
          ["flex-col", "@screen-xl/main:flex-row"],
          "gap-x-4",
          "gap-y-4",
        ])}
      >
        <Timeline
          className={clsx(
            ["flex-grow", "@screen-xl/main:flex-grow-0"],
            ["order-1", "@screen-xl/main:order-0"],
            ["w-full", "@screen-xl/main:w-[1024px]"]
          )}
        />
        <div
          className={clsx(
            ["flex-shrink-0"],
            ["order-0", "@screen-xl/main:order-1"],
            ["flex", "flex-col"]
          )}
        >
          <section className={clsx(["w-full"])}>
            <div className={clsx(["flex", "items-center"], ["pr-4"])}>
              <h2
                className={clsx(["flex-grow"], ["text-md"], ["text-slate-900"])}
              >
                いいねした動画
              </h2>
              <YouLikesPageLink
                className={clsx(["text-xs"], ["text-slate-600"])}
              >
                もっと見る
              </YouLikesPageLink>
            </div>
            <RecentLikes className={clsx(["mt-2"])} />
          </section>
        </div>
      </div>
    </main>
  );
}
