export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { Details } from "~/app/users/[name]/mylists/[id]/Details";
import { RegistrationsList } from "~/app/users/[name]/mylists/[id]/RegistrationsList";
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
              ...UserMylistPage_Details
              ...UserMylistPage_RegistrationsList
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
        <Details fragment={whoami.mylist} />
      </header>
      <section>
        <RegistrationsList fragment={whoami.mylist} />
      </section>
    </div>
  );
}
