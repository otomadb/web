import clsx from "clsx";
import type { Metadata } from "next";

import { RegisterTagForm } from "./Form";

export const metadata: Metadata = {
  title: "タグの登録",
};

export default async function Page() {
  return (
    <main className={clsx("mx-auto w-full max-w-screen-2xl")}>
      <RegisterTagForm className={clsx("h-[calc(100vh-[64px])] w-full py-8")} />
    </main>
  );
}
