import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { GraphQLClient, Variables } from "graphql-request";

export const gqlclient = new GraphQLClient(
  new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
  { fetch }
);

export const gqlRequest = <T, V extends Variables>(
  document: TypedDocumentNode<T, V>,
  variables?: V
) => {
  return new GraphQLClient(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    { fetch }
  ).request(document, ...([variables] as never));
};
