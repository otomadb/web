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
          serial
        }
      }
    `),
    { serial: parseInt(params.serial, 10) }
  );

  if (!findTag) return notFound(); // TODO: これ本当にこれでいいの？

  return {
    title: `tag:${findTag.name} | Otomadb`,
    openGraph: {
      url: `https://otomadb.com/tags/${findTag.serial}`,
      title: `tag:${findTag.name} | Otomadb`,
    },
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
    <div>
      <VideoGrid tagId={findTag.id} />
    </div>
  );
}
