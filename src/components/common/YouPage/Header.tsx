"use client";
import clsx from "clsx";
import { useQuery } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  UserPageLayout_HeaderFragmentDoc,
  YouPageLayout_HeaderDocument,
} from "~/gql/graphql";

import { Header } from "../UserPage/Header";

graphql(`
  query YouPageLayout_Header {
    whoami {
      id
      ...UserPageLayout_Header
    }
  }
`);
export const YouPageHeader = () => {
  const [{ data }] = useQuery({
    query: YouPageLayout_HeaderDocument,
  });
  const fragment = getFragment(UserPageLayout_HeaderFragmentDoc, data?.whoami);

  return (
    <Header
      className={clsx(["container", "max-w-screen-xl", "mx-auto"])}
      fragment={fragment || undefined}
    />
  );
};
