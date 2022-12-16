import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { request, Variables } from "graphql-request";

export const gqlRequest = <T, V extends Variables>(
  document: TypedDocumentNode<T, V>,
  variables?: V
) =>
  request(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    document,
    ...([variables] as never)
  );
