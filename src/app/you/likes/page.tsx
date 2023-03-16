import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  Details,
  Query as DetailsQuery,
} from "~/app/users/[name]/mylists/[id]/Details.server";
import {
  Query as RegistrationsListQuery,
  RegistrationsList,
} from "~/app/users/[name]/mylists/[id]/RegistrationsList.server";
import { graphql } from "~/gql";
import { fetchGql2 } from "~/gql/fetch";

export const dynamic = "force-dynamic";
export const runtime = "experimental-edge";

export const metadata: Metadata = {
  title: "あなたがいいねした動画",
};

export default async function Page() {
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_COOKIE_KEY)?.value;

  const { whoami } = await fetchGql2(
    {
      document: graphql(`
        query YouLikesPage {
          whoami {
            likes {
              id
            }
          }
        }
      `),
      variables: {},
    },
    { session }
  );

  if (!whoami) return notFound();
  if (!whoami.likes) return notFound();

  return (
    <div>
      <header>
        <Suspense>
          {/* @ts-expect-error for Server Component*/}
          <Details
            fetcher={fetchGql2(
              {
                document: DetailsQuery,
                variables: {
                  id: whoami.likes.id,
                },
              },
              {}
            )}
          />
        </Suspense>
      </header>
      <section>
        <Suspense>
          {/* @ts-expect-error for Server Component*/}
          <RegistrationsList
            fetcher={fetchGql2(
              {
                document: RegistrationsListQuery,
                variables: { id: whoami.likes.id },
              },
              {}
            )}
          />
        </Suspense>
      </section>
    </div>
  );
}
