import { GraphQLClient } from "graphql-request";
import { ImageResponse, NextRequest } from "next/server";

import { graphql } from "~/gql";

export const revalidate = 86400;

export async function GET(
  request: NextRequest,
  { params }: { params: { serial: string } }
) {
  const result = await new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT, {
    fetch,
  }).request(
    graphql(`
      query ThumbnailsAPI($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          thumbnailUrl
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  const { findVideo } = result;
  if (!findVideo) return new Response("Video not found", { status: 404 });

  const { thumbnailUrl } = findVideo;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <img
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            filter: "blur(32px)",
          }}
          src={thumbnailUrl}
        />
        <img
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            margin: "auto",
            objectFit: "contain",
          }}
          src={thumbnailUrl}
        />
      </div>
    ),
    { width: 800, height: 450 }
  );
}
