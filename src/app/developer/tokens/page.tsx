import clsx from "clsx";
import type { Metadata } from "next";

import { ShowToken } from "./ShowToken";

export const metadata: Metadata = {
  title: "アクセストークンの発行",
};

export default async function Page() {
  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>アクセストークンの発行</h1>
      <ShowToken />
    </main>
  );
}
