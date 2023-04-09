import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql3 } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { SimilarVideos } from "./SimilarVideos.server";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { serial: string };
}): Promise<Metadata> {
  const result = await fetchGql3(
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

  if (isErr(result)) {
    switch (result.error.type) {
      case "FETCH_ERROR":
        throw new Error("Fetching error");
      case "GRAPHQL_ERROR":
        throw new Error("GraphQL Error");
    }
  }

  if (!result.data.findVideo) notFound();
  const { findVideo } = result.data;

  return {
    title: `${findVideo.title} | OtoMADB`,
    openGraph: {
      type: "website",
      siteName: "OtoMADB",
      url: `https://otomadb.com/videos/${findVideo.serial}`,
      title: `${findVideo.title} | OtoMADB`,
      images: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og/video?serial=${findVideo.serial}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${findVideo.title} | OtoMADB`,
      images: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og/video?serial=${findVideo.serial}`,
      site: "@SnO2WMaN",
    },
  };
}

export default async function Page({ params }: { params: { serial: string } }) {
  const result = await fetchGql3(
    graphql(`
      query VideoPage($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          id
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (isErr(result)) {
    switch (result.error.type) {
      case "FETCH_ERROR":
        throw new Error("Fetching error");
      case "GRAPHQL_ERROR":
        throw new Error("GraphQL Error");
    }
  }

  if (!result.data.findVideo) notFound();

  return (
    <div className={clsx(["flex", "flex-col", "gap-y-4"])}>
      <section>
        <h2 className={clsx(["text-md"], ["text-slate-900"])}>似ている動画</h2>
        <div className={clsx(["mt-2"])}>
          <Suspense>
            <SimilarVideos videoId={result.data.findVideo.id} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
