"use client";
import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useCallback, useMemo } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useMutation } from "urql";
import * as z from "zod";

import { graphql } from "~/gql";
import { RegisterTag_RegisterTagDocument } from "~/gql/graphql";

import { ExplicitParentTag } from "./ExplicitParentTag";
import { ExtraName } from "./ExtraName";
import { ImplictParentTags } from "./ImplicitParentTags";
import { PrimaryName } from "./PrimaryName";

graphql(`
  mutation RegisterTag_RegisterTag(
    $primaryName: String!
    $extraNames: [String!]
    $explicitParent: ID
    $implicitParents: [ID!]
    $resolveSemitags: [ID!]
  ) {
    registerTag(
      input: {
        primaryName: $primaryName
        extraNames: $extraNames
        explicitParent: $explicitParent
        implicitParents: $implicitParents
        resolveSemitags: $resolveSemitags
        meaningless: false
      }
    ) {
      tag {
        id
        name
        explicitParent {
          id
          name
        }
      }
    }
  }
`);

const formSchema = z.object({
  primaryName: z.string().min(1, "タグ名は1文字以上で"),
  extraNames: z.optional(
    z.array(
      z.object({
        name: z.string().min(1, "タグ名は1文字以上で"),
      })
    )
  ),

  explicitParent: z.optional(
    z.object({
      tagId: z.string(),
      name: z.string(),
      explicitParent: z.optional(
        z.object({
          tagId: z.string(),
          name: z.string(),
        })
      ),
    })
  ),
  implicitParents: z.array(
    z.object({
      tagId: z.string(),
      name: z.string(),
      explicitParent: z.optional(
        z.object({
          tagId: z.string(),
          name: z.string(),
        })
      ),
    })
  ),

  resolveSemitags: z.optional(
    z.array(
      z.object({
        id: z.string(),
      })
    )
  ),
});
type FormSchema = z.infer<typeof formSchema>;

export const RegisterTagForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [, trigger] = useMutation(RegisterTag_RegisterTagDocument);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const {
    fields: extraNames,
    append: appendExtraName,
    remove: removeExtraName,
  } = useFieldArray({
    control,
    name: "extraNames",
  });
  const explicitParent = watch("explicitParent");
  const {
    fields: implicitParents,
    append: appendImplicitParent,
    remove: removeImplicitParent,
  } = useFieldArray({
    control,
    name: "implicitParents",
  });
  const selectedParentIds: string[] = useMemo(
    () => [
      ...(explicitParent?.tagId ? [explicitParent.tagId] : []),
      ...implicitParents.map(({ tagId }) => tagId),
    ],
    [explicitParent, implicitParents]
  );

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    async ({
      primaryName,
      extraNames,
      explicitParent,
      implicitParents,
      resolveSemitags,
    }) => {
      await trigger({
        primaryName,
        extraNames: extraNames?.map(({ name }) => name),
        explicitParent: explicitParent?.tagId,
        implicitParents: implicitParents?.map(({ tagId: id }) => id),
        resolveSemitags: resolveSemitags?.map(({ id }) => id),
      });
      reset();
    },
    [reset, trigger]
  );

  return (
    <form
      className={clsx(
        className,
        [["px-4"], ["py-4"]],
        ["rounded"],
        ["border", "border-slate-300"],
        ["bg-slate-50"]
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={clsx(
          [["px-4"], ["py-4"]],
          ["flex"],
          ["gap-x-4"],
          ["border"],
          ["rounded"],
          ["bg-slate-100"]
        )}
      >
        <PrimaryName
          className={clsx(["flex-grow"], ["flex-shrink-0"])}
          Input={({ ...props }) => (
            <input type={"text"} {...props} {...register("primaryName")} />
          )}
          errorMessage={errors.primaryName?.message}
        />
        <ExplicitParentTag
          className={clsx(["flex-shrink-0"], ["w-96"])}
          parent={explicitParent}
          selectedParentIds={selectedParentIds}
          append={(payload) => setValue("explicitParent", payload)}
          remove={() => setValue("explicitParent", undefined)}
        />
      </div>
      <div
        className={clsx(
          [["px-4"], ["py-4"]],
          ["border"],
          ["rounded"],
          ["bg-slate-100"],
          ["mt-4"],
          ["grid"],
          ["grid-cols-2"],
          ["gap-x-6"],
          ["gap-y-6"]
        )}
      >
        <ExtraName
          names={extraNames}
          Input={({ index, ...props }) => (
            <input
              type="text"
              disabled={true}
              {...props}
              {...register(`extraNames.${index}.name`)}
            />
          )}
          append={(payload) => appendExtraName(payload)}
          remove={(index) => removeExtraName(index)}
        />
        <ImplictParentTags
          className={clsx()}
          parents={implicitParents}
          selectedParentIds={selectedParentIds}
          append={(payload) => appendImplicitParent(payload)}
          remove={(index) => removeImplicitParent(index)}
        />
      </div>
      <div className={clsx(["mt-8"])}>
        <button
          type="submit"
          className={clsx(
            ["px-4"],
            ["py-2"],
            ["disabled:bg-slate-300", "bg-blue-400", "hover:bg-blue-500"],
            ["disabled:text-slate-100", "text-blue-50", "hover:text-blue-100"],
            ["text-sm"],
            ["cursor-pointer"],
            ["rounded"]
          )}
        >
          追加
        </button>
      </div>
    </form>
  );
};
