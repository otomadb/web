import "server-only";

import clsx from "clsx";

import { VideoPage_HistorySectionDocument } from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

import { SectionInner } from "./SectionInner";

export async function HistorySection({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) {
  const fallback = await gqlRequest(VideoPage_HistorySectionDocument, {
    id: videoId,
  });
  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>動画情報の変移</h2>
      <SectionInner
        className={clsx(["mt-2"])}
        videoId={videoId}
        fallback={fallback}
      />
    </section>
  );
}
