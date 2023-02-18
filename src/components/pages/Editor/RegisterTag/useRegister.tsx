"use client";

import "client-only";

import clsx from "clsx";
import React, { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "urql";

import { Tag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  RegisterTagPage_RegisterTagDocument,
  RegisterTagPage_SuccessToastFragment,
  RegisterTagPage_SuccessToastFragmentDoc,
} from "~/gql/graphql";

import { FormSchema } from "./FormSchema";

graphql(`
  fragment RegisterTagPage_SuccessToast on Tag {
    ...Component_Tag
  }
`);
export const SuccessToast: React.FC<{
  fragment: RegisterTagPage_SuccessToastFragment;
}> = ({ fragment }) => {
  return (
    <div>
      <Tag tag={getFragment(Component_TagFragmentDoc, fragment)} />
      <span className={clsx(["text-slate-700"])}>を登録しました．</span>
    </div>
  );
};

graphql(`
  mutation RegisterTagPage_RegisterTag($input: RegisterTagInput!) {
    registerTag(input: $input) {
      __typename
      ... on RegisterTagSucceededPayload {
        tag {
          ...RegisterTagPage_SuccessToast
        }
      }
      ... on RegisterTagFailedPayload {
        message
      }
    }
  }
`);
export const useRegister = (): SubmitHandler<FormSchema> => {
  const [, mutateRegisterTag] = useMutation(
    RegisterTagPage_RegisterTagDocument
  );
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
      if (!error || !data) {
        // TODO 重大な例外処理
        return;
      }

      if (data.registerTag.__typename === "RegisterTagFailedPayload") {
        // TODO: 何かしら出す
        return;
      }

      const fragment = getFragment(
        RegisterTagPage_SuccessToastFragmentDoc,
        data.registerTag.tag
      );
      toast(() => <SuccessToast fragment={fragment} />);
    },
    [mutateRegisterTag]
  );
};
