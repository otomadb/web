import "server-only";

import clsx from "clsx";
import { Suspense } from "react";

import { NicovideoRequestsList } from "~/components/pages/Top/NicovideoRequestsList.server";
import { RecentVideosList } from "~/components/pages/Top/RecentVIdeosList.server";

export default async function Page() {
  return (
    <div
      className={clsx([
        "grid",
        ["grid-cols-1", "lg:grid-cols-2", "2xl:grid-cols-3"],
        ["gap-x-4"],
        ["gap-y-4"],
      ])}
    >
      <div className={clsx(["col-span-full"])}>
        <section
          className={clsx(
            [["px-4"], ["py-4"]],
            ["rounded"],
            ["border", "border-slate-300"]
          )}
        >
          <h2>最近登録された動画</h2>
          <div className={clsx(["mt-2"])}>
            <Suspense fallback={<span>LOADING</span>}>
              {/* @ts-expect-error for Server Component*/}
              <RecentVideosList />
            </Suspense>
          </div>
        </section>
      </div>
      <div className={clsx(["col-span-1"])}>
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
    </div>
  );
}
