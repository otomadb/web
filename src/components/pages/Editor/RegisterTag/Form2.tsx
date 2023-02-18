"use client";

import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useCallback } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "urql";
import * as z from "zod";

import { BlueButton } from "~/components/common/Button";
import { graphql } from "~/gql";
import { RegisterTagPage_RegisterTagDocument } from "~/gql/graphql";

import { ExplicitParentTag } from "./ExplicitParentTag";
import { ExtraNames } from "./ExtraNames";
import { ImplictParentTags } from "./ImplicitParentTags";
import { PrimaryTitle } from "./PrimaryTitle";
import { Semitags } from "./Semitags";

graphql(`
  mutation RegisterTagPage_RegisterTag($input: RegisterTagInput!) {
    registerTag(input: $input) {
      __typename
      ... on RegisterTagSucceededPayload {
        tag {
          ...Link_Tag
          id
          name
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
        return;
      }

      const { name } = data.registerTag.tag;
    },
    [mutateRegisterTag]
  );
};

const formSchema = z.object({
  primaryName: z.string().min(1, "タグ名は1文字以上で"),
  extraNames: z.optional(
    z.array(z.object({ name: z.string().min(1, "タグ名は1文字以上で") }))
  ),
  explicitParentTagId: z.optional(z.string()),
  implicitParents: z.array(z.object({ tagId: z.string() })),
  resolveSemitags: z.array(z.object({ semitagId: z.string() })),
});
export type FormSchema = z.infer<typeof formSchema>;

export const RegisterTagForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchema> = useRegister();
  const {
    fields: extraNames,
    append: appendExtraName,
    remove: removeExtraName,
  } = useFieldArray({ control, name: "extraNames" });
  const {
    fields: implicitParents,
    append: appendImplicitParent,
    remove: removeImplicitParent,
  } = useFieldArray({ control, name: "implicitParents" });
  const {
    fields: resolveSemitags,
    append: appendResolveSemitag,
    remove: removeResolveSemitag,
  } = useFieldArray({ control, name: "resolveSemitags" });

  return (
    <form
      className={clsx(
        className,
        [["px-4"], ["py-4"]],
        ["rounded"],
        ["border", "border-slate-300"],
        ["bg-slate-50"],
        ["flex", "gap-x-4"]
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={clsx(
          ["w-96"],
          ["flex-shrink-0"],
          ["flex", "flex-col", ["gap-y-4"]]
        )}
      >
        <div className={clsx(["flex-grow"], ["flex", "flex-col", ["gap-y-4"]])}>
          <PrimaryTitle
            register={register("primaryName")}
            errors={errors.primaryName}
          />
          <ExtraNames
            register={(index) => register(`extraNames.${index}.name`)}
            extraNames={extraNames}
            append={appendExtraName}
            remove={removeExtraName}
          />
          <ExplicitParentTag
            explicitParentTagId={watch("explicitParentTagId")}
            implicitParentTagIds={implicitParents.map(({ tagId }) => tagId)}
            set={(id) => setValue("explicitParentTagId", id)}
            remove={() => setValue("explicitParentTagId", undefined)}
          />
          <ImplictParentTags
            explicitParentTagId={watch("explicitParentTagId")}
            implicitParents={implicitParents}
            append={appendImplicitParent}
            remove={removeImplicitParent}
          />
        </div>
        <div className={clsx(["flex-shrink-0"])}>
          <BlueButton
            type="submit"
            className={clsx(["text-md"], ["py-1"], ["px-3"])}
          >
            追加
          </BlueButton>
        </div>
      </div>
      <div className={clsx(["flex-grow"])}>
        <Semitags
          fields={resolveSemitags}
          append={appendResolveSemitag}
          remove={removeResolveSemitag}
        />
      </div>
    </form>
  );
};
