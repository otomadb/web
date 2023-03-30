"use client";
import "client-only";

import { ReactNode } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

const Query = graphql(`
  query DeveloperPages_Guard {
    whoami {
      id
      isAdministrator
    }
  }
`);
const Guard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [{ data, fetching }] = useQuery({
    query: Query,
    requestPolicy: "network-only",
  });

  if (fetching)
    return (
      <div>
        <p>LOADING</p>
      </div>
    );

  if (!data?.whoami?.isAdministrator)
    return (
      <div>
        <p>開発者権限がありません。</p>
      </div>
    );

  return <>{children}</>;
};
export default Guard;
