import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { VideoGrid } from "./VideoGrid";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { serial: string };
}): Promise<Metadata> {
  const { findTag } = await fetchGql(
    graphql(`
      query TagPage_Title($serial: Int!) {
        findTag(input: { serial: $serial }) {
          name
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!findTag) return notFound(); // TODO: これ本当にこれでいいの？

  return {
    title: findTag.name,
  };
}

export default async function Page({ params }: { params: { serial: string } }) {
  const { findTag } = await fetchGql(
    graphql(`
      query TagPage($serial: Int!) {
        findTag(input: { serial: $serial }) {
          id
          name
        }
      }
    `),
    { serial: parseInt(params.serial, 10) },
    { next: { revalidate: 0 } }
  );

  if (!findTag) return notFound();

  return (
    <main className={clsx(["container"], ["mx-auto"], ["flex", "flex-col"])}>
      <header>
        <h1 className={clsx(["text-xl"])}>{findTag.name}</h1>
      </header>
      <section className={clsx(["mt-4"], ["w-full"])}>
        <VideoGrid tagId={findTag.id} />
      </section>
    </main>
  );
}
