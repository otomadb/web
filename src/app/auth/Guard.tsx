"use client";
import "client-only";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useQuery, UseQueryResponse } from "urql";

import { graphql } from "~/gql";

export const AuthPageGuardContext = React.createContext<UseQueryResponse[1]>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
);
export const AuthPagesGuard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [{ data }, update] = useQuery({
    query: graphql(`
      query AuthPagesLayout_Guard {
        whoami {
          id
        }
      }
    `),
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data?.whoami?.id) router.back();
  }, [data, router]);

  return (
    <AuthPageGuardContext.Provider value={update}>
      {children}
    </AuthPageGuardContext.Provider>
  );
};
