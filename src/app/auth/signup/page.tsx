import clsx from "clsx";

import { SignupForm } from "~/components/pages/Auth/Signup/SignupForm";

export default async function Page() {
  return (
    <div className={clsx(["flex", ["justify-center"], ["items-center"]])}>
      <SignupForm className={clsx(["w-full", "md:w-96"])} />
    </div>
  );
}
