export const dynamic = "force-dynamic";

import { Details } from "./Details";
import { RegistrationsList } from "./RegistrationsList";

export default async function Page({ params }: { params: { id: string } }) {
  /*
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
  */

  return (
    <div>
      <header>
        <Details mylistId={params.id} />
      </header>
      <section>
        <RegistrationsList mylistId={params.id} />
      </section>
    </div>
  );
}
