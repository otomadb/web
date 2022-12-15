"use client";
import "client-only";

import React, { ReactNode, useMemo } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";
import { WhoAmIDocument } from "~/gql/graphql";

graphql(`
  query WhoAmI {
    whoami {
      id
    }
  }
`);

export const WhoamiContext = React.createContext<{
  whoami:
    | { checking: true }
    | { checking: false; user: null }
    | { checking: false; user: { id: string } };
  rexecute(): void;
}>({
  whoami: { checking: false, user: null },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  rexecute() {},
});

export const WhoamiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [result, rexecute] = useQuery({
    query: WhoAmIDocument,
  });
  const { data, fetching } = result;

  const whoami = useMemo<
    | { checking: true }
    | { checking: false; user: { id: string } }
    | { checking: false; user: null }
  >(() => {
    if (fetching) return { checking: true };
    if (data?.whoami) {
      const { id } = data.whoami;
      return { checking: false, user: { id } };
    } else return { checking: false, user: null };
  }, [data, fetching]);

  return (
    <WhoamiContext.Provider value={{ whoami, rexecute: () => rexecute({}) }}>
      {children}
    </WhoamiContext.Provider>
  );
};
