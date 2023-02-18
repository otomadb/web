import { notFound } from "next/navigation";
import { Suspense } from "react";

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
    <>
      <Suspense>
        {/* @ts-expect-error Server Component*/}
        <SimilarVideosSection videoId={video.id} />
      </Suspense>
    </>
  );
}
