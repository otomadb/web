import { ImageResponse } from "@vercel/og";
import { NextApiHandler } from "next";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

export const config = { runtime: "experimental-edge" };

const img: NextApiHandler = async (req) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { searchParams } = new URL(req.url!);
  const serial = searchParams.get("serial");

  if (!serial)
    return new Response("Video serial not provided", { status: 400 });

  const { findVideo: video } = await fetchGql(
    graphql(`
      query OGImage_Video($serial: Int!) {
        findVideo(input: { serial: $serial }) {
          title
          serial
          thumbnailUrl
        }
      }
    `),
    { serial: parseInt(serial, 10) }
  );

  if (!video) return new Response("Video not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "hsl(187,15%,92%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "75%",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt={video.title}
            src={video.thumbnailUrl}
          />
        </div>
        <div
          style={{
            padding: "8px 24px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "hsl(187,25%,92%)",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              fontSize: 24,
              fontFamily: "monospace",
              color: "hsl(187,12%,50%)",
            }}
          >
            /videos/{video.serial}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              fontSize: 36,
              fontWeight: 700,
              color: "hsl(187,12%,25%)",
            }}
          >
            {video.title}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            display: "flex",
            fontSize: 24,
            color: "hsl(187,12%,50%)",
          }}
        >
          otomadb.com
        </div>
      </div>
    ),
    {
      width: 960,
      height: 640,
    }
  );
};
export default img;
