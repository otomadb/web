import clsx from "clsx";

import { LoginForm } from "./LoginForm";

export default async function Page() {
  return (
    <div className={clsx(["flex", ["justify-center"], ["items-center"]])}>
      <LoginForm className={clsx(["w-full", "md:w-96"])} />
    </div>
  );
}
