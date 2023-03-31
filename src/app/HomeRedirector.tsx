"use client";

import "client-only";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

export const HomeRedirector: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [{ data }] = useQuery({
    query: graphql(`
      query TopPage_HomeRedirector {
        whoami {
          id
        }
      }
    `),
    requestPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data?.whoami) router.push("/home");
  }, [data?.whoami, router]);

  return <>{children}</>;
};
