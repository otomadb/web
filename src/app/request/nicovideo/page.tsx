import clsx from "clsx";

import { RequestForm } from "./Form";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>ニコニコ動画からのリクエスト</h1>
      <RequestForm className={clsx(["mt-4"])} />
    </main>
  );
}
