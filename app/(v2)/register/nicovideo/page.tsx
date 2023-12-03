import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ニコニコ動画からの登録",
};

export default async function Page() {
  redirect("/home");

  /*
  return (
    <main
      className={clsx(
        "mx-auto flex h-[calc(100vh-64px)] w-full max-w-screen-lg flex-col bg-slate-800 py-8"
      )}
    >
      <header className={clsx("flex items-center px-8 py-2")}>
        <h1 className={clsx("text-slate-400", "text-lg", "font-bold")}>
          ニコニコ動画からの登録
        </h1>
      </header>
      <div className={clsx("h-full w-full px-8 py-2")}>
        <FormController className={clsx("h-full w-full")} />
      </div>
    </main>
  );
  */
}
