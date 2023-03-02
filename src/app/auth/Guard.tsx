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
  const [{ data, fetching }, update] = useQuery({
    query: graphql(`
      query AuthPages_Guard {
        whoami {
          id
          ...Component_UserIcon
          ...GlobalNav_Profile_Accordion
        }
      }
    `),
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data?.whoami?.id) router.back();
  }, [data, router]);

  if (fetching)
    return (
      <div>
        <p>LOADING</p>
      </div>
    );

  return (
    <AuthPageGuardContext.Provider value={update}>
      {children}
    </AuthPageGuardContext.Provider>
  );
};
