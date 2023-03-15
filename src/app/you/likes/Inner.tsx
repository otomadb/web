"use client";

import "client-only";

import React from "react";
import { useQuery } from "urql";

import { UserMylistTemplate } from "~/app/users/[name]/mylists/[id]/Template";
import { graphql, useFragment } from "~/gql";
import {
  MylistPageCommon_SideMylistListFragmentDoc,
  UserMylistPage_DetailsFragmentDoc,
  UserMylistPage_RegistrationsFragmentDoc,
  YouLikesPageDocument,
} from "~/gql/graphql";

graphql(`
  query YouLikesPage {
    whoami {
      id
      likes {
        id
        ...UserMylistPage_Details
      }
      mylists(range: [PUBLIC, KNOW_LINK, PRIVATE]) {
        ...MylistPageCommon_SideMylistList
      }
    }
  }
`);
export const Inner: React.FC = () => {
  const [{ data }] = useQuery({
    query: YouLikesPageDocument,
  });

  const sidelist = useFragment(
    MylistPageCommon_SideMylistListFragmentDoc,
    data?.whoami?.mylists
  );
  const details = useFragment(
    UserMylistPage_DetailsFragmentDoc,
    data?.whoami?.likes
  );
  const registrations = useFragment(
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
