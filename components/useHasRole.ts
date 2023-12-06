"use client";

import { useQuery } from "urql";

import { graphql } from "~/gql";

export const $UseHarRoleQuery = graphql(`
  query UseHasRole {
    whoami {
      id
      hasRole(role: EDITOR)
    }
  }
`);
const useHasRole = () => {
  const [{ data }] = useQuery({
    query: $UseHarRoleQuery,
    requestPolicy: "cache-first",
  });
  return typeof data?.whoami.hasRole === "boolean"
    ? data.whoami.hasRole
    : undefined;
};
export default useHasRole;
