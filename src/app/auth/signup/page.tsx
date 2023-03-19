import clsx from "clsx";
import type { Metadata } from "next";

import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "ユーザー登録",
};

export default async function Page() {
  return <SignupForm className={clsx(["w-full", "max-w-[24rem]"])} />;
}
