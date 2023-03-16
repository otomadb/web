import { notFound } from "next/navigation";
import { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { Details, Query as DetailsQuery } from "../mylists/[id]/Details.server";
import {
  Query as RegistrationsListQuery,
  RegistrationsList,
} from "../mylists/[id]/RegistrationsList.server";

export default async function Page({ params }: { params: { name: string } }) {
  const data = await fetchGql(
    graphql(`
      query UserLikesPage($userName: String!) {
        findUser(input: { name: $userName }) {
          likes {
            id
          }
        }
      }
    `),
    { userName: params.name }
  );

  if (!data.findUser) notFound();

  const { findUser } = data;
  if (!findUser.likes) notFound();

  return (
    <main>
      <header>
        <Suspense>
          {/* @ts-expect-error for Server Component*/}
          <Details
            fetcher={fetchGql(DetailsQuery, {
              id: findUser.likes.id,
            })}
          />
        </Suspense>
      </header>
      <section>
        <Suspense>
          {/* @ts-expect-error for Server Component*/}
          <RegistrationsList
            fetcher={fetchGql(RegistrationsListQuery, {
              id: findUser.likes.id,
            })}
          />
        </Suspense>
      </section>
    </main>
  );
}
