import { notFound } from "next/navigation";

import { CommonHead } from "~/app/CommonHead";
import { graphql } from "~/gql";
import { fetchGql } from "~/utils/fetchGql";

export default async function Head({ params }: { params: { serial: string } }) {
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

  if (!findVideo) return notFound();

  return (
    <>
      <CommonHead />
      <title>{`${findVideo.title} - otomadb`}</title>
      <meta property="og:title" content={findVideo.title} />
      <meta
        property="og:image"
        content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og/video?serial=${findVideo.serial}`}
      />
      <meta
        property="og:url"
        content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/video/${findVideo.serial}`}
      />
      <meta property="twitter:card" content="summary_large_image" />
    </>
  );
}
