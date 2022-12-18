import clsx from "clsx";

import { Form } from "./Form";

export default async function Page() {
  return (
    <>
      <h1>Register</h1>
      <Form className={clsx(["mt-4"])} />
    </>
  );
}
