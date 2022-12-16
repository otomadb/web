import "server-only";

import clsx from "clsx";

import { VideoPage_SimilarVideosSectionDocument } from "~/gql/graphql";
import { createGqlClient } from "~/utils/createGqlClient";

import { SectionInner } from "./SectionInner";

export async function SimilarVideosSection({
  videoId,
  className,
}: {
  className?: string;
  videoId: string;
}) {
  const fallback = await createGqlClient().request(
    VideoPage_SimilarVideosSectionDocument,
    { id: videoId }
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>似ている動画</h2>
      <SectionInner
        videoId={videoId}
        className={clsx(["mt-2"])}
        fallback={fallback}
      />
    </section>
  );
}
