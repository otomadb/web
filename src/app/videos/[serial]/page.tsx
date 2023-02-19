import clsx from "clsx";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { NicovideoSourcesSection } from "~/components/pages/Video/NicovideoSourcesSection.server";
import { SimilarVideosSection } from "~/components/pages/Video/SimilarVideosSection.server";
import { graphql } from "~/gql";
import { fetchGql } from "~/utils/fetchGql";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { serial: string } }) {
  const { findVideo: video } = await fetchGql(
    graphql(`
      query VideoPage($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          id
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!video) return notFound();

  return (
    <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
      <Suspense>
        {/* @ts-expect-error Server Component*/}
        <NicovideoSourcesSection videoId={video.id} />
      </Suspense>
      <Suspense>
        {/* @ts-expect-error Server Component*/}
        <SimilarVideosSection videoId={video.id} />
      </Suspense>
    </div>
  );
}
