import { Metadata } from "next";
import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { VideoGrid } from "./VideoGrid";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { serial: string };
}): Promise<Metadata> {
  const result = await fetchGql(
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

  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findTag) notFound();

  const { findTag } = result.data;
  return {
    title: `tag:${findTag.name} | OtoMADB`,
    openGraph: {
      url: `https://otomadb.com/tags/${findTag.serial}`,
      title: `tag:${findTag.name} | OtoMADB`,
    },
  };
}

export default async function Page({ params }: { params: { serial: string } }) {
  const result = await fetchGql(
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
  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findTag) notFound();

  const { findTag } = result.data;
  return (
    <div>
      <VideoGrid tagId={findTag.id} />
    </div>
  );
}
