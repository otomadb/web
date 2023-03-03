"use client";

import "client-only";

import clsx from "clsx";
import React, { ComponentProps, useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "urql";

import { CommonTag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import {
  RegisterTagPage_RegisterTagDocument,
  RegisterTagPage_SuccessToastFragment,
  RegisterTagPage_SuccessToastFragmentDoc,
} from "~/gql/graphql";

import { FormSchema } from "./FormSchema";

graphql(`
  fragment RegisterTagPage_SuccessToast on Tag {
    ...CommonTag
  }
`);
export const SuccessToast: React.FC<{
  fragment: RegisterTagPage_SuccessToastFragment;
}> = ({ fragment }) => {
  return (
    <div>
      <CommonTag
        className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
        fragment={fragment}
      />
      <span className={clsx(["text-slate-700"])}>を登録しました．</span>
    </div>
  );
};
export const useCallSuccessToast =
  () => (props: Pick<ComponentProps<typeof SuccessToast>, "fragment">) =>
    toast(() => <SuccessToast {...props} />);

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
export const useRegister = ({
  onSuccess,
}: {
  onSuccess(): void;
}): SubmitHandler<FormSchema> => {
  const [, mutateRegisterTag] = useMutation(
    RegisterTagPage_RegisterTagDocument
  );
  const callSuccessToast = useCallSuccessToast();

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

      if (data.registerTag.__typename === "RegisterTagFailedPayload") {
        // TODO: 何かしら出す
        return;
      }

      onSuccess();
      callSuccessToast({
        fragment: getFragment(
          RegisterTagPage_SuccessToastFragmentDoc,
          data.registerTag.tag
        ),
      });
    },
    [callSuccessToast, mutateRegisterTag, onSuccess]
  );
};
