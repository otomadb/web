import { notFound } from "next/navigation";

import { Details } from "~/components/pages/UserMylist/Details";
import { Registrations } from "~/components/pages/UserMylist/Registrations";
import { getFragment, graphql } from "~/gql";
import {
  MylistPage_DetailsFragmentDoc,
  MylistPage_RegistrationsFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

export const revalidate = 0;

export default async function Page({ params }: { params: { name: string } }) {
  const data = await gqlRequest(
    graphql(`
      query UserLikesPage($userName: String!) {
        findUser(input: { name: $userName }) {
          likes {
            id
            ...MylistPage_Details
            ...MylistPage_Registrations
          }
        }
      }
    `),
    {
      userName: params.name,
    }
  );

  if (!data.findUser) notFound();

  const { findUser } = data;
  if (!findUser.likes) notFound();

  return (
    <>
      <div>
        <Details
          fallback={getFragment(MylistPage_DetailsFragmentDoc, findUser.likes)}
        />
        <Registrations
          fallback={getFragment(
            MylistPage_RegistrationsFragmentDoc,
            findUser.likes
          )}
        />
      </div>
    </>
  );
}
