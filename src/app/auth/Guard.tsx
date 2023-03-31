"use client";
import "client-only";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useQuery, UseQueryResponse } from "urql";

import { graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment AuthPagesGuard on User {
    id
    name
  }
`);

export const AuthPageGuardContext = React.createContext<UseQueryResponse[1]>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
);
export const AuthPagesGuard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [{ data, fetching }, update] = useQuery({
    query: graphql(`
      query AuthPagesGuard_Query {
        whoami {
          ...AuthPagesGuard
        }
      }
    `),
    requestPolicy: "cache-and-network",
  });
  const fragment = useFragment(Fragment, data?.whoami);

  useEffect(() => {
    if (!fragment) return;
    router.push(`/users/${fragment.name}`);
  }, [fragment, router]);

  return (
    <AuthPageGuardContext.Provider value={update}>
      {!fetching && !data?.whoami && <>{children}</>}
    </AuthPageGuardContext.Provider>
  );
};
