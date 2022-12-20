import clsx from "clsx";

import { LoginForm } from "~/components/Login/LoginForm";
import { SkipIfLoggedin } from "~/components/SkipIfLoggedin";

export default async function Page() {
  return (
    <SkipIfLoggedin>
      <div className={clsx(["flex", ["justify-center"], ["items-center"]])}>
        <LoginForm className={clsx(["w-full", "md:w-96"])} />
      </div>
    </SkipIfLoggedin>
  );
}
