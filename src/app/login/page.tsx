import clsx from "clsx";

import { LoginForm } from "./LoginForm";

export default async function Page() {
  return (
    <main className={clsx(["container"], ["mx-auto"])}>
      <LoginForm />
    </main>
  );
}
