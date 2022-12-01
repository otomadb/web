"use client";
import "client-only";

import React, { ReactNode, useState } from "react";
import useSWR from "swr";

import { graphql } from "~/gql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";

export const WhoamiDocument = graphql(`
  query WhoAmI {
    whoami {
      id
    }
  }
`);

export const WhoamiContext = React.createContext<{
  whoami:
    | { checking: true }
    | { checking: false; whoami: string }
    | { checking: false; whoami: null };
  removeId(): void;
  setId(id: string): void;
}>({
  whoami: { checking: true },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeId() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setId() {},
});

export const WhoamiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const gqlClient = useGraphQLClient();
  const [whoami, setWhoami] = useState<
    | { checking: true }
    | { checking: false; whoami: string }
    | { checking: false; whoami: null }
  >({ checking: true });

  useSWR([WhoamiDocument], async (doc) => gqlClient.request(doc), {
    refreshInterval: 10000,
    onSuccess(data) {
      const { whoami } = data;
      setWhoami({ checking: false, whoami: whoami.id });
    },
    onError() {
      setWhoami({ checking: false, whoami: null });
    },
  });

  return (
    <WhoamiContext.Provider
      value={{
        whoami,
        removeId() {
          setWhoami({ checking: false, whoami: null });
        },
        setId(id) {
          setWhoami({ checking: false, whoami: id });
        },
      }}
    >
      {children}
    </WhoamiContext.Provider>
  );
};
