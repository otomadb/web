import { notFound } from "next/navigation";
import { Suspense } from "react";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { Details } from "../mylists/[id]/Details.server";
import { RegistrationsList } from "../mylists/[id]/RegistrationsList.server";

export default async function Page({ params }: { params: { name: string } }) {
  const data = await fetchGql(
    graphql(`
      query UserLikesPage($userName: String!) {
        findUser(input: { name: $userName }) {
          likes {
            ...UserMylistPage_Details
            ...UserMylistPage_RegistrationsList
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
          <Details fragment={findUser.likes} />
        </Suspense>
      </header>
      <section>
        <Suspense>
          {/* @ts-expect-error for Server Component*/}
          <RegistrationsList fragment={findUser.likes} />
        </Suspense>
      </section>
    </main>
  );
}
