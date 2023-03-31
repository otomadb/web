import clsx from "clsx";
import { Suspense } from "react";

import { AllNicovideoRequestsPageLink } from "~/app/requests/nicovideo/Link";

import RequestsList from "./RequestsList";

const RecentNicovideoRequestsSection: React.FC = () => {
  return (
    <section className={clsx()}>
      <div className={clsx(["flex", "items-center"], ["px-2"])}>
        <h2 className={clsx(["flex-grow"], ["text-lg"], ["text-slate-900"])}>
          最近のニコニコ動画の動画リクエスト
        </h2>
        <div className={clsx(["flex-shrink-0"])}>
          <AllNicovideoRequestsPageLink
            className={clsx(["text-sm", "font-semibold", "text-slate-700"])}
          >
            もっと見る
          </AllNicovideoRequestsPageLink>
        </div>
      </div>
      <div className={clsx(["mt-2"])}>
        <Suspense fallback={<span>LOADING</span>}>
          {/* @ts-expect-error for Server Component*/}
          <RequestsList />
        </Suspense>
      </div>
    </section>
  );
};
export default RecentNicovideoRequestsSection;
