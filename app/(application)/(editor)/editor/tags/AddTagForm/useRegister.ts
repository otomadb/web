"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import { graphql as mswGraphQL } from "msw";
import { useCallback } from "react";
import { useMutation } from "urql";

import { CommonTagFragment } from "~/components/CommonTag";
import { graphql, makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { Fragment as SucceededToastFragment } from "./SucceededToast";

export const Mutation = graphql(`
  mutation RegisterTagForm_RegisterTag($input: RegisterTagInput!) {
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
}) => {
  const [, mutateRegisterTag] = useMutation(Mutation);

  return useCallback(
    async ({
      primaryName,
      extraNames,
      explicitParent,
      implicitParents,
      resolveSemitags,
    }: {
      primaryName: string;
      extraNames: string[];
      explicitParent: string | undefined;
      implicitParents: string[];
      resolveSemitags: string[];
    }) => {
      const { data, error } = await mutateRegisterTag({
        input: {
          primaryName,
          extraNames,
          explicitParent,
          implicitParents,
          resolveSemitags,
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

export const mockSuccessful = mswGraphQL.mutation(Mutation, (req, res, ctx) => {
  return res(
    ctx.data({
      registerTag: {
        __typename: "RegisterTagSucceededPayload",
        ...makeFragmentData(
          {
            tag: {
              ...makeFragmentData(
                {
                  name: "Tag 1",
                  type: TagType.Character,
                  explicitParent: null,
                },
                CommonTagFragment
              ),
            },
          },
          SucceededToastFragment
        ),
      },
    })
  );
});
