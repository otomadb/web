export const dynamic = "force-dynamic";

import type { Metadata } from "next";

import { Details } from "./Details";
import { RegistrationsList } from "./RegistrationsList";

export const metadata: Metadata = {
  title: "あなたがいいねした動画",
};

export default async function Page() {
  /*
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_COOKIE_KEY)?.value;

  const { whoami } = await fetchGql2(
    {
      document: graphql(`
        query YouLikesPage {
          whoami {
            likes {
              ...UserMylistPage_Details
              ...UserMylistPage_RegistrationsList
              id
            }
          }
        }
      `),
      variables: {},
    },
    { session }
  );

  if (!whoami) return notFound();
  if (!whoami.likes) return notFound();
  */

  return (
    <div>
      <header>
        <Details />
      </header>
      <section>
        <RegistrationsList />
      </section>
    </div>
  );
}
