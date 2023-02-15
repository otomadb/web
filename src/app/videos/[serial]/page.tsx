import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { gqlRequest } from "~/utils/gqlRequest";

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
      <p>Wow!</p>
    </>
  );
}
