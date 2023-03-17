import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { Details } from "./Details";
import { RegistrationsList } from "./RegistrationsList";

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
            ...UserMylistPage_Details
            ...UserMylistPage_RegistrationsList
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
        <Details fragment={findUser.mylist} />
      </header>
      <section>
        <RegistrationsList fragment={findUser.mylist} />
      </section>
    </main>
  );
}
