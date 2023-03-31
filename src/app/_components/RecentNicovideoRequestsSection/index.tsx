import clsx from "clsx";
import { Suspense } from "react";

import { AllNicovideoRequestsPageLink } from "~/app/requests/nicovideo/Link";

import RequestsList from "./RequestsList";

const RecentNicovideoRequestsSection: React.FC = () => {
  return (
    <section
      className={clsx(
        [["px-2"], ["py-2"]],
        ["rounded"],
        ["border", "border-slate-300"]
      )}
    >
      <h2 className={clsx(["text-sm"])}>
        最近リクエストされたニコニコ動画の動画
      </h2>
      <div className={clsx(["mt-2"])}>
        <Suspense fallback={<span>LOADING</span>}>
          {/* @ts-expect-error for Server Component*/}
          <RequestsList />
        </Suspense>
      </div>
      <div className={clsx(["mt-2"])}>
        <p className={clsx(["text-sm"])}>
          <AllNicovideoRequestsPageLink>
            もっと見る
          </AllNicovideoRequestsPageLink>
        </p>
      </div>
    </section>
  );
};
export default RecentNicovideoRequestsSection;
