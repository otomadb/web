"use client";
import "client-only";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import React, { useCallback, useEffect, useId, useMemo } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "urql";
import * as z from "zod";

import { LinkTag } from "~/components/common/Link";
import { getFragment, graphql } from "~/gql";
import {
  Link_TagFragmentDoc,
  RegisterTag_RegisterTagDocument,
} from "~/gql/graphql";

import { ExplicitParentTag } from "./ExplicitParentTag";
import { ExtraName } from "./ExtraName";
import { ImplictParentTags } from "./ImplicitParentTags";
import { Semitags } from "./Semitags";

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
        ...Link_Tag
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

  explicitParentTagId: z.optional(z.string()),
  implicitParents: z.array(z.object({ tagId: z.string() })),
  resolveSemitags: z.array(z.object({ semitagId: z.string() })),
});
type FormSchema = z.infer<typeof formSchema>;

export const RegisterTagForm: React.FC<{ className?: string }> = ({
  className,
}) => {
  const primaryTitleLabelId = useId();

  const [, trigger] = useMutation(RegisterTag_RegisterTagDocument);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const primaryName = watch("primaryName");
  const {
    fields: extraNames,
    append: appendExtraName,
    remove: removeExtraName,
  } = useFieldArray({
    control,
    name: "extraNames",
  });
  const explicitParentTagId = watch("explicitParentTagId");
  const {
    fields: implicitParents,
    append: appendImplicitParent,
    remove: removeImplicitParent,
  } = useFieldArray({ control, name: "implicitParents" });
  const {
    fields: resolveSemitags,
    append: appendResolveSemitag,
    remove: removeresolveSemitag,
  } = useFieldArray({ control, name: "resolveSemitags" });
  const selectedParentIds: string[] = useMemo(
    () => [
      ...(explicitParentTagId ? [explicitParentTagId] : []),
      ...implicitParents.map(({ tagId }) => tagId),
    ],
    [explicitParentTagId, implicitParents]
  );

  useEffect(() => {
    if (isSubmitSuccessful)
      reset({
        primaryName: undefined,
        extraNames: [],
        explicitParentTagId: undefined,
        implicitParents: [],
        resolveSemitags: [],
      });
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<FormSchema> = useCallback(
    async ({
      primaryName,
      extraNames,
      explicitParentTagId,
      implicitParents,
      resolveSemitags,
    }) => {
      const { data } = await trigger({
        primaryName,
        extraNames: extraNames?.map(({ name }) => name),
        explicitParent: explicitParentTagId,
        implicitParents: implicitParents.map(({ tagId }) => tagId),
        resolveSemitags: resolveSemitags.map(({ semitagId }) => semitagId),
      });

      if (data) {
        toast(() => (
          <div className={clsx(["text-slate-700"])}>
            <LinkTag
              fragment={getFragment(Link_TagFragmentDoc, data.registerTag.tag)}
              className={clsx(["font-bold"], ["text-blue-500"])}
            >
              {data.registerTag.tag.name}
            </LinkTag>
            を登録しました．
          </div>
        ));
      }
    },
    [trigger]
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
        <div className={clsx(["flex-grow"], ["flex", "flex-col"])}>
          <label className={clsx(["text-sm"])} htmlFor={primaryTitleLabelId}>
            主な名前
          </label>
          <div className={clsx(["mt-1"], ["flex", "flex-col"])}>
            <div className={clsx(["w-full"])}>
              <input
                id={primaryTitleLabelId}
                type={"text"}
                placeholder="タグの主な名前"
                className={clsx(
                  ["w-full"],
                  ["flex-grow"],
                  ["rounded"],
                  ["text-sm"],
                  [["py-0.5"], ["px-2"]],
                  ["bg-slate-100"],
                  ["border", "border-slate-300"]
                )}
                {...register("primaryName")}
              />
            </div>
            {errors.primaryName && (
              <div className={clsx(["text-xs"], ["text-red-600"])}>
                {errors.primaryName.message}
              </div>
            )}
          </div>
        </div>
        <ExplicitParentTag
          className={clsx(["flex-shrink-0"], ["w-96"])}
          tagId={explicitParentTagId}
          selectedParentIds={selectedParentIds}
          append={(id) => setValue("explicitParentTagId", id)}
          remove={() => setValue("explicitParentTagId", undefined)}
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
          fields={implicitParents}
          selectedParentIds={selectedParentIds}
          append={(payload) => appendImplicitParent(payload)}
          remove={(index) => removeImplicitParent(index)}
        />
      </div>
      <div
        className={clsx(
          ["mt-4"],
          [["px-4"], ["py-4"]],
          ["border"],
          ["rounded"],
          ["bg-slate-100"]
        )}
      >
        <Semitags
          fields={resolveSemitags}
          append={({ semitagId, name }) => {
            appendResolveSemitag({ semitagId });
            if (!primaryName)
              setValue("primaryName", name, { shouldDirty: true });
          }}
          remove={(i) => removeresolveSemitag(i)}
        />
      </div>
      <div className={clsx(["mt-8"])}>
        <div>
          <button
            type="submit"
            className={clsx(
              ["px-4"],
              ["py-2"],
              ["disabled:bg-slate-300", "bg-blue-400", "hover:bg-blue-500"],
              [
                "disabled:text-slate-100",
                "text-blue-50",
                "hover:text-blue-100",
              ],
              ["text-sm"],
              ["cursor-pointer"],
              ["rounded"]
            )}
          >
            追加
          </button>
        </div>
      </div>
    </form>
  );
};
