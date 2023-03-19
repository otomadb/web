import clsx from "clsx";
import type { Metadata } from "next";

import { SigninForm } from "./SigninForm";
export const metadata: Metadata = {
  title: "ログイン",
};

export default async function Page() {
  return <SigninForm className={clsx(["w-full", "max-w-[24rem]"])} />;
}
