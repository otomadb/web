import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import clsx from "clsx";

import { SemitagRows } from "./SemitagRows";

export const dynamic = "force-dynamic";

export default withPageAuthRequired(async function Page() {
  return (
    <main className={clsx(["max-w-screen-lg"], ["mx-auto"])}>
      <h1>仮タグの編集</h1>
      <SemitagRows />
    </main>
  );
});
