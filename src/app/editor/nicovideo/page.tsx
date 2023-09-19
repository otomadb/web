import clsx from "clsx";
import type { Metadata } from "next";

import FormController from "./Controller";

export const metadata: Metadata = {
  title: "ニコニコ動画からの登録",
};

export default async function Page() {
  return (
    <main
      className={clsx(
        ["flex", "flex-col"],
        ["bg-slate-800"],
        ["max-w-screen-lg", "w-full"],
        ["h-[calc(100vh-64px)]"],
        ["mx-auto"],
        ["py-8"]
      )}
    >
      <header
        className={clsx(
          ["flex", "items-center"],
          [["px-8"], ["py-2"]],
          ["bg-slate-800"],
          ["border-b", "border-slate-700"]
        )}
      >
        <h1 className={clsx(["text-slate-400", "text-lg", "font-bold"])}>
          ニコニコ動画からのリクエスト
        </h1>
      </header>
      <div className={clsx([["px-8"], ["py-2"]], ["w-full"], ["h-full"])}>
        <FormController className={clsx(["w-full"], ["h-full"])} />
      </div>
    </main>
  );
}
