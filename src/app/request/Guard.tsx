"use client";
import "client-only";

import React, { ReactNode } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

export const RequestPagesGuard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query RequestPages_Guard {
        whoami {
          id
        }
      }
    `),
    // requestPolicy: "network-only",
  });

  if (fetching)
    return (
      <div>
        <p>LOADING</p>
      </div>
    );

  if (!data?.whoami?.id)
    return (
      <div>
        <p>ログインしてください</p>
      </div>
    );

  return <>{children}</>;
};
