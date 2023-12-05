import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";

import RenameForm from "./RenameForm";

export default withPageAuthRequired(async function Page() {
  return (
    <main
      className={clsx(
        "container mx-auto flex max-w-screen-lg flex-col gap-y-4 border border-obsidian-primary bg-obsidian-darker px-12 py-8"
      )}
    >
      <header className={clsx("border-b border-b-obsidian-lighter py-2")}>
        <h1 className={clsx("text-xl font-bold text-snow-primary")}>設定</h1>
      </header>
      <section
        className={clsx(
          "flex w-full flex-col gap-y-2 border-l border-l-obsidian-lighter px-8 py-6"
        )}
      >
        <h2 className={clsx("text-lg font-bold text-snow-primary")}>
          表示名を変える
        </h2>
        <RenameForm className={clsx("w-full")} />
      </section>
    </main>
  );
});
