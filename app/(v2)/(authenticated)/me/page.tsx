import clsx from "clsx";

import RecentLikes from "./RecentLikes";
import Timeline from "./Timeline";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main
      className={clsx("mx-auto max-w-screen-2xl px-8 py-4 @container/page")}
    >
      <div className={clsx("flex flex-col gap-4 @[1280px]/page:flex-row")}>
        <Timeline
          className={clsx(
            "order-2 w-full grow @[1280px]/page:order-1 @[1280px]/page:w-auto"
          )}
        />
        <div
          className={clsx(
            "order-1 flex w-full shrink-0 flex-col @[1280px]/page:order-2 @[1280px]/page:w-128"
          )}
        >
          <RecentLikes />
        </div>
      </div>
    </main>
  );
}
