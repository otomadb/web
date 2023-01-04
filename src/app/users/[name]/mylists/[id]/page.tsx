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

export default async function Page({
  params,
}: {
  params: { name: string; id: string };
}) {
  const data = await gqlRequest(
    graphql(`
      query UserMylistPage($userName: String!, $mylistId: ID!) {
        findUser(input: { name: $userName }) {
          ...UserPageLayout_Nav
          mylist(id: $mylistId) {
            id
            ...MylistPage_Details
            ...MylistPage_Registrations
          }
        }
      }
    `),
    {
      userName: params.name,
      mylistId: `mylist:${params.id}`,
    }
  );

  if (!data.findUser) notFound();

  const { findUser } = data;
  if (!findUser.mylist) notFound();

  return (
    <>
      <div>
        <Details
          fallback={getFragment(MylistPage_DetailsFragmentDoc, findUser.mylist)}
        />
        <Registrations
          fallback={getFragment(
            MylistPage_RegistrationsFragmentDoc,
            findUser.mylist
          )}
        />
      </div>
    </>
  );
}
