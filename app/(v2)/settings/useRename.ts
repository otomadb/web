import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { useMutation } from "urql";

import { graphql } from "~/gql";

export const Mutation = graphql(`
  mutation SettingsPage_UseRename($renameTo: String!) {
    changeUserDisplayName(renameTo: $renameTo) {
      __typename
      ... on ChangeUserDisplayNameInvalidNameError {
        name
      }
      ... on ChangeUserDisplayNameSucceededPayload {
        user {
          id
          displayName
        }
      }
    }
  }
`);

export default function useRename({
  onSucceeded,
}: {
  onSucceeded(
    data: Extract<
      ResultOf<typeof Mutation>["changeUserDisplayName"],
      { __typename: "ChangeUserDisplayNameSucceededPayload" }
    >
  ): void;
}) {
  const [{ fetching }, mutate] = useMutation(Mutation);

  const rename = useCallback(
    async (renameTo: string) => {
      const result = await mutate({ renameTo });
      if (result.error || !result.data) {
        return;
      }
      switch (result.data.changeUserDisplayName.__typename) {
        case "ChangeUserDisplayNameInvalidNameError": {
          break;
        }
        case "ChangeUserDisplayNameSucceededPayload": {
          onSucceeded(result.data.changeUserDisplayName);
          break;
        }
      }
    },
    [onSucceeded, mutate]
  );
  return [{ fetching }, rename] as const;
}
