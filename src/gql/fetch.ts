// import "server-only";

import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { DocumentNode, Kind, print } from "graphql";

import { err, ok, Result } from "~/utils/Result";

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

export const fetchGql = async <T, V extends Record<string, unknown>>(
  document: TypedDocumentNode<T, V>,
  variables: V,
  init?: Omit<RequestInit, "body" | "method">
): Promise<
  Result<
    | { type: "FETCH_ERROR"; status: number }
    | { type: "GRAPHQL_ERROR"; errors: unknown },
    T
  >
> =>
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
    if (!res.ok) return err({ type: "FETCH_ERROR", status: res.status });

    const { errors, data } = await res.json();
    if (errors) return err({ type: "GRAPHQL_ERROR", errors });
    return ok(data as T);
  });
