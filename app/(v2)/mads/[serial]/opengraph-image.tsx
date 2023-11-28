import { ImageResponse } from "next/og";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";
import { loadGoogleFont } from "~/utils/loadGoogleFonts";

export const size = {
  width: 960,
  height: 540,
};
export const contentType = "image/png";
export const revalidate = 86400;

export default async function og({ params }: { params: { serial: string } }) {
  const result = await makeGraphQLClient()
    .request(
      graphql(`
        query MadPage_OGImage($serial: Int!) {
          findMadBySerial(serial: $serial) {
            title
            serial
            thumbnailUrl
          }
        }
      `),
      { serial: parseInt(params.serial, 10) }
    )
    .then((data) => data.findMadBySerial);

  if (!result) return new Response("Video not found", { status: 404 });

  const { title, serial, thumbnailUrl } = result;
  const urltext = `otomadb.com/mads/${serial}`;

  const notoserif = await loadGoogleFont({
    family: "Noto Serif JP",
    weight: 700,
    text: title,
  });
  const spacemono = await loadGoogleFont({
    family: "Space Mono",
    weight: 400,
    text: urltext,
  });

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
          src={thumbnailUrl}
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
            background: "linear-gradient(to top, #000000cc, #00000000)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#F0F0F0",
              fontFamily: "Space Mono",
            }}
          >
            <span>otomadb.com/videos/{serial}</span>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              fontFamily: "Noto Serif JP",
              fontSize: 36,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            <span lang="ja-JP">{title}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Serif JP",
          data: notoserif,
          style: "normal",
          weight: 700,
        },
        {
          name: "Space Mono",
          data: spacemono,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
