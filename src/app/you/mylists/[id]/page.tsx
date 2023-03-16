export const dynamic = "force-dynamic";
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

export default async function Page({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_COOKIE_KEY)?.value;

  const { whoami } = await fetchGql2(
    {
      document: graphql(`
        query YouMylistPage($mylistId: ID!) {
          whoami {
            mylist(id: $mylistId) {
              id
            }
          }
        }
      `),
      variables: { mylistId: params.id },
    },
    { session }
  );

  if (!whoami) return notFound();
  if (!whoami.mylist) return notFound();

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
                  id: whoami.mylist.id,
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
                variables: { id: whoami.mylist.id },
              },
              {}
            )}
          />
        </Suspense>
      </section>
    </div>
  );
}
