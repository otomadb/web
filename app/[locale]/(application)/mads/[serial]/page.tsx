import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setStaticParamsLocale } from "next-international/server";
import { Suspense } from "react";

import mkGenerateStaticParams from "~/app/[locale]/mkGenerateStaticParams";
import { graphql } from "~/gql";
import { makeGraphQLClient, makeGraphQLClient2 } from "~/gql/fetch";
import { getScopedI18n } from "~/locales/server";

import SimilarVideos from "./SimilarVideos";

type PageParams = {
  locale: string;
  serial: string;
};

export async function generateMetadata({
  params,
}: {
  params: PageParams;
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

export async function generateStaticParams() {
  const pps = await (
    await makeGraphQLClient2({})
  )
    .request(
      graphql(`
        query VideoPage_GenerateStaticParams {
          findVideos(first: 100) {
            nodes {
              serial
            }
          }
        }
      `)
    )
    .then((r) =>
      r.findVideos.nodes.map(
        (v) =>
          ({ serial: v.serial.toString() }) satisfies Omit<PageParams, "locale">
      )
    );

  return mkGenerateStaticParams(pps) satisfies PageParams[];
}

export default async function Page({
  params: { serial, locale },
}: {
  params: PageParams;
}) {
  setStaticParamsLocale(locale);

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
      { serial: parseInt(serial, 10) }
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
