"use client";

import "client-only";

import { GraphQLClient } from "graphql-request";
import React, { ReactNode, useContext } from "react";

export const GraphQLContext = React.createContext<{ client: GraphQLClient }>({
  client: {} as GraphQLClient,
});

export const GraphQLProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <GraphQLContext.Provider
      value={{
        client: new GraphQLClient(
          new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
          { credentials: "include", mode: "cors" }
        ),
      }}
    >
      {children}
    </GraphQLContext.Provider>
  );
};

export const useGraphQLClient = (): GraphQLClient => {
  const { client } = useContext(GraphQLContext);
  return client;
};
