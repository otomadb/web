import clsx from "clsx";

import { RegisterTagForm } from "~/components/pages/Editor/RegisterTag/Form";

export default async function Page() {
  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>タグの追加</h1>
      <RegisterTagForm className={clsx(["mt-4"])} />
    </main>
  );
}
