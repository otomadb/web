import { request } from "graphql-request";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { makeGraphQLClient } from "~/gql/fetch";

export async function generateMetadata({
  params,
}: {
  params: { serial: string };
}): Promise<Metadata> {
  const result = await makeGraphQLClient().request(
    graphql(`
      query MadPage_Metadata($serial: Int!) {
        findMadBySerial(serial: $serial) {
          title
          serial
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!result.findMadBySerial) notFound();
  const { title, serial } = result.findMadBySerial;

  return {
    title: `${title} | OtoMADB`,
    openGraph: {
      type: "website",
      siteName: "OtoMADB",
      url: `https://otomadb.com/mads/${serial}`,
      title: `${title} | OtoMADB`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | OtoMADB`,
      site: "@SnO2WMaN",
    },
  };
}

type PageParams = { serial: string };

export async function generateStaticParams() {
  return request(
    process.env.GRAPHQL_API_ENDPOINT,
    graphql(`
      query VideoPage_GenerateStaticParams {
        findVideos(first: 100) {
          nodes {
            serial
          }
        }
      }
    `)
  ).then((v) =>
    v.findVideos.nodes.map(
      (v) => ({ serial: v.serial.toString() }) satisfies PageParams
    )
  );
}

export default async function Page({ params }: { params: PageParams }) {
  const result = await makeGraphQLClient().request(
    graphql(`
      query VideoPage($serial: Int!) {
        findMadBySerial(serial: $serial) {
          id
          ...MadPage_SimilarVideosSection
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!result.findMadBySerial) notFound();

  return <></>;
}
