import clsx from "clsx";

import { RegisterNicovideoForm } from "~/components/pages/Editor/RegisterNicovideo/Form";

export default async function Page() {
  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>ニコニコ動画からの追加</h1>
      <RegisterNicovideoForm className={clsx(["mt-4"])} />
    </main>
  );
}
