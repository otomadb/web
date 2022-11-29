"use client";
import "client-only";

import React, { ReactNode, useContext, useState } from "react";
import useSWR from "swr";

import { graphql } from "~/gql";

import { useGraphQLClient } from "./useGraphQLClient";

export type Whoami = {
  id: string;
  name: string;
  displayName: string;
  icon: string;
};

export const WhoamiDocument = graphql(`
  query WhoAmI {
    whoami {
      id
      name
      displayName
      icon
    }
  }
`);

export const WhoamiContext = React.createContext<{
  whoami:
    | { checking: true }
    | { checking: false; whoami: Whoami }
    | { checking: false; whoami: null };
  clear(): void;
}>({
  whoami: { checking: true },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clear() {},
});

export const WhoamiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const gqlClient = useGraphQLClient();
  const [whoami, setWhoami] = useState<
    | { checking: true }
    | { checking: false; whoami: Whoami }
    | { checking: false; whoami: null }
  >({ checking: true });

  useSWR([WhoamiDocument], async (doc) => gqlClient.request(doc), {
    refreshInterval: 10000,
    onSuccess(data) {
      const { whoami } = data;
      setWhoami({
        checking: false,
        whoami: {
          id: whoami.id,
          name: whoami.name,
          displayName: whoami.displayName,
          icon: whoami.icon,
        },
      });
    },
    onError() {
      setWhoami({
        checking: false,
        whoami: null,
      });
    },
  });

  return (
    <WhoamiContext.Provider
      value={{
        whoami,
        clear() {
          setWhoami({ checking: false, whoami: null });
        },
      }}
    >
      {children}
    </WhoamiContext.Provider>
  );
};

export const useWhoami = (): Whoami | null | undefined => {
  const { whoami } = useContext(WhoamiContext);
  if (whoami.checking) return undefined;
  else if (whoami.whoami === null) return null;
  else return whoami.whoami;
};
