"use client";

import "client-only";

import clsx from "clsx";
import React, { ComponentProps, useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "urql";

import { CommonTag } from "~/components/common/Tag";
import { FragmentType, graphql, useFragment } from "~/gql";

import { FormSchema } from "./FormSchema";

const Fragment = graphql(`
  fragment RegisterTagPage_SuccessToast on Tag {
    ...CommonTag
  }
`);
export const SuccessToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
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

export const useRegister = ({
  onSuccess,
}: {
  onSuccess(): void;
}): SubmitHandler<FormSchema> => {
  const [, mutateRegisterTag] = useMutation(
    graphql(`
      mutation RegisterTagPage_RegisterTag($input: RegisterTagInput!) {
        registerTag(input: $input) {
          __typename

          ... on RegisterTagSucceededPayload {
            tag {
              ...RegisterTagPage_SuccessToast
            }
          }
        }
      }
    `)
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

      switch (data.registerTag.__typename) {
        case "RegisterTagSucceededPayload": {
          onSuccess();
          callSuccessToast({ fragment: data.registerTag.tag });
          return;
        }
        default: {
          return;
        }
      }
    },
    [callSuccessToast, mutateRegisterTag, onSuccess]
  );
};
