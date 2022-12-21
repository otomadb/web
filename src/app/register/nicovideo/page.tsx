import clsx from "clsx";

import { RegisterNicovideoForm } from "~/components/RegisterNicovideo/Form";

export default async function Page() {
  return (
    <main>
      <h1>Register</h1>
      <RegisterNicovideoForm className={clsx(["mt-4"])} />
    </main>
  );
}
