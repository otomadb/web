import clsx from "clsx";

import { SearchParams } from "./Link";
import { VideoGrid } from "./VideoGrid";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className={clsx(["container"], ["mx-auto"])}>
      <VideoGrid />
    </main>
  );
}
