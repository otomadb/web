import clsx from "clsx";

import { SigninForm } from "~/components/pages/Auth/Signin/SigninForm";

export default async function Page() {
  return (
    <div className={clsx(["flex", ["justify-center"], ["items-center"]])}>
      <SigninForm className={clsx(["w-full", "md:w-96"])} />
    </div>
  );
}
