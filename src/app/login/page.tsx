import clsx from "clsx";

import { SkipIfLoggedin } from "~/components/common/SkipIfLoggedin";
import { LoginForm } from "~/components/pages/Auth/Login/LoginForm";

export default async function Page() {
  return (
    <SkipIfLoggedin>
      <div className={clsx(["flex", ["justify-center"], ["items-center"]])}>
        <LoginForm className={clsx(["w-full", "md:w-96"])} />
      </div>
    </SkipIfLoggedin>
  );
}
