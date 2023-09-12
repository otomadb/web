"use client";

import "client-only";

import { useQuery } from "urql";

import { graphql } from "~/gql";

export const query = graphql(`
  query UseHasRole {
    whoami {
      id
      hasRole(role: EDITOR)
    }
  }
`);
const useHasRole = () => {
  const [{ data }] = useQuery({
    query,
    requestPolicy: "cache-first",
  });
  return typeof data?.whoami.hasRole === "boolean"
    ? data.whoami.hasRole
    : undefined;
};
export default useHasRole;
