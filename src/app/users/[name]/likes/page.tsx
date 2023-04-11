import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { Details } from "../mylists/[id]/Details";
import { RegistrationsList } from "../mylists/[id]/RegistrationsList";

export default async function Page({ params }: { params: { name: string } }) {
  const result = await fetchGql(
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
  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findUser) notFound();

  const { findUser } = result.data;
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
