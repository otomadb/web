"use client";

import "client-only";

import { ReactNode } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";
import { YouPage_GuardDocument } from "~/gql/graphql";

graphql(`
  query YouPage_Guard {
    whoami {
      id
    }
  }
`);
export const YouPageGuard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [{ data, fetching }] = useQuery({
    query: YouPage_GuardDocument,
    requestPolicy: "network-only",
  });

  if (fetching)
    return (
      <div>
        <p>LOADING</p>
      </div>
    );

  if (!data?.whoami)
    return (
      <div>
        <p>ログインしてください。</p>
      </div>
    );

  return <>{children}</>;
};
