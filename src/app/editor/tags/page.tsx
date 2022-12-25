import clsx from "clsx";

import { RegisterTagForm } from "~/components/RegisterTag/Form";

export default async function Page() {
  return (
    <main className={clsx(["max-w-screen-xl"], ["mx-auto"])}>
      <h1>タグの追加</h1>
      <RegisterTagForm className={clsx(["mt-4"])} />
    </main>
  );
}
