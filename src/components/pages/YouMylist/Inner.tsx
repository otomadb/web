"use client";

import "client-only";

import React from "react";
import { useQuery } from "urql";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  MylistPageCommon_SideMylistListFragmentDoc,
  UserMylistPage_DetailsFragmentDoc,
  UserMylistPage_RegistrationsFragmentDoc,
  YouMylistPageDocument,
} from "~/gql/graphql";

import { UserMylistTemplate } from "../UserMylist/Template";

graphql(`
  query YouMylistPage($mylistId: ID!) {
    whoami {
      id
      mylist(id: $mylistId) {
        ...UserMylistPage_Registrations
        ...UserMylistPage_Details
      }
      mylists(input: { limit: 20, range: [PUBLIC, KNOW_LINK, PRIVATE] }) {
        ...MylistPageCommon_SideMylistList
      }
    }
  }
`);
export const Inner: React.FC<{ mylistId: string }> = ({ mylistId }) => {
  const [{ data }] = useQuery({
    query: YouMylistPageDocument,
    variables: { mylistId: `mylist:${mylistId}` },
  });

  const sidelist = useFragment(
    MylistPageCommon_SideMylistListFragmentDoc,
    data?.whoami?.mylists
  );
  const details = useFragment(
    UserMylistPage_DetailsFragmentDoc,
    data?.whoami?.mylist
  );
  const registrations = useFragment(
    UserMylistPage_RegistrationsFragmentDoc,
    data?.whoami?.mylist
  );

  if (sidelist === null || details === null || registrations === null)
    return null; // TODO: whoamiがnullのケース

  return (
    <UserMylistTemplate
      sidelist={sidelist}
      details={details}
      registrations={registrations}
    />
  );
};
