"use client";
import "client-only";

import { ResultOf } from "@graphql-typed-document-node/core";
import { useRouter } from "next/navigation";
import React, { ReactNode, useContext, useEffect } from "react";
import { useQuery } from "urql";

import { graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment AuthPagesGuard on User {
    id
    name
  }
`);
export const AuthPageGuardContext = React.createContext<{
  current: ResultOf<typeof Fragment> | null;
  update(): void;
}>({
  current: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
});

export const AuthPagesGuard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [{ data }, update] = useQuery({
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

  if (fragment === undefined) return null; // loading

  return (
    <AuthPageGuardContext.Provider
      value={{
        current: fragment,
        update() {
          update({ requestPolicy: "cache-and-network" });
        },
      }}
    >
      {fragment === null && <>{children}</>}
    </AuthPageGuardContext.Provider>
  );
};

export const useGuard = () => {
  const { current, update } = useContext(AuthPageGuardContext);
  return { current, update };
};
