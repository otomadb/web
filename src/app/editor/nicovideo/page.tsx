import clsx from "clsx";
import type { Metadata } from "next";

import Controller from "./Controller";

export const metadata: Metadata = {
  title: "ニコニコ動画からの登録",
};

export default async function Page() {
  return (
    <main className={clsx(["w-full"], ["flex", "flex-col"])}>
      <header
        className={clsx(
          ["container", "max-w-screen-lg", "mx-auto"],
          ["px-4"],
          ["py-4"]
        )}
      >
        <h1>ニコニコ動画からの追加</h1>
      </header>
      <section
        className={clsx(
          ["pb-8"],
          ["flex-grow"],
          ["container", "mx-auto", "max-w-screen-lg"]
        )}
      >
        <Controller className={clsx(["h-full"])} />
      </section>
    </main>
  );
}
