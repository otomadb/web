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
  YouLikesPageDocument,
} from "~/gql/graphql";

graphql(`
  query YouLikesPage {
    whoami {
      id
      likes {
        id
        ...MylistPage_Details
        ...MylistPage_Registrations
      }
    }
  }
`);
export const Inner: React.FC = () => {
  const [{ data }] = useQuery({
    query: YouLikesPageDocument,
  });

  const details = getFragment(
    MylistPage_DetailsFragmentDoc,
    data?.whoami?.likes
  );
  const registrations = getFragment(
    MylistPage_RegistrationsFragmentDoc,
    data?.whoami?.likes
  );

  return (
    <>
      {details && <Details fallback={details} />}
      {registrations && <Registrations fallback={registrations} />}
    </>
  );
};
