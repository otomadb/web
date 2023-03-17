import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";

import { Details } from "../mylists/[id]/Details";
import { RegistrationsList } from "../mylists/[id]/RegistrationsList";

export default async function Page({ params }: { params: { name: string } }) {
  const data = await fetchGql(
    graphql(`
      query UserLikesPage($userName: String!) {
        findUser(input: { name: $userName }) {
          likes {
            ...UserMylistPage_Details
            ...UserMylistPage_RegistrationsList
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
        <Details fragment={findUser.likes} />
      </header>
      <section>
        <RegistrationsList fragment={findUser.likes} />
      </section>
    </main>
  );
}
