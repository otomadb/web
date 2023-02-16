import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";

export const fetchGql = async <T, V>(
  document: TypedDocumentNode<T, V>,
  variables: V,
  fetchOptions: Partial<Pick<RequestInit, "next">> = {}
): Promise<T> => {
  const res = await fetch(
    new URL("/graphql", process.env.NEXT_PUBLIC_API_ENDPOINT).toString(),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: print(document), variables }),
      ...fetchOptions,
    }
  );
  const json = await res.json();
  const { errors, data } = json;
  // TODO: エラーハンドリング
  return data as T;
};
