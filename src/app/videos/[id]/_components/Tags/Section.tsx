import "server-only";

import clsx from "clsx";

import { VideoPage_TagsSectionDocument } from "~/gql/graphql";
import { createGqlClient } from "~/utils/createGqlClient";

import { SectionInner } from "./SectionInner";

export async function TagsSection({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) {
  const fallback = await createGqlClient().request(
    VideoPage_TagsSectionDocument,
    { id: videoId }
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>タグ</h2>
      <SectionInner
        className={clsx(["mt-2"])}
        videoId={videoId}
        fallback={fallback}
      />
    </section>
  );
}
