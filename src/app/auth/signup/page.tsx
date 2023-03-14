import clsx from "clsx";
import type { Metadata } from "next";

import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "ユーザー登録",
};

export default async function Page() {
  return (
    <div className={clsx(["flex", ["justify-center"], ["items-center"]])}>
      <SignupForm className={clsx(["w-full", "md:w-96"])} />
    </div>
  );
}
