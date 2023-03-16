import clsx from "clsx";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql2 } from "~/gql/fetch";

import { MylistsList, Query } from "./MylistsList.server";

export const dynamic = "force-dynamic";
export const runtime = "experimental-edge";

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
            { document: Query, variables: { id: whoami.id } },
            { session }
          )}
        />
      </Suspense>
    </div>
  );
}
