import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { SimilarVideos } from "./SimilarVideos.server";

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
      <section>
        <h2 className={clsx(["text-md"], ["text-slate-900"])}>似ている動画</h2>
        <div className={clsx(["mt-2"])}>
          <Suspense>
            <SimilarVideos videoId={video.id} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
