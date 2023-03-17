export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { Details } from "~/app/users/[name]/mylists/[id]/Details";
import { RegistrationsList } from "~/app/users/[name]/mylists/[id]/RegistrationsList";
import { graphql } from "~/gql";
import { fetchGql2 } from "~/gql/fetch";

export const metadata: Metadata = {
  title: "あなたがいいねした動画",
};

export default async function Page() {
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

  return (
    <div>
      <header>
        <Details fragment={whoami.likes} />
      </header>
      <section>
        <RegistrationsList fragment={whoami.likes} />
      </section>
    </div>
  );
}
