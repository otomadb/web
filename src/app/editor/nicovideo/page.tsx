import clsx from "clsx";
import type { Metadata } from "next";

import { SourceIdInputForm } from "~/components/NicovideoSourceIdForm/Form";
import { SourceIdProvider } from "~/components/NicovideoSourceIdForm/SourceIdProvider";

import { RegisterForm } from "./_components/Form";

export const metadata: Metadata = {
  title: "ニコニコ動画からの登録",
};

export default async function Page() {
  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>ニコニコ動画からの追加</h1>
      <SourceIdProvider>
        <div
          className={clsx(
            [["px-4"], ["py-4"]],
            ["rounded"],
            ["border", "border-slate-300"],
            ["bg-slate-50"],
            ["flex", "flex-col", "gap-y-4"]
          )}
        >
          <SourceIdInputForm className={clsx()} />
          <RegisterForm />
        </div>
      </SourceIdProvider>
    </main>
  );
}
