import clsx from "clsx";

import { SearchParams } from "./Link";
import { VideoGrid } from "./VideosGrid";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className={clsx(["container"], ["mx-auto"], ["flex", "flex-col"])}>
      <header>
        <h1 className={clsx(["text-xl"])}>最近追加された動画</h1>
      </header>
      <section className={clsx(["mt-4"], ["w-full"])}>
        <VideoGrid initAfter={searchParams.after} />
      </section>
    </main>
  );
}
