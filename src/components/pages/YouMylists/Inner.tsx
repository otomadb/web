"use client";

import "client-only";

import React from "react";
import { useQuery } from "urql";

import { UserMylists } from "~/components/pages/UserMylists";
import { getFragment, graphql } from "~/gql";
import {
  UserMylistsPage_MylistsFragmentDoc,
  YouMylistsPageDocument,
} from "~/gql/graphql";

graphql(`
  query YouMylistsPage {
    whoami {
      id
      mylists(input: { limit: 20, range: [PUBLIC, KNOW_LINK, PRIVATE] }) {
        ...UserMylistsPage_Mylists
      }
    }
  }
`);
export const Inner: React.FC = () => {
  const [{ data }] = useQuery({
    query: YouMylistsPageDocument,
  });

  const mylists = getFragment(
    UserMylistsPage_MylistsFragmentDoc,
    data?.whoami?.mylists
  );

  return <>{mylists && <UserMylists fallback={mylists} />}</>;
};
