import clsx from "clsx";

import { SemitagRows } from "./SemitagRows";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <main className={clsx("mx-auto max-w-screen-lg")}>
      <h1>仮タグの編集</h1>
      <SemitagRows />
    </main>
  );
}
