import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";
import { GraphQLClient, Variables } from "graphql-request";

export const gqlRequest = async <T, V extends Variables>(
  document: TypedDocumentNode<T, V>,
  variables: V,
  { ...props }: Partial<Pick<RequestInit, "next">> = {}
): Promise<T> => {
  const res = await fetch(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: print(document), variables }),
      ...props,
    }
  );

  const json = await res.json();
  return json.data as T;
};
