import clsx from "clsx";

import RenameForm from "./RenameForm";

export default async function Page() {
  return (
    <main
      className={clsx(
        ["container", "max-w-screen-lg", "mx-auto"],
        ["flex", "flex-col", "gap-y-2"]
      )}
    >
      <section
        className={clsx(
          ["w-full"],
          ["bg-slate-100"],
          ["border", "border-slate-300"],
          ["px-8", "py-4"]
        )}
      >
        <p className={clsx(["text-sm"])}>表示名を変える</p>
        <RenameForm className={clsx(["mt-2"], ["w-full"])} />
      </section>
    </main>
  );
}
