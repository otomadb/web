"use client";

import clsx from "clsx";

import RecentLikes from "./RecentLikes";
import Timeline from "./Timeline";

export default function Page() {
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
          ["flex-col", "@w320/main:flex-row"],
          "gap-x-4",
          "gap-y-4",
        ])}
      >
        <Timeline
          className={clsx(
            "order-2 w-full grow @w320/main:order-1 @w320/main:w-[1024px]"
          )}
        />
        <div
          className={clsx(
            "order-1 flex shrink-0 flex-col @w320/main:order-2 @w320/main:w-128"
          )}
        >
          <RecentLikes />
        </div>
      </div>
    </main>
  );
}
