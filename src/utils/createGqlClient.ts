import { GraphQLClient } from "graphql-request";

export const createGqlClient = () =>
  new GraphQLClient(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString()
  );
