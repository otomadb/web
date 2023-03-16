import clsx from "clsx";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import { graphql } from "~/gql";
import { fetchGql2 } from "~/gql/fetch";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_COOKIE_KEY)?.value;

  console.log(session);

  const { whoami } = await fetchGql2(
    {
      document: graphql(`
        query YouPage_Guard {
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
    <div className={clsx(["h-full"])}>
      <div className={clsx(["container", "max-w-screen-xl", "mx-auto"])}>
        {children}
      </div>
    </div>
  );
}
