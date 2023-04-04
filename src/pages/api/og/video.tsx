// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/alt-text */

import { ImageResponse } from "@vercel/og";
import gqlRequest from "graphql-request";
import { NextApiHandler } from "next";

import { graphql } from "~/gql";
export const config = { runtime: "experimental-edge" };

const img: NextApiHandler = async (req) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { searchParams } = new URL(req.url!);
  const serial = searchParams.get("serial");

  if (!serial)
    return new Response("Video serial not provided", { status: 400 });

  const { findVideo } = await gqlRequest(
    process.env.GRAPHQL_API_ENDPOINT,
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

  if (!findVideo) return new Response("Video not found", { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
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
            objectFit: "cover",
          }}
          src={findVideo.thumbnailUrl}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            padding: "16px 32px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            background: "linear-gradient(to top, #000000ff, #00000000)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#FFFFFFbb",
              fontFamily: "Inconsolata",
            }}
          >
            <span>otomadb.com/videos/{findVideo.serial}</span>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              fontSize: 36,
              fontWeight: 700,
              color: "#FFFFFFdd",
            }}
          >
            <span lang="ja-JP">{findVideo.title}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 960,
      height: 540,
    }
  );
};
export default img;
