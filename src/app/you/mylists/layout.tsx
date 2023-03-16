import clsx from "clsx";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql2 } from "~/gql/fetch";
import { MylistShareRange } from "~/gql/graphql";

import { Query, SideMylistList } from "./SideMylistList.server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_COOKIE_KEY)?.value;

  const { whoami } = await fetchGql2(
    {
      document: graphql(`
        query YouMylistsPageLayout {
          whoami {
            id
          }
        }
      `),
      variables: {},
    },
    { session }
  );
  if (!whoami) return notFound();

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
        <Suspense>
          {/* @ts-expect-error for Server Component*/}
          <SideMylistList
            fetcher={fetchGql2(
              {
                document: Query,
                variables: {
                  id: whoami.id,
                  ranges: [
                    MylistShareRange.Public,
                    MylistShareRange.KnowLink,
                    MylistShareRange.Private,
                  ],
                },
              },
              { session }
            )}
          />
        </Suspense>
      </div>
      <div className={clsx(["flex-grow"])}>{children}</div>
    </div>
  );
}
