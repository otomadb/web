import clsx from "clsx";

import { Form2 } from "./Form2";

export default async function Page() {
  return (
    <main>
      <h1>Register</h1>
      <Form2 className={clsx(["mt-4"])} />
    </main>
  );
}
