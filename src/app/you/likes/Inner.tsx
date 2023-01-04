"use client";

import "client-only";

import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { Mylists } from "~/components/pages/UserMylists";
import { getFragment, graphql } from "~/gql";
import {
  UserMylistsPage_MylistsFragmentDoc,
  YouMylistsPage_MylistsDocument,
} from "~/gql/graphql";

graphql(`
  query YouMylistsPage_Mylists {
    whoami {
      id
      mylists(input: { limit: 20, range: [PUBLIC, KNOW_LINK, PRIVATE] }) {
        ...UserMylistsPage_Mylists
      }
      ...UserPageLayout_Header
    }
  }
`);
export const Inner: React.FC = () => {
  const [{ data }] = useQuery({
    query: YouMylistsPage_MylistsDocument,
  });

  const mylists = getFragment(
    UserMylistsPage_MylistsFragmentDoc,
    data?.whoami?.mylists
  );

  return (
    <main className={clsx(["py-4"])}>
      {mylists && <Mylists fallback={mylists} />}
    </main>
  );
};
