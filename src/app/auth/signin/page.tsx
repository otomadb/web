import clsx from "clsx";
import type { Metadata } from "next";

import { SigninForm } from "./SigninForm";
export const metadata: Metadata = {
  title: "ログイン",
};

export default async function Page() {
  return (
    <div className={clsx(["flex", ["justify-center"], ["items-center"]])}>
      <SigninForm className={clsx(["w-full", "md:w-96"])} />
    </div>
  );
}
