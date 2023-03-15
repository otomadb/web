"use client";

import "client-only";

import React from "react";
import { useQuery } from "urql";

import { UserMylists } from "~/app/users/[name]/mylists";
import { graphql, useFragment } from "~/gql";
import {
  UserMylistsPage_MylistsFragmentDoc,
  YouMylistsPageDocument,
} from "~/gql/graphql";

graphql(`
  query YouMylistsPage {
    whoami {
      id
      """
      mylists(range: [PUBLIC, KNOW_LINK, PRIVATE]) {
        ...UserMylistsPage_Mylists
      }
      """
    }
  }
`);
export const Inner: React.FC = () => {
  const [{ data }] = useQuery({
    query: YouMylistsPageDocument,
  });

  const mylists = useFragment(
    UserMylistsPage_MylistsFragmentDoc,
    data?.whoami?.mylists
  );

  return <>{mylists && <UserMylists fallback={mylists} />}</>;
};
