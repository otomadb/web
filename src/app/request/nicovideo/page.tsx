import clsx from "clsx";

import Controller from "./Controller";

export default async function Page() {
  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>ニコニコ動画からのリクエスト</h1>
      <Controller />
    </main>
  );
}
