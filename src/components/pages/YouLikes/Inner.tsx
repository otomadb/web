"use client";

import "client-only";

import React from "react";
import { useQuery } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  MylistPageCommon_SideMylistListFragmentDoc,
  UserMylistPage_RegistrationsFragmentDoc,
  YouLikesPageDocument,
} from "~/gql/graphql";

import { UserMylistTemplate } from "../UserMylist/Template";

graphql(`
  query YouLikesPage {
    whoami {
      id
      likes {
        id
        ...UserMylistPage_Registrations
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
  const registrations = getFragment(
    UserMylistPage_RegistrationsFragmentDoc,
    data?.whoami?.likes
  );

  if (sidelist === null || registrations === null) return null; // TODO: whoamiがnullのケース

  return (
    <UserMylistTemplate sidelist={sidelist} registrations={registrations} />
  );
};
