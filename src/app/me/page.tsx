import clsx from "clsx";

import RecentLikes from "./RecentLikes";
import Timeline from "./Timeline";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main
      className={clsx([
        "mx-auto w-full max-w-screen-2xl px-8 py-4 @container/main",
      ])}
    >
      <div
        className={clsx(["flex", ["flex-col @w320/main:flex-row"], "gap-4"])}
      >
        <Timeline
          className={clsx([
            "@w320/main:order-0 order-1 w-full grow @w320/main:w-[1024px]",
          ])}
        />
        <div
          className={clsx([
            "order-0 flex shrink-0 flex-col @w320/main:order-1 @w320/main:w-128",
          ])}
        >
          <RecentLikes />
        </div>
      </div>
    </main>
  );
}
