"use client";

import "client-only";

import { cacheExchange } from "@urql/exchange-graphcache";
import { GraphQLClient } from "graphql-request";
import React, { ReactNode, useContext } from "react";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";

import { GraphCacheConfig } from "~/gql/graphql";

const client = createClient({
  url: new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
  fetchOptions: {
    credentials: "include",
    mode: "cors",
  },
  exchanges: [
    dedupExchange,
    cacheExchange<GraphCacheConfig>({}),
    fetchExchange,
  ],
});

export const GraphQLContext = React.createContext<{ client: GraphQLClient }>({
  client: {} as GraphQLClient,
});

export const GraphQLProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Provider value={client}>
      <GraphQLContext.Provider
        value={{
          client: new GraphQLClient(
            new URL(
              "/graphql",
              process.env.NEXT_PUBLIC_API_ENDPOINT
            ).toString(),
            { credentials: "include", mode: "cors" }
          ),
        }}
      >
        {children}
      </GraphQLContext.Provider>
    </Provider>
  );
};

export const useGraphQLClient = (): GraphQLClient => {
  const { client } = useContext(GraphQLContext);
  return client;
};
