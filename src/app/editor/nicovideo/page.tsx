import clsx from "clsx";
import type { Metadata } from "next";

import { Form } from "~/components/pages/Editor/RegisterNicovideo/Form";

import { SearchParams } from "./Link";

export const metadata: Metadata = {
  title: "ニコニコ動画からの登録",
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>ニコニコ動画からの追加</h1>
      <Form className={clsx(["mt-4"])} initSourceId={searchParams.sourceId} />
    </main>
  );
}
