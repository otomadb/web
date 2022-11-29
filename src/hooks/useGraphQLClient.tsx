"use client";

import "client-only";

import { GraphQLClient } from "graphql-request";
import React, { ReactNode, useContext } from "react";

import { gqlClient } from "~/gql/client";

const GraphQLContext = React.createContext({ client: gqlClient });

export const GraphQLProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <GraphQLContext.Provider value={{ client: gqlClient }}>
      {children}
    </GraphQLContext.Provider>
  );
};

export const useGraphQLClient = (): GraphQLClient => {
  const { client } = useContext(GraphQLContext);
  return client;
};
