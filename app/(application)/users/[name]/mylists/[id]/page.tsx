import { notFound } from "next/navigation";

import { graphql } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import { isErr } from "~/utils/Result";

import { Details } from "./Details";
import { RegistrationsList } from "./RegistrationsList";

export default async function Page({
  params,
}: {
  params: { name: string; id: string };
}) {
  const result = await fetchGql(
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

  if (isErr(result)) throw new Error("GraphQL fetching Error");
  if (!result.data.findUser || !result.data.findUser.mylist) notFound();

  const mylist = result.data.findUser.mylist;

  return (
    <main>
      <header>
        <Details fragment={mylist} />
      </header>
      <section>
        <RegistrationsList fragment={mylist} />
      </section>
    </main>
  );
}
