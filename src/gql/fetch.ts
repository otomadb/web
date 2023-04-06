import "server-only";

import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { DocumentNode, Kind, print } from "graphql";

/** Returns the name of the `DocumentNode`'s operation, if any.
 * @param query - A {@link DocumentNode}
 * @returns the operation's name contained within the document, or `undefined`
 * @see https://github.com/urql-graphql/urql/blob/21ccbad4e8090d72c3e93341fc4584ee7f475a7f/packages/core/src/utils/request.ts#L162-L172
 */
const getOperationName = (query: DocumentNode): string | undefined => {
  for (const node of query.definitions) {
    if (node.kind === Kind.OPERATION_DEFINITION) {
      return node.name ? node.name.value : undefined;
    }
  }
};

export const fetchGql3 = async <T, V extends Record<string, unknown>>(
  document: TypedDocumentNode<T, V>,
  variables: V,
  init?: Omit<RequestInit, "body" | "method">
) =>
  fetch(process.env.GRAPHQL_API_ENDPOINT, {
    ...init,
    method: "POST",
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: print(document),
      variables,
      operationName: getOperationName(document),
    }),
  }).then(async (res) => {
    if (res.ok) {
      const { errors, data } = await res.json();
      if (errors) throw errors;
      return data as T;
    }
  });

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
