import "server-only";

import clsx from "clsx";

import { SearchContents } from "~/components/common/SearchContents/SearchContents";

import RecentNicovideoRequestsSection from "./_components/RecentNicovideoRequestsSection";
import RecentVideosSection from "./_components/RecentVideosSection";

export default async function Page() {
  return (
    <main
      className={clsx(
        ["container", "max-w-screen-2xl"],
        ["mx-auto"],
        ["flex", "flex-col", "gap-y-8"]
      )}
    >
      <section
        className={clsx(
          [["px-2"], ["py-2"]],
          ["rounded"],
          ["border", "border-slate-300"]
        )}
      >
        <h2 className={clsx(["text-sm"])}>検索</h2>
        <div className={clsx(["mt-2"])}>
          <SearchContents />
        </div>
      </section>
      <RecentVideosSection />
      <RecentNicovideoRequestsSection />
    </main>
  );
}
