import clsx from "clsx";

import { SearchParams } from "./Link";

export const dynamic = "force-dynamic";

import { InfiniteVideosGrid } from "~/components/common/InfiniteVideosGrid/InfiniteVideosList";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className={clsx(["container"], ["mx-auto"])}>
      <InfiniteVideosGrid />
    </main>
  );
}
