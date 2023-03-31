import clsx from "clsx";
import { Suspense } from "react";

import { AllVideosPageLink } from "~/app/videos/Link";

import { RecentVideosList } from "./RecentVIdeosList";

const RecentVideosSection: React.FC = () => {
  return (
    <section
      className={clsx(
        [["px-2"], ["py-2"]],
        ["rounded"],
        ["border", "border-slate-300"]
      )}
    >
      <h2 className={clsx(["text-sm"])}>最近登録された動画</h2>
      <div className={clsx(["mt-2"])}>
        <Suspense fallback={<span>LOADING</span>}>
          {/* @ts-expect-error for Server Component*/}
          <RecentVideosList />
        </Suspense>
      </div>
      <div className={clsx(["mt-2"])}>
        <p className={clsx(["text-sm"])}>
          <AllVideosPageLink>もっと見る</AllVideosPageLink>
        </p>
      </div>
    </section>
  );
};
export default RecentVideosSection;
