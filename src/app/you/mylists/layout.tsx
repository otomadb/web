import clsx from "clsx";
import React from "react";

import { SideMylistList } from "./SideMylistList";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_COOKIE_KEY)?.value;

  const { whoami } = await fetchGql2(
    {
      document: graphql(`
        query YouMylistsPageLayout {
          whoami {
            ...YouMylistsPageLayout_SideMylistsList
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
    <div className={clsx(["flex"], ["relative"])}>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["w-72"],
          ["h-[calc(100vh-64px)]"],
          ["sticky", "top-[64px]"]
        )}
      >
        <SideMylistList />
      </div>
      <div className={clsx(["flex-grow"])}>{children}</div>
    </div>
  );
}
