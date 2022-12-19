import clsx from "clsx";

import { Form } from "./Form";

export default async function Page() {
  return (
    <main>
      <h1>Register</h1>
      <Form className={clsx(["mt-4"])} />
    </main>
  );
}
