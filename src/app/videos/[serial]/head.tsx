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
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!video) return notFound();

  return (
    <>
      <CommonHead />
      <title>{`${video.title} - 動画 - Otomad Database`}</title>
    </>
  );
}
