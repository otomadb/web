"use client";

import "client-only";

import React from "react";
import { useQuery } from "urql";

import { getFragment, getFragment as useFragment, graphql } from "~/gql";
import {
  MylistPageCommon_SideMylistListFragmentDoc,
  UserMylistPage_DetailsFragmentDoc,
  UserMylistPage_RegistrationsFragmentDoc,
  YouLikesPageDocument,
} from "~/gql/graphql";

import { UserMylistTemplate } from "../../Mylist/Template";

graphql(`
  query YouLikesPage {
    whoami {
      id
      likes {
        id
        ...UserMylistPage_Registrations
        ...UserMylistPage_Details
      }
      mylists(input: { limit: 20, range: [PUBLIC, KNOW_LINK, PRIVATE] }) {
        ...MylistPageCommon_SideMylistList
      }
    }
  }
`);
export const Inner: React.FC = () => {
  const [{ data }] = useQuery({
    query: YouLikesPageDocument,
  });

  const sidelist = getFragment(
    MylistPageCommon_SideMylistListFragmentDoc,
    data?.whoami?.mylists
  );
  const details = useFragment(
    UserMylistPage_DetailsFragmentDoc,
    data?.whoami?.likes
  );
  const registrations = getFragment(
    UserMylistPage_RegistrationsFragmentDoc,
    data?.whoami?.likes
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
