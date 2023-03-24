import clsx from "clsx";

import { SourceIdInputForm } from "~/components/NicovideoSourceIdForm/Form";
import { SourceIdProvider } from "~/components/NicovideoSourceIdForm/SourceIdProvider";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>ニコニコ動画からのリクエスト</h1>
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
        </div>
      </SourceIdProvider>
    </main>
  );
}
