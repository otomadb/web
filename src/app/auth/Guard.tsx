"use client";
import "client-only";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

export const AuthPagesGuard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query AuthPages_Guard {
        whoami {
          id
        }
      }
    `),
    requestPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.whoami?.id) router.replace("/");
  }, [data, router]);

  if (fetching)
    return (
      <div>
        <p>LOADING</p>
      </div>
    );

  return <>{children}</>;
};
