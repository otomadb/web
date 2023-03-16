export const dynamic = "force-dynamic";

import clsx from "clsx";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  MylistsList,
  Query,
} from "~/app/users/[name]/mylists/MylistsList.server";
import { graphql } from "~/gql";
import { fetchGql2 } from "~/gql/fetch";
import { MylistShareRange } from "~/gql/graphql";

export const metadata: Metadata = {
  title: "あなたのマイリスト",
};

export default async function Page() {
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_COOKIE_KEY)?.value;

  const { whoami } = await fetchGql2(
    {
      document: graphql(`
        query YouMylistsPage {
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
    <div className={clsx()}>
      <Suspense>
        {/* @ts-expect-error for Server Component*/}
        <MylistsList
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
  );
}
