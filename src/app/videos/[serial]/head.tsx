import { notFound } from "next/navigation";

import { CommonHead } from "~/app/CommonHead";
import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

export default async function Head({ params }: { params: { serial: string } }) {
  const { findVideo: video } = await gqlRequest(
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

  if (!video) return notFound();

  return (
    <>
      <CommonHead />
      <title>{`${video.title} - otomadb`}</title>
      <meta property="og:title" content={video.title} />
      <meta
        property="og:image"
        content={`https://otomadb.com/api/og/video?serial=${video.serial}`}
      />
      <meta
        property="og:url"
        content={`https://otomadb.com/video/${video.serial}`}
      />
      <meta property="twitter:card" content="summary_large_image" />
    </>
  );
}
