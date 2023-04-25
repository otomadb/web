import clsx from "clsx";

import Controller from "./Controller";

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
        <h1>ニコニコ動画からのリクエスト</h1>
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
