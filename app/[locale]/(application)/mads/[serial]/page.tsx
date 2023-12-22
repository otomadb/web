import clsx from "clsx";
import { request } from "graphql-request";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { graphql } from "~/gql";
import { makeGraphQLClient, makeGraphQLClient2 } from "~/gql/fetch";
import { getScopedI18n } from "~/locales/server";

import SimilarVideos from "./SimilarVideos";

export async function generateMetadata({
  params,
}: {
  params: { serial: string };
}): Promise<Metadata> {
  const t = await getScopedI18n("page.mad");
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
    title: t("title", { title }),
    openGraph: {
      type: "website",
      url: `https://otomadb.com/mads/${serial}`,
    },
    twitter: {
      card: "summary_large_image",
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
  const result = (
    await makeGraphQLClient2({
      auth: "optional",
    })
  )
    .request(
      graphql(`
        query VideoPage($serial: Int!) {
          findMadBySerial(serial: $serial) {
            id
            ...MadPage_SimilarVideosSection
          }
        }
      `),
      { serial: parseInt(params.serial, 10) }
    )
    .then(({ findMadBySerial }) => findMadBySerial || notFound());

  return (
    <section
      className={clsx(
        "col-span-full flex flex-col gap-y-2 rounded-md border border-obsidian-primary bg-obsidian-darker p-4"
      )}
    >
      <h2 className={clsx("block text-lg font-bold text-snow-darker")}>
        似ている動画
      </h2>
      <div>
        <Suspense
          fallback={
            <p className={clsx("text-sm text-snow-darkest")}>Loading...</p>
          }
        >
          <SimilarVideos fragment={await result} />
        </Suspense>
      </div>
    </section>
  );
}
