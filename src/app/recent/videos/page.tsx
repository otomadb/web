import clsx from "clsx";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { SearchParams } from "./Link";

export const dynamic = "force-dynamic";

import { VideoGrid } from "./VideoList";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { findVideos } = await fetchGql(
    graphql(`
      query RecentVideosPage($skip: Int!, $limit: Int!) {
        findVideos(input: { skip: $skip, limit: $limit }) {
          ...VideoGrid
        }
      }
    `),
    {
      skip:
        ((searchParams.page ? parseInt(searchParams.page, 10) : 1) - 1) * 24,
      limit: 24,
    }
  );

  return (
    <main className={clsx(["container"], ["mx-auto"])}>
      <section>
        <VideoGrid fragment={findVideos} />
      </section>
      <section></section>
    </main>
  );
}
