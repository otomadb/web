import clsx from "clsx";
import type { Metadata } from "next";

import { MylistsList } from "./MylistsList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "あなたのマイリスト",
};

export default async function Page() {
  /*
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_COOKIE_KEY)?.value;

  const { whoami } = await fetchGql2(
    {
      document: graphql(`
        query YouMylistsPage {
          whoami {
            ...YouMylistsPage_MylistsList
            id
          }
        }
      `),
      variables: {},
    },
    { session }
  );

  if (!whoami) return notFound();
  */

  return (
    <div className={clsx()}>
      <MylistsList />
    </div>
  );
}
