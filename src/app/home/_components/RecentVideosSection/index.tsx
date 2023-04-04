import clsx from "clsx";
import { Suspense } from "react";

import { AllVideosPageLink } from "~/app/videos/Link";

import RecentVideoListSC from "./VideoList.server";

const RecentVideosSection: React.FC = () => {
  return (
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
        <Suspense fallback={<span>LOADING</span>}>
          {/* @ts-expect-error for Server Component*/}
          <RecentVideoListSC />
        </Suspense>
      </div>
    </section>
  );
};
export default RecentVideosSection;
