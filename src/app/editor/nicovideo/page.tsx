import clsx from "clsx";

import { Form } from "~/components/pages/Editor/RegisterNicovideo/Form";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>ニコニコ動画からの追加</h1>
      <Form className={clsx(["mt-4"])} />
    </main>
  );
}
