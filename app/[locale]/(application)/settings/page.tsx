import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";
import { Metadata } from "next";

import { getScopedI18n } from "~/locales/server";

import RenameForm from "./RenameForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getScopedI18n("page.settings");

  return {
    title: t("title"),
  };
}

export default withPageAuthRequired(async function Page() {
  return (
    <div className={clsx("container mx-auto max-w-screen-lg p-8")}>
      <main
        className={clsx(
          "flex flex-col gap-y-4 border border-obsidian-primary bg-obsidian-darker px-8 py-4"
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
    </div>
  );
});
