import clsx from "clsx";
import React from "react";

import { getData } from "./getData";
import { VideoList } from "./tags/[id]/VideoList";

export const revalidate = 60;

export default async function Page() {
  const { recentRegisteredVideos } = await getData();

  return (
    <>
      <section>
        <h2 className={clsx(["text-xl"])}>最近登録された動画</h2>
        <VideoList className={clsx(["mt-4"])} videos={recentRegisteredVideos} />
      </section>
    </>
  );
}
