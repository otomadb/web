import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";
import { loadGoogleFont } from "~/utils/loadGoogleFonts";

export const size = {
  width: 960,
  height: 540,
};
export const contentType = "image/png";
export const revalidate = 3600;

export default async function og({
  params,
}: {
  params: { name: string; slug: string };
}) {
  const result = await makeGraphQLClient().request(
    graphql(`
      query UserMylistPage_OGImage($name: String!, $slug: String!) {
        findUser(input: { name: $name }) {
          displayName
          icon
          publicMylist(slug: $slug) {
            slug
            title
            registrationsByOffset(input: { take: 1, offset: 0 }) {
              nodes {
                id
                video {
                  thumbnailUrl
                }
              }
            }
          }
        }
      }
    `),
    {
      name: params.name,
      slug: params.slug,
    }
  );

  console.dir(result);

  const { findUser } = result;
  if (!findUser || !findUser.publicMylist) notFound();

  const {
    displayName,
    icon: userIcon,
    publicMylist: {
      title: mylistTitle,
      registrationsByOffset: { nodes },
    },
  } = findUser;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          background: "#0A0B14",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            position: "absolute",
            top: 0,
            left: "50%",
            width: "50%",
            height: "100%",
          }}
        >
          {nodes.map(({ id, video: { thumbnailUrl } }) => (
            <img
              key={id}
              src={thumbnailUrl}
              style={{
                width: "50%",
                height: "25%",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            background: "#12141B",
            width: "50%",
            height: "100%",
            top: 0,
            left: 0,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            padding: "24px 32px",
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "#12141B",
            transform: "skewX(-5deg)",
            transformOrigin: "right bottom",
            borderRight: "1px solid #2A3540",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            padding: "24px 32px",
            width: "60%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              display: "flex",
              width: "100%",
              fontFamily: "Noto Serif JP",
              fontSize: 42,
              fontWeight: 700,
              color: "#CDD6DF",
            }}
          >
            {mylistTitle}
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={userIcon}
              style={{
                width: 64,
                height: 64,
                borderRadius: 8,
                marginRight: 16,
              }}
            ></img>
            <p
              style={{
                display: "flex",
                width: "100%",
                fontFamily: "Noto Serif JP",
                fontSize: 24,
                fontWeight: 700,
                color: "#707C89",
              }}
            >
              {displayName}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Serif JP",
          data: await loadGoogleFont({
            family: "Noto Serif JP",
            weight: 700,
            text: mylistTitle + displayName,
          }),
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
