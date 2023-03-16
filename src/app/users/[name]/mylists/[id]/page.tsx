import { notFound } from "next/navigation";
import { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { Details, Query as DetailsQuery } from "./Details.server";
import {
  Query as RegistrationsListQuery,
  RegistrationsList,
} from "./RegistrationsList.server";

export default async function Page({
  params,
}: {
  params: { name: string; id: string };
}) {
  const data = await fetchGql(
    graphql(`
      query UserMylistPage($userName: String!, $mylistId: ID!) {
        findUser(input: { name: $userName }) {
          mylist(id: $mylistId) {
            id
          }
        }
      }
    `),
    {
      userName: params.name,
      mylistId: params.id,
    }
  );

  if (!data.findUser) notFound();

  const { findUser } = data;
  if (!findUser.mylist) notFound();

  return (
    <main>
      <header>
        <Suspense>
          {/* @ts-expect-error for Server Component*/}
          <Details
            fetcher={fetchGql(DetailsQuery, {
              id: findUser.mylist.id,
            })}
          />
        </Suspense>
      </header>
      <section>
        <Suspense>
          {/* @ts-expect-error for Server Component*/}
          <RegistrationsList
            fetcher={fetchGql(RegistrationsListQuery, {
              id: findUser.mylist.id,
            })}
          />
        </Suspense>
      </section>
    </main>
  );
}
