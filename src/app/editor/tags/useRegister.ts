"use client";

import "client-only";

import { ResultOf } from "@graphql-typed-document-node/core";
import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "urql";

import { graphql } from "~/gql";

import { FormSchema } from "./FormSchema";

export const Mutation = graphql(`
  mutation RegisterTagPage_RegisterTag($input: RegisterTagInput!) {
    registerTag(input: $input) {
      __typename
      ... on RegisterTagSucceededPayload {
        ...RegisterTagPage_SucceededToast
      }
    }
  }
`);
export const useRegister = ({
  onSuccess,
}: {
  onSuccess(
    data: Extract<
      ResultOf<typeof Mutation>["registerTag"],
      { __typename: "RegisterTagSucceededPayload" }
    >
  ): void;
}): SubmitHandler<FormSchema> => {
  const [, mutateRegisterTag] = useMutation(Mutation);

  return useCallback(
    async ({
      primaryName,
      extraNames,
      explicitParentTagId,
      implicitParents,
      resolveSemitags,
    }) => {
      const { data, error } = await mutateRegisterTag({
        input: {
          primaryName,
          extraNames: extraNames?.map(({ name }) => name),
          explicitParent: explicitParentTagId,
          implicitParents: implicitParents.map(({ tagId }) => tagId),
          resolveSemitags: resolveSemitags.map(({ semitagId }) => semitagId),
        },
      });
      if (error || !data) {
        // TODO 重大な例外処理
        return;
      }

      switch (data.registerTag.__typename) {
        case "RegisterTagSucceededPayload": {
          onSuccess(data.registerTag);
          return;
        }
        default: {
          return;
        }
      }
    },
    [mutateRegisterTag, onSuccess]
  );
};
