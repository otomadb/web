import "server-only";

import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";

export const fetchGql = async <T, V>(
  document: TypedDocumentNode<T, V>,
  variables: V,
  fetchOptions: Partial<Pick<RequestInit, "next" | "headers">> = {}
): Promise<T> => {
  const res = await fetch(process.env.GRAPHQL_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    body: JSON.stringify({ query: print(document), variables }),
    next: { revalidate: 0 },
    ...fetchOptions,
  });
  const json = await res.json();
  const { errors, data } = json;
  // TODO: エラーハンドリング
  return data as T;
};

export const fetchGql2 = async <T, V>(
  { document, variables }: { document: TypedDocumentNode<T, V>; variables: V },
  { session }: { session?: string | null }
): Promise<T> => {
  const res = await fetch(process.env.GRAPHQL_API_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({ query: print(document), variables }),
    headers: {
      "Content-Type": "application/json",
      "Cookie": `${process.env.SESSION_COOKIE_KEY}=${session}`,
    },
    next: { revalidate: 0 },
  });
  const json = await res.json();
  const { errors, data } = json;
  // TODO: エラーハンドリング
  return data as T;
};
