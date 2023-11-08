import clsx from "clsx";

import RenameForm from "./RenameForm";

export default async function Page() {
  return (
    <div className={clsx("flex flex-col gap-y-2")}>
      <section
        className={clsx([
          "w-full border border-slate-300 bg-slate-100 px-8 py-4",
        ])}
      >
        <p className={clsx("text-sm")}>表示名を変える</p>
        <RenameForm className={clsx("mt-2 w-full")} />
      </section>
    </div>
  );
}
