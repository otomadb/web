"use client";

import "client-only";

import React from "react";
import { useQuery } from "urql";

import { Details } from "~/components/pages/UserMylist/Details";
import { Registrations } from "~/components/pages/UserMylist/Registrations";
import { getFragment, graphql } from "~/gql";
import {
  MylistPage_DetailsFragmentDoc,
  MylistPage_RegistrationsFragmentDoc,
  YouMylistPageDocument,
} from "~/gql/graphql";

graphql(`
  query YouMylistPage($mylistId: ID!) {
    whoami {
      id
      mylist(id: $mylistId) {
        id
        ...MylistPage_Details
        ...MylistPage_Registrations
      }
    }
  }
`);
export const Inner: React.FC<{ mylistId: string }> = ({ mylistId }) => {
  const [{ data }] = useQuery({
    query: YouMylistPageDocument,
    variables: { mylistId },
  });

  const details = getFragment(
    MylistPage_DetailsFragmentDoc,
    data?.whoami?.mylist
  );
  const registrations = getFragment(
    MylistPage_RegistrationsFragmentDoc,
    data?.whoami?.mylist
  );

  return (
    <>
      {details && <Details fallback={details} />}
      {registrations && <Registrations fallback={registrations} />}
    </>
  );
};
