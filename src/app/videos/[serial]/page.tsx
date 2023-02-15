import { notFound } from "next/navigation";
import { Suspense } from "react";

import { SimilarVideosSection } from "~/components/pages/Video/SimilarVideosSection.server";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 0;

export async function generateStaticParams() {
  const { findVideos } = await gqlRequest(
    graphql(`
      query VideoPage_Paths {
        findVideos(input: { limit: 96, order: { updatedAt: DESC } }) {
          nodes {
            id
            serial
          }
        }
      }
    `)
  );
  return findVideos.nodes.map(({ serial }) => ({
    serial: serial.toString(),
  }));
}

export default async function Page({ params }: { params: { serial: string } }) {
  const { findVideo: video } = await gqlRequest(
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
