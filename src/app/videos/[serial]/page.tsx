import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { NicovideoSourcesSection } from "~/components/pages/Video/NicovideoSourcesSection.server";
import { SimilarVideosSection } from "~/components/pages/Video/SimilarVideosSection.server";
import { graphql } from "~/gql";
import { fetchGql } from "~/utils/fetchGql";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { serial: string };
}): Promise<Metadata> {
  const { findVideo } = await fetchGql(
    graphql(`
      query VideoPage_Title($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          title
          serial
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!findVideo) return notFound(); // TODO: これ本当にこれでいいの？

  return {
    title: findVideo.title,
    openGraph: {
      images: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og/video?serial=${findVideo.serial}`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

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
