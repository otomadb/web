import clsx from "clsx";

import { RegisterNicovideoForm } from "~/components/pages/RegisterNicovideo/Form";

export default async function Page() {
  return (
    <main className={clsx(["max-w-screen-xl"], ["mx-auto"])}>
      <h1>Register</h1>
      <RegisterNicovideoForm className={clsx(["mt-4"])} />
    </main>
  );
}
